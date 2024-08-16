import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { auth, firestore } from "../../lib/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultAvatar from './defaultAvatar.png'; // Ensure this path is correct
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    displayName: '',
    email: '',
    emailNotifications: false,
    pushNotifications: false,
    showLastSeen: false,
    showProfilePhoto: false,
    showStatus: false,
    dataSaver: false
  });
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const [newProfileImage, setNewProfileImage] = useState(null);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      const fetchSettings = async () => {
        const docRef = doc(firestore, `users/${userId}`); // Corrected document path
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setSettings(userData.settings || {}); // Ensure we use the 'settings' field from user document
          setProfileImage(userData.profileImage || defaultAvatar); // Set profile image if it exists
        } else {
          console.error("No such document!");
        }
        setLoading(false);
      };

      fetchSettings();
    }
  }, [userId]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    const docRef = doc(firestore, `users/${userId}`); // Corrected document path
    await updateDoc(docRef, { settings });

    if (newProfileImage) {
      // Upload newProfileImage to Firebase Storage and update Firestore with the URL
      // For example:
      // const storageRef = ref(storage, `profileImages/${userId}`);
      // await uploadBytes(storageRef, newProfileImage);
      // const profileImageUrl = await getDownloadURL(storageRef);
      // await updateDoc(docRef, { profileImage: profileImageUrl });
    }

    alert('Settings updated successfully');
  };

  const handleLogout = async () => {
    await signOut(auth);
    // Redirect to login page after logout
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="profile-section">
        <h2>Profile</h2>
        <div className="profile-image">
          <img src={profileImage} alt="Profile" />
          <input type="file" accept="image/*" onChange={handleProfileImageChange} />
        </div>
        <div className="profile-info">
          <label>
            Display Name:
            <input
              type="text"
              value={settings.displayName || ''}
              onChange={(e) => setSettings({ ...settings, displayName: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={settings.email || ''}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="number"
              value={settings.phoneNumber || ''}
              onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
            />
          </label>
        </div>
      </div>
      <div className="notifications-section">
        <h2>Notifications</h2>
        <label>
          Email Notifications:
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
          />
        </label>
        <label>
          Push Notifications:
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
          />
        </label>
      </div>
      <div className="privacy-section">
        <h2>Privacy</h2>
        <label>
          Show Last Seen:
          <input
            type="checkbox"
            checked={settings.showLastSeen}
            onChange={(e) => setSettings({ ...settings, showLastSeen: e.target.checked })}
          />
        </label>
        <label>
          Show Profile Photo:
          <input
            type="checkbox"
            checked={settings.showProfilePhoto}
            onChange={(e) => setSettings({ ...settings, showProfilePhoto: e.target.checked })}
          />
        </label>
        <label>
          Show Status:
          <input
            type="checkbox"
            checked={settings.showStatus}
            onChange={(e) => setSettings({ ...settings, showStatus: e.target.checked })}
          />
        </label>
        <label>
          Data Saver:
          <input
            type="checkbox"
            checked={settings.dataSaver}
            onChange={(e) => setSettings({ ...settings, dataSaver: e.target.checked })}
          />
        </label>
      </div>
      <div className="actions">
        <button onClick={handleSaveChanges}>Save Changes</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Settings;
