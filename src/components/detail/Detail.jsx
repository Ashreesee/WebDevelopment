import React from 'react';
import './detail.css';
import { toast } from "react-toastify";
import { signOut } from "firebase/auth"; // Import Firebase auth functions
import { auth } from "../../lib/firebase";

const Detail = ({ setIsLogin }) => {
    const handleLogout = async () => {
        try {
            await signOut(auth); 
            toast.success("Logged out successfully.");
            setIsLogin(true);
        } catch (err) {
            console.error("Error logging out:", err);
            toast.error("Failed to logout.");
        }
    };

    return (
        <div className="detail">
            <div className="user">
                <img src="./avatar.png" alt="User Avatar" />
                <h2>Riya</h2>
                <p>Shine like pure gold under the sun.</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="Expand Arrow" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="./arrowUp.png" alt="Expand Arrow" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Photos</span>
                        <img src="./arrowDown.png" alt="Expand Arrow" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://example.com/photo1.jpg" alt="Shared Photo 1" />
                                <span>photo_2024_1.png</span>
                            </div>
                            <img src="./download.png" alt="Download Icon" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://example.com/photo2.jpg" alt="Shared Photo 2" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="Download Icon" className="icon" />
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="Expand Arrow" />
                    </div>
                </div>
                <button>Block User</button>
                <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Detail;
