import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

// Import your logo
import LogoIcon from "../../assets/business.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={LogoIcon} alt="Platform Logo" className="logo-icon" />
        <h1 className="platform-name">StreamIn</h1>
      </div>

      <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/features">Features</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          <li>
            <Link to="/login" className="login-btn">Login</Link>
          </li>
          <li>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </li>
        </ul>
      </nav>

      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Header;
