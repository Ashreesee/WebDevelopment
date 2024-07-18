import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from '../../lib/firebase';
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload"; // Import the upload function

const SignUp = ({ setIsLogin }) => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ''
  });

  const [loading, setLoading] = useState(false);

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

      const imgUrl = avatar.file ? await upload(avatar.file) : "./avatar.png"; // Call the upload function here

      await setDoc(doc(firestore, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(firestore, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Sign Up Successful!");
    } catch (err) {
      console.error("Error registering:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="upload-section">
        <label htmlFor="file">
          <img src={avatar.url || "./avatar.png"} alt="Profile" />
          Upload an image
        </label>
        <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
      </div>
      <h2>Create A New Account</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <span onClick={() => setIsLogin(true)} className="login-link">Login</span>
      </p>
    </div>
  );
};

export default SignUp;
