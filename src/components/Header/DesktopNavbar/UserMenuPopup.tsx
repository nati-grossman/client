import React, { useRef, useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faUserCircle,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

interface UserMenuPopupProps {
  user: { loggedIn: boolean; avatar: string };
  onProfile: () => void;
  onLogout: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const UserMenuPopup: React.FC<UserMenuPopupProps> = ({
  user,
  onProfile,
  onLogout,
  onLogin,
  onRegister,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  return (
    <div className="user-menu-container" ref={menuRef}>
      <div
        className="user-avatar"
        onClick={() => setShowUserMenu((prev) => !prev)}
      >
        {user.loggedIn ? (
          <Image
            src={user.avatar}
            roundedCircle
            width={30}
            height={30}
            className="me-2"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} className="me-2" size="lg" />
        )}
      </div>
      {showUserMenu && (
        <div className="user-menu">
          {user.loggedIn ? (
            <>
              <Button
                variant="link"
                className="menu-item"
                onClick={() => {
                  setShowUserMenu(false);
                  onProfile();
                }}
              >
                <FontAwesomeIcon icon={faUserCircle} className="menu-icon" />
                פרופיל
              </Button>
              <Button
                variant="link"
                className="menu-item"
                onClick={() => {
                  setShowUserMenu(false);
                  onLogout();
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
                התנתק
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="link"
                className="menu-item"
                onClick={() => {
                  setShowUserMenu(false);
                  onLogin();
                }}
              >
                <FontAwesomeIcon icon={faSignInAlt} className="menu-icon" />
                התחברות
              </Button>
              <Button
                variant="link"
                className="menu-item"
                onClick={() => {
                  setShowUserMenu(false);
                  onRegister();
                }}
              >
                <FontAwesomeIcon icon={faUserPlus} className="menu-icon" />
                הרשמה
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenuPopup;
