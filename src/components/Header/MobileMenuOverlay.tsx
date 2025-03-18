import { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./MobileMenuOverlay.css";
import { Category } from "types/Categories/Category";
import { categoriesStore } from "stores/Categories.store";
import { observer } from "mobx-react-lite";

interface MobileMenuOverlayProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  user: { loggedIn: boolean; avatar: string };
  openCategory: string | null;
  handleCategoryClick: (category: string) => void;
}

// interface Category {
//   id: string;
//   name: string;
//   subcategories: Subcategory[];
// }

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = observer(
  ({
    isMobileMenuOpen,
    toggleMobileMenu,
    user,
    openCategory,
    handleCategoryClick,
  }) => {
    useEffect(() => {
      categoriesStore.fetchCategories();
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
          <Nav
            className="flex-column text-center"
            style={{ marginTop: "40px" }}
          >
            {categoriesStore.categories.map((category: Category) => (
              <div key={category.categoryNumber} className="category-item">
                <div
                  className="category-content"
                  onClick={() => handleCategoryClick(category.categoryName)}
                >
                  {/* שם הקטגוריה */}
                  <div className="category-title">{category.categoryName}</div>
                  {/* אייקון */}
                  <FontAwesomeIcon icon={faHome} className="category-icon" />
                </div>
                <div
                  className={`me-3 submenu text-end ${
                    openCategory === category.categoryName ? "open" : ""
                  }`}
                >
                  <></>
                </div>
              </div>
            ))}
          </Nav>
        </div>
      </div>
    );
  }
);

export default MobileMenuOverlay;
