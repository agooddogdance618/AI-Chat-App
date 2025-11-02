import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../contexts/authContext';
import { useRouter } from 'next/router';
import { EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Loading from './Loading';
import Menu from './Menu';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  // const [showInput, setShowInput] = useState(false);
  // const [chatName, setChatName] = useState('');
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)
  const [optionsOpen, setOptionsOpen] = useState(null)
  const [renameChat, setRenameChat] = useState(null)
  const sidebarRef = useRef(null)
  const buttonRefs = useRef({})
  // const inputRef = useRef(null)
  const { user, logout } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    if (user && user.accountId) {
      fetchChats()
    }
  }, [user])

  // useEffect(() => {
  //   if (showInput && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [showInput])

  const fetchChats = async () => {
    try {
      const response = await fetch("/api/get-chats", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      })
      const data = await response.json();
      if (response.ok) {
        setChats(data.chats)
        setLoading(false)
      } else {
        console.error("Error fetching chats: ", data.error)
        if (response.status === 401) {
          console.error('Unauthorized — token invalid or expired')
          logout()
        }
      }
    } catch {
      console.error('Error fetching chats')
    }
  }

  const handleNavigation = (destination) => {
    const path = destination.startsWith('/') ? destination : `/chat/${destination}`
    if (sidebarOpen) {
      setSidebarOpen(false)
      setTimeout(() => router.push(path), 300)
    } else {
      router.push(path)
    }
  }

  const handleRename = async (e) => {
    e.preventDefault()
    if (!renameChat.name.trim() || !user) return

    try {
      const res = await fetch('/api/rename-chat', {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          id: renameChat.id,
          name: renameChat.name
        })
      })
      let data
      if (res.ok) {
        setChats(prev =>
          prev.map(chat =>
            chat.id === renameChat.id
              ? { ...chat, name: renameChat.name }
              : chat
        ))
        setRenameChat(null)
      } else {
        data = await res.json()
        console.error("Error renaming chat: ", data.error)
        if (res.status === 401) {
          console.error('Unauthorized — token invalid or expired')
          logout()
        }
      }
    } catch {
      console.error("Error renaming chat")
    }
  }

  const handleDelete = async (id) => {
    if (!id || !user) return

    try {
      const res = await fetch(`/api/delete-chat?id=${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
      if (res.ok) {
        setChats(prev => prev.filter(chat => chat.id !== id))
      } else {
        data = await res.json()
        console.error("Error deleting chat: ", data.error)
        if (res.status === 401) {
          console.error('Unauthorized — token invalid or expired')
          logout()
        }
      }
    } catch {
      console.error("Error deleting chat")
    }
  }

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
    <div ref={sidebarRef} className={`absolute md:relative top-0 left-0 h-full flex-col bg-gray-200 p-4 z-20 overflow-y-auto overflow-x-hidden transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex w-[50%] md:w-[30%] lg:w-[25%] xl:w-[18%] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-gutter-stable`}>
        <button onClick={() => handleNavigation('/')} className="px-5 py-2 mb-5 rounded-full bg-green-700 h-min w-full">New Chat</button>
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
      {loading ? <Loading size={20}/> : chats.map((chat) => (
        <div key={chat.id} className='flex justify-center items-center duration-500 relative group p-1 mb-2 rounded-full w-full hover:bg-gray-300'>
          <button onClick={() => handleNavigation(chat.id)} className='flex justify-center items-center w-full'>
            <span className='truncate max-w-[60%] md:max-w-full md:group-hover:max-w-[60%] duration-700'>{chat.name}</span>
          </button>
          <button ref={el => buttonRefs.current[chat.id] = el} onClick={() => setOptionsOpen((optionsOpen === chat.id) ? null : chat.id)}>
            <EllipsisHorizontalCircleIcon className='absolute bottom-1/2 right-1 translate-y-1/2 h-6 duration-500 delay-100 opacity-0 md:group-hover:opacity-100'/>
            <EllipsisHorizontalIcon className='absolute bottom-1/2 right-1 translate-y-1/2 h-6 md:opacity-0'/>
          </button>
          {(optionsOpen === chat.id) ? <Menu anchorRef={{ current: buttonRefs.current[chat.id] }} scrollParentRef={sidebarRef} open={optionsOpen === chat.id} setMenuOpen={setOptionsOpen}>
            <button onClick={() => {setRenameChat({ id: chat.id, name: chat.name });setSidebarOpen(false)}} className='flex items-center p-1 mb-2 w-full rounded-full hover:bg-gray-500 duration-300'>
              <PencilSquareIcon className='h-6 mr-2'/>
              <span>Rename</span>
            </button>
            <button onClick={() => {handleDelete(chat.id);setSidebarOpen(false)}} className='flex items-center p-1 w-full rounded-full hover:bg-gray-500 duration-300'>
              <TrashIcon className='h-6 mr-2'/>
              <span>Delete</span>
            </button>
          </Menu> : null}
        </div>
      ))}
      {renameChat && <Menu open={true} setMenuOpen={setRenameChat} className='absolute flex flex-col items-center w-3/4 md:w-1/2 lg:w-1/3 py-10 px-5 z-50 bg-gray-300 rounded-lg'>
        <h2 className='text-2xl font-semibold mb-5'>Rename Chat</h2>
        <form onSubmit={handleRename} className='flex flex-col items-center w-full'>
          <input type='text' autoFocus onChange={e => {setRenameChat(prev => ({ ...prev, name: e.target.value }))}} className='w-1/2 p-1 bg-white duration-500 delay-150 scale-100 hover:scale-110 focus:scale-110 outline outline-2 rounded outline-gray-500 hover:outline-black focus:outline-black mb-4' value={renameChat.name}/>
          <button type='submit' disabled={!renameChat.name.trim()} className={`w-1/3 duration-500 delay-150 scale-100 font-medium p-1 rounded-full ${!renameChat.name.trim() ? 'bg-gray-400' : 'bg-green-700 hover:scale-125'}`}>Rename</button>
        </form>
      </Menu>}
    </div>
  )
}
