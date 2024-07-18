import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import './chatList.css';
import { firestore } from '../../../lib/firebase';
import { useUserStore } from '../../../lib/userStore';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const userChatsRef = collection(firestore, "userchats");
    const q = query(userChatsRef, where("receiverId", "==", currentUser.id));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatList = [];
      querySnapshot.forEach((doc) => {
        chatList.push({ id: doc.id, ...doc.data() });
      });
      setChats(chatList);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="chatList">
      {chats.map(chat => (
        <div key={chat.chatId} className="chatItem">
          <span>{chat.receiverId}</span>
          <span>{chat.lastMessage}</span>
          <span>{new Date(chat.updatedAt.toDate()).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
