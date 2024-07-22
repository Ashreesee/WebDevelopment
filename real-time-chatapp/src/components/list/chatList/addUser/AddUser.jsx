import React, { useState } from 'react';
import { collection, query, where, getDocs, serverTimestamp, doc, setDoc, arrayUnion, updateDoc } from 'firebase/firestore';
import './addUser.css';
import { firestore } from '../../../lib/firebase';
import { useUserStore } from '../../../lib/userStore';

const AddUser = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    try {
      const userRef = collection(firestore, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(firestore, "chats");
    const userChatsRef = collection(firestore, "userchats");

    try {
      const newChatDocRef = doc(chatRef);
      await setDoc(newChatDocRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatDocRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: serverTimestamp(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatDocRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: serverTimestamp(),
        }),
      });

      // Optionally, update the local state or provide user feedback
      console.log("Chat created successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" name="username" placeholder="Username" required />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="Avatar" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
