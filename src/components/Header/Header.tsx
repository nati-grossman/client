import { useState } from "react";
import { Container } from "react-bootstrap";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileMenuOverlay from "./MobileMenuOverlay";
import "./Header.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

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
};

export default Header;
