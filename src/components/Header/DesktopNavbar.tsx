import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./DesktopNavbar.css"; // קובץ העיצוב המעודכן

interface DesktopNavbarProps {
  user: { loggedIn: boolean; avatar: string };
}

interface Subcategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ user }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]); // קטגוריות שיתקבלו מה-API
  const navigate = useNavigate();

  useEffect(() => {
    const mockCategories: Category[] = [
      {
        id: "1",
        name: "קטגוריה 1",
        subcategories: [
          { id: "1-1", name: "תת קטגוריה 1" },
          { id: "1-2", name: "תת קטגוריה 2" },
        ],
      },
      {
        id: "2",
        name: "קטגוריה 2",
        subcategories: [
          { id: "2-1", name: "תת קטגוריה 3" },
          { id: "2-2", name: "תת קטגוריה 4" },
        ],
      },
      {
        id: "3",
        name: "קטגוריה 3",
        subcategories: [
          { id: "3-1", name: "תת קטגוריה 5" },
          { id: "3-2", name: "תת קטגוריה 6" },
        ],
      },
    ];

    setCategories(mockCategories);
    // קריאה ל-API להורדת הקטגוריות באמצעות fetch
    /* fetch("/api/categories") // כאן תשנה את ה-URL לפי הצורך
      .then((response) => response.json()) // המרת התגובה ל-json
      .then((data) => setCategories(data)) // עדכון הקטגוריות
      .catch((error) => console.error("Error fetching categories", error)); */
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
          {categories.map((category) => (
            <div
              key={category.id}
              onMouseEnter={() =>
                handleMouseEnter(`nav-dropdown-${category.id}`)
              }
              onMouseLeave={handleMouseLeave}
            >
              <NavDropdown
                title={category.name}
                id={`nav-dropdown-${category.id}`}
                className="custom-dropdown mx-2"
                show={openDropdown === `nav-dropdown-${category.id}`}
                onClick={() => handleClick(`nav-dropdown-${category.id}`)}
              >
                {category.subcategories.map((subcategory) => (
                  <NavDropdown.Item key={subcategory.id} href="#">
                    {subcategory.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </div>
          ))}
        </Nav>

        {/* לוגו בצד ימין */}
        <Navbar.Brand href="#">לוגו</Navbar.Brand>
      </div>
    </Navbar>
  );
};

export default DesktopNavbar;
