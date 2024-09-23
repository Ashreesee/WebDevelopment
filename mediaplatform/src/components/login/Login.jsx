import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css"; // Ensure this file exists and is correctly styled
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful!");
      navigate('/home'); // Navigate to home page on successful login
    } catch (err) {
      console.error("Error logging in:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background">
      <div className="login-container">
      <video autoPlay loop muted className="background-video">
        <source src="/ls.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <h2>Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
        <p className="signup-prompt">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
        <button onClick={() => navigate('/')}>Back to Start</button> {/* Use navigate */}
      </div>
    </div>
  );
};

export default Login;
