import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Popover, OverlayTrigger, Button } from 'react-bootstrap';
import styles from './Navigation.module.css';



const Navigation: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

    const handleMouseEnter = (id: string) => setDropdownOpen(id);
    const handleMouseLeave = () => setDropdownOpen(null);

    const popover = (
        <Popover id="popover-basic">
        <Popover.Header as="h3">פרטי משתמש</Popover.Header>
        <Popover.Body>
    כאן יהיו פרטי משתמש כמו היסטוריה ו???
        </Popover.Body>
        </Popover>
    );

  return (
    <>
        <Navbar dir="rtl" variant="dark" expand="lg" style={{backgroundColor: '#e9d1a2'}}>
      <Navbar.Brand as={Link} to="/" className='mx-3'>מיד ליד</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          {/* קישורים לדפים כמו התחברות והרשמה */}
          <Nav.Link as={Link} to="/login">התחבר</Nav.Link>
          <Nav.Link as={Link} to="/register">הירשם</Nav.Link>

          {/* דירות למכירה */}
          <NavDropdown 
            title="דירות למכירה" 
            id="navbar-dropdown-sale" 
            show={dropdownOpen === 'sale'}
            onMouseEnter={() => handleMouseEnter('sale')} 
            onMouseLeave={handleMouseLeave}
            className={styles.dropdownToggle}
          >
            <NavDropdown.Item as={Link} to="/sales/tel-aviv">דירות למכירה בתל אביב</NavDropdown.Item>
          </NavDropdown>

          {/* דירות להשכרה */}
          <NavDropdown 
            title="דירות להשכרה" 
            id="navbar-dropdown-rent" 
            show={dropdownOpen === 'rent'}
            onMouseEnter={() => handleMouseEnter('rent')} 
            onMouseLeave={handleMouseLeave}
            className={styles.dropdownToggle}
          >
            <NavDropdown.Item as={Link} to="/rent/tel-aviv">דירות להשכרה בבית שמש</NavDropdown.Item>
          </NavDropdown>

          {/* דירות לשבת */}
          <NavDropdown 
            title="דירות לשבת" 
            id="navbar-dropdown-shabbat" 
            show={dropdownOpen === 'shabbat'}
            onMouseEnter={() => handleMouseEnter('shabbat')} 
            onMouseLeave={handleMouseLeave}
            className={styles.dropdownToggle}
          >
            <NavDropdown.Item as={Link} to="/shabbat/tel-aviv">דירות לשבת בבית שמש</NavDropdown.Item>
          </NavDropdown>

        </Nav>




        {/* תמונה עם פופאפ קטן */}
        <div className='flex-fill'></div>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <Button variant="link">
            <img 
              src="/images/userNavbar.png" 
              alt="User Profile" 
              style={{ width: '30px', height: '30px', borderRadius: '50%' }} 
            />
          </Button>
        </OverlayTrigger>
      </Navbar.Collapse>
    </Navbar>
    </>
  );
};

export default Navigation;
