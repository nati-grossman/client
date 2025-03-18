import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./DesktopNavbar.css"; // קובץ העיצוב המעודכן
import { Category } from "types/Categories/Category";
import { CategoriesService } from "services/categoriesService";
import { categoriesStore } from "stores/Categories.store";
import { observer } from "mobx-react-lite";

interface DesktopNavbarProps {
  user: { loggedIn: boolean; avatar: string };
}

// interface Category {
//   id: string;
//   name: string;
//   subcategories: Subcategory[];
// }

const DesktopNavbar: React.FC<DesktopNavbarProps> = observer(({ user }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]| null>([]); // קטגוריות שיתקבלו מה-API
  const navigate = useNavigate();

  useEffect(() => {
    categoriesStore.fetchCategories();
  }, []);

  const handleMouseEnter = (id: string) => {
    setOpenDropdown(id);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const handleClick = (id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handlePublishAd = () => {
    // ניווט לדף פרסום מודעה
    navigate("/publish-ad");
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
        {/* תמונת משתמש וכפתור פרופיל */}
        <div className="align-items-center d-flex m-0 me-1">
          {user.loggedIn ? (
            <div className="me-2 user-avatar">
              <Image
                src={user.avatar}
                roundedCircle
                width={30}
                height={30}
                className="me-2"
              />
            </div>
          ) : (
            <div className="me-2 user-avatar">
              <FontAwesomeIcon icon={faUser} className="me-2" size="lg" />
            </div>
          )}
          <Button variant="success" onClick={handlePublishAd}>
            פרסום מודעה
          </Button>
        </div>

        {/* קטגוריות במרכז */}
        <Nav className="mx-auto category-nav">
          {categoriesStore.categories?.map((category) => (
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
                show={openDropdown === `nav-dropdown-${category.categoryNumber}`}
                onClick={() => handleClick(`nav-dropdown-${category.categoryNumber}`)}
              >
                <></>
              </NavDropdown>
            </div>
          ))}
        </Nav>

        {/* לוגו בצד ימין */}
        <Navbar.Brand href="#">לוגו</Navbar.Brand>
      </div>
    </Navbar>
  );
});

export default DesktopNavbar;
