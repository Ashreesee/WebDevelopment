import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from '../../lib/firebase'; // Adjust the path based on your project structure
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = ({ setIsLogin }) => {
  const [loading, setLoading] = useState(false);

  const getEmailByUsername = async (username) => {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.data().email;
    } else {
      throw new Error("Username not found");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    let emailOrUsername = formData.get("email");
    const password = formData.get("password");

    try {
      // Check if input is a valid email using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailOrUsername)) {
        // If not a valid email, treat it as a username and get corresponding email
        emailOrUsername = await getEmailByUsername(emailOrUsername);
      }

      // Sign in with the resolved email and password
      await signInWithEmailAndPassword(auth, emailOrUsername, password);
      toast.success("Login Successful!");
    } catch (err) {
      console.error(err);
      toast.error("Login Failed. Please check your email/username and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back,</h2>
      <form onSubmit={handleLogin}>
        <input type="text" name="email" placeholder="Email or Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <span onClick={() => setIsLogin(false)} className="signup-link">Sign Up</span>
      </p>
    </div>
  );
};

export default Login;
