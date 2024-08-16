import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="landingpage-container">
      <video autoPlay loop muted className="background-video">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="auth-buttons">
        <button className="auth-button" onClick={handleLoginClick}>Login</button>
        <button className="auth-button" onClick={handleSignUpClick}>Sign Up</button>
      </div>
      <div className="main-content">
        <h1>Welcome to Our Platform!</h1>
        <p>Discover, stream, and share a constantly expanding mix of music from around the world.</p>
      </div>
    </div>
  );
};

export default LandingPage;
