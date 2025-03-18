import { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./MobileMenuOverlay.css";

interface MobileMenuOverlayProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  user: { loggedIn: boolean; avatar: string };
  openCategory: string | null;
  handleCategoryClick: (category: string) => void;
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

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  user,
  openCategory,
  handleCategoryClick,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // נתוני דמה עבור קטגוריות
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

    // מילו את הקטגוריות
    setCategories(mockCategories);
  }, []);

  return (
    <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}>
      <div className="mobile-menu-content">
        {/* אייקון סגירה (X) */}
        <span className="close-icon" onClick={toggleMobileMenu}>
          ✖
        </span>

        {/* רווח בין האייקון לתוכן */}
        <div className="content-spacing" />

        {/* לוגו */}
        <div className="d-flex justify-content-center my-3">
          <Navbar.Brand href="#">לוגו</Navbar.Brand>
        </div>

        {/* תמונת משתמש */}
        <div className="d-flex justify-content-center">
          {user.loggedIn ? (
            <div className="me-2 user-avatar">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="rounded-circle"
                width={50}
                height={50}
              />
            </div>
          ) : (
            <div className="me-2 user-avatar">
              <FontAwesomeIcon icon={faUser} className="me-2" size="lg" />
            </div>
          )}
        </div>

        {/* קטגוריות */}
        <Nav className="flex-column text-center" style={{ marginTop: "40px" }}>
          {categories.map((category) => (
            <div key={category.id} className="category-item">
              <div
                className="category-content"
                onClick={() => handleCategoryClick(category.name)}
              >
                {/* שם הקטגוריה */}
                <div className="category-title">{category.name}</div>
                {/* אייקון */}
                <FontAwesomeIcon icon={faHome} className="category-icon" />
              </div>
              <div
                className={`me-3 submenu text-end ${
                  openCategory === category.name ? "open" : ""
                }`}
              >
                {category.subcategories.map((subcategory) => (
                  <Nav.Link key={subcategory.id} href="#">
                    {subcategory.name}
                  </Nav.Link>
                ))}
              </div>
            </div>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default MobileMenuOverlay;
