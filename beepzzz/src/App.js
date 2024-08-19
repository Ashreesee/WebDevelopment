import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; 
import TermsOfService from './TermsOfService';

const App = () => {
  const sidebarRef = useRef(null);

  function toggleSidebar() {
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle('active');
    }
  }

  return (
    <Router>
      <header className="header">
        <div className="hamburger" onClick={toggleSidebar}>☰</div>
        <Link to="/terms-of-service" className="logo">Beep<span>zzzz</span></Link>
        <div className="navbar">
          <Link to="/terms-of-service">Features</Link>
          <Link to="/terms-of-service">Blog</Link>
          <Link to="/terms-of-service">Docs</Link>
          <Link to="/terms-of-service">About</Link>
          <Link to="/terms-of-service">Help</Link>
          <Link to="/terms-of-service">Careers</Link>
          <Link to="/terms-of-service">Pricing</Link>
          <Link to="/terms-of-service" className="action_btn">Login</Link>
        </div>
        <div className="navbar-sidebar" ref={sidebarRef}>
        <div className="cross" onClick={toggleSidebar}>×</div>
          <ul>
            <li><Link to="/terms-of-service" onClick={toggleSidebar}>Features</Link></li>
            <li><Link to="/terms-of-service" onClick={toggleSidebar}>Blog</Link></li>
            <li><Link to="/terms-of-service" onClick={toggleSidebar}>Docs</Link></li>
            <li><Link to="/terms-of-service" onClick={toggleSidebar}>About</Link></li>
            <li><Link to="/terms-of-service" onClick={toggleSidebar}>Help</Link></li>
            <li><Link to="/terms-of-service" onClick={toggleSidebar}>Careers</Link></li>
            <li><Link to="/terms-of-service" onClick={toggleSidebar}>Pricing</Link></li>
            <li><Link to="/terms-of-service" className="action_btn" onClick={toggleSidebar}>Login</Link></li>
          </ul>
        </div>
      </header>

      {/* Define your routes here */}
      <Routes>
        <Route path="/terms-of-service" element={<TermsOfService />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
