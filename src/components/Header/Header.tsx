import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileMenuOverlay from "./MobileMenuOverlay";
import { useState } from "react";
import "./Header.css";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // דמוי אובייקט 'user' (אם אין לך עדיין הגדרה של המשתמש)
  const user = {
    loggedIn: true, // אם המשתמש מחובר
    avatar: "https://via.placeholder.com/30", // כתובת לתמונה
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [openCategory, setOpenCategory] = useState(null);

  const handleCategoryClick = (category: any) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <>
      {/* Navbar למחשב */}
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
    </>
  );
}
