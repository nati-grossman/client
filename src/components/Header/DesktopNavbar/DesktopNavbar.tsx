import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./DesktopNavbar.css"; // קובץ העיצוב המעודכן
import { Category } from "types/Categories/Category";
import { CategoriesService } from "services/categoriesService";
import { categoriesStore } from "stores/Categories.store";
import { observer } from "mobx-react-lite";
import { City } from "types/Cities/City";
import { UserService } from "services/userService";
import { useHeaderHooks } from "../Hooks/useHeaderHooks";

interface DesktopNavbarProps {
  user: { loggedIn: boolean; avatar: string };
}

// need to create new componennt, that displayed list of catgories (categoriesStore.categories),
// and on click on one of the category, will triggerd the categoriesStore.fetchCategoryLevels func,
// with the category number
const DesktopNavbar: React.FC<DesktopNavbarProps> = observer(({ user }) => {
  const { handleStartAdPosting,handleMouseEnter,handleMouseLeave,handleClick,openDropdown } = useHeaderHooks();
  useEffect(() => {
    // Only fetch category levels, categories are already fetched by Header
    categoriesStore.fetchCategoryLevels(1);
  }, []);

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
                //handleMouseEnter(`nav-dropdown-${category.categoryNumber}`)
                handleMouseEnter
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
          <div className="d-flex align-items-center">
            <Button
              variant="outline-primary"
              className="btn-success p-2"
              onClick={handleStartAdPosting}
            >
              + פרסום מודעה
            </Button>
          </div>
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
        </div>
      </div>
    </Navbar>
  );
});

export default DesktopNavbar;
