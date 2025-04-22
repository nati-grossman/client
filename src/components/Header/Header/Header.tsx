import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import MobileMenuOverlay from "../MobileMenuOverlay/MobileMenuOverlay";
import "./Header.css";
import { categoriesStore } from "stores/Categories.store";

export const Header = observer(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    // Fetch categories once when the Header component mounts
    // This is the only place we should call fetchCategories on initial load
    categoriesStore.fetchCategories();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCategoryClick = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  // Mock user data - replace with actual user data from your auth system
  const user = {
    loggedIn: false,
    avatar: "",
  };

  return (
    <header className="header">
      <Container>
        {/* Navbar למסכים גדולים */}
        <DesktopNavbar user={user} />

        {/* Navbar למובייל */}
        <MobileNavbar toggleMobileMenu={toggleMobileMenu} user={user} />

        {/* פופ-אפ למובייל אם התפריט פתוח */}
        <MobileMenuOverlay
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          user={user}
          openCategory={openCategory}
          handleCategoryClick={handleCategoryClick}
        />
      </Container>
    </header>
  );
});

export default Header;
