import React, { useState, useEffect } from "react";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './lib/firebase'; 
import { useUserStore } from "./lib/userStore";

const App = () => {
  const [isLogin, setIsLogin] = useState(true); // Example initial state, adjust as needed
  const [user, setUser] = useState(null); // Initialize user state as null
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser); // Set user state if logged in
      } else {
        setUser(null); // Set user state to null if not logged in
      }
      setLoading(false); // Set loading state after checking auth state
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth state
  }

  return (
    <div className="container">
      {user ? ( // User is logged in
        <>
          <List />
          <Chat />
          <Detail setUser={setUser} setIsLogin={setIsLogin} /> {/* Pass setUser and setIsLogin */}
        </>
      ) : isLogin ? ( // User needs to login
        <Login setIsLogin={setIsLogin} /> // Pass setIsLogin function as prop
      ) : ( // User needs to sign up
        <SignUp setIsLogin={setIsLogin} /> // Pass setIsLogin function as prop
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
