import React, { useEffect } from 'react';
import './userInfo.css';
import { useUserStore } from '../../../lib/userStore';
import { auth } from '../../../lib/firebase'; // Import auth from your firebase config

const Userinfo = () => {
    const { currentUser, isLoading, fetchUserInfo } = useUserStore();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user && !currentUser && !isLoading) {
                fetchUserInfo(user.uid); // Fetch user info when authenticated user is found
            }
        });

        return () => unsubscribe();
    }, [currentUser, isLoading, fetchUserInfo]);

    // Ensure currentUser is defined and has necessary properties before accessing them
    return (
        <div className='userInfo'>
            <div className="user">
                    <img src= "./th.png" alt="" />
                <h2>ChatApp</h2>
            </div>
            <div className="icons">
                <img src="./more.png" alt="More" />
                <img src="./video.png" alt="Video" />
                <img src="./edit.png" alt="Edit" />
            </div>
        </div>
    );
};

export default Userinfo;