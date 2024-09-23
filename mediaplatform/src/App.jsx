import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home/Home.jsx';
import MediaPlayer from './components/mediaPlayer/MediaPlayer.jsx';
import Settings from './components/settings/Settings.jsx';
import Login from './components/login/Login.jsx';
import SignUp from './components/signup/SignUp.jsx';
import Header from './components/header/Header.jsx'; // Import Header component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <Header /> {/* Add Header here */}
        <ToastContainer />
        <Routes>
          {/* Set Home as the default route */}
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/media/:id" element={user ? <MediaPlayer /> : <Navigate to="/login" />} />
          <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
