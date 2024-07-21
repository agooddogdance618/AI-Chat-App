import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../contexts/authContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Sidebar() {
  // const [showInput, setShowInput] = useState(false);
  // const [chatName, setChatName] = useState('');
  const [chats, setChats] = useState([])
  // const inputRef = useRef(null)
  const { user } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (user && user.accountId) {
      fetchChats();
    }
  }, [user]);

  // useEffect(() => {
  //   if (showInput && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [showInput])

  const fetchChats = async () => {
    try {
      const response = await fetch(`/api/get-chats?accountId=${user.accountId}`);
      const data = await response.json();
      if (response.ok) {
        setChats(data.chats);
      } else {
        console.error(`Error fetching chats: ${data.error}`);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  // const handleAddChat = async () => {
  //   if (!chatName) {
  //     setMessage('Please enter a chat name.');
  //     return;
  //   }

  //   try {
  //     const response = await fetch('/api/create-chat', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ accountId: user.accountId, name: chatName }),
  //     });

  //     const data = await response.json()
  //     if (response.ok) {
  //       setChatName('');
  //       setShowInput(false);
  //       fetchChats()
  //       handleSelectChat(data.chat)
  //     } else {
  //       console.log(data.error, "its true")
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleBlur = () => {
  //   if (chatName === '') {
  //     setShowInput(false);
  //   }
  // };

  return (
    <div className='items-center flex-col hidden md:flex bg-gray-200 w-[260px] p-4'>
        <button onClick={() => router.push('/')} className="px-5 py-2 rounded-full bg-green-700 h-min w-full">New Chat</button>
        {/* {showInput && (
        <div>
          <input
            type="text"
            ref={inputRef}
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            onBlur={handleBlur}/>
          <button onClick={handleAddChat}>Submit</button>
        </div>
      )} */}
      {chats.map((chat) => (
        <button key={chat.id} onClick={() => router.push(`/chat/${chat.id}`)}>{chat.name}</button>
      ))}
    </div>
  )
}
