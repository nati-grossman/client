import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faUserCircle,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./DesktopNavbar.css"; // קובץ העיצוב המעודכן
import { Category } from "types/Categories/Category";
import { CategoriesService } from "services/categoriesService";
import { categoriesStore } from "stores/Categories.store";
import { observer } from "mobx-react-lite";
import { City } from "types/Cities/City";
import { UserService } from "services/userService";
import { useHeaderHooks } from "../Hooks/useHeaderHooks";
import { userStore } from "stores/User.store";

interface DesktopNavbarProps {
  user: { loggedIn: boolean; avatar: string };
}

// need to create new componennt, that displayed list of catgories (categoriesStore.categories),
// and on click on one of the category, will triggerd the categoriesStore.fetchCategoryLevels func,
// with the category number
const DesktopNavbar: React.FC<DesktopNavbarProps> = observer(({ user }) => {
  const {
    handleStartAdPosting,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    openDropdown,
  } = useHeaderHooks();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // סגירת התפריט כשלוחצים מחוץ לו
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    userStore.clearUser();
    setShowUserMenu(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    setShowUserMenu(false);
    navigate("/profile");
  };

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      fixed="top"
      className="shadow-sm d-none d-lg-flex header-navbar"
    >
      <div className="container-fluid px-4">
        {/* לוגו בצד ימין עם קישור לדף הבית */}
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          לוגו
        </Navbar.Brand>

        {/* קטגוריות במרכז */}
        <Nav className="mx-auto category-nav">
          {categoriesStore.categories?.map((category: Category) => (
            <div
              key={category.categoryNumber}
              onMouseEnter={() =>
                handleMouseEnter(`nav-dropdown-${category.categoryNumber}`)
              }
              onMouseLeave={handleMouseLeave}
            >
              <NavDropdown
                title={category.categoryName}
                id={`nav-dropdown-${category.categoryNumber}`}
                className="custom-dropdown mx-2"
                show={
                  openDropdown === `nav-dropdown-${category.categoryNumber}`
                }
                onClick={() =>
                  handleClick(`nav-dropdown-${category.categoryNumber}`)
                }
              >
                {(category?.cities ?? []).map((city: City) => (
                  <NavDropdown.Item key={city.cityId} href="#">
                    {city.cityName}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </div>
          ))}
        </Nav>

        {/* תמונת משתמש וכפתור פרופיל */}
        <div className="align-items-center d-flex m-0 me-1">
          <Button
            variant="outline-primary"
            className="btn-success p-2"
            onClick={handleStartAdPosting}
          >
            + פרסום מודעה
          </Button>
          <div className="me-2">
            {user.loggedIn ? (
              <div className="user-menu-container" ref={menuRef}>
                <div
                  className="user-avatar"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <Image
                    src={user.avatar}
                    roundedCircle
                    width={30}
                    height={30}
                    className="me-2"
                  />
                </div>
                {showUserMenu && (
                  <div className="user-menu">
                    <Button
                      variant="link"
                      className="menu-item"
                      onClick={handleProfileClick}
                    >
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="menu-icon"
                      />
                      פרופיל
                    </Button>
                    <Button
                      variant="link"
                      className="menu-item"
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="menu-icon"
                      />
                      התנתק
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="user-menu-container" ref={menuRef}>
                <div
                  className="user-avatar"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <FontAwesomeIcon icon={faUser} className="me-2" size="lg" />
                </div>
                {showUserMenu && (
                  <div className="user-menu">
                    <Button
                      variant="link"
                      className="menu-item"
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate("/login");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faSignInAlt}
                        className="menu-icon"
                      />
                      התחברות
                    </Button>
                    <Button
                      variant="link"
                      className="menu-item"
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate("/register");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        className="menu-icon"
                      />
                      הרשמה
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Navbar>
  );
});

export default DesktopNavbar;
