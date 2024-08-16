import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css"; // Ensure this file exists and is correctly styled
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../lib/firebase"; // Ensure these imports are correct
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload"; // Ensure this function is correctly implemented
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignUp = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imgUrl = avatar.file ? await upload(avatar.file) : "./avatar.png";
      await setDoc(doc(firestore, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: []
      });
      await setDoc(doc(firestore, "userchats", res.user.uid), { chats: [] });
      toast.success("Sign Up Successful!");
      navigate("/home"); // Navigate to home page on successful registration
    } catch (err) {
      console.error("Error registering:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <video autoPlay loop muted className="background-video">
        <source src="/ls.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h2>Create A New Account</h2>
      <div className="upload-section">
        <label htmlFor="file">
          <img src={avatar.url || "./avatar.png"} alt="Profile" />
          Click to upload an image
        </label>
        <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
      </div>
      <form onSubmit={handleRegister}>
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p className="login-prompt">
        Already have an account? <a href="/login">Login</a>
      </p>
      <button onClick={() => navigate("/")}>Back to Start</button> {/* Use navigate */}
    </div>
  );
};

export default SignUp;
