import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import AuthContext from '../contexts/authContext'
import { useRouter } from 'next/router'

export default function Body({chat}) {
  const router = useRouter()
  // const [chatId, setChatId] = useState('')
  const [inputValue, setInputValue] = useState('')
  const { user } = useContext(AuthContext)

  // useEffect(() => {
  //   if (chat && chat.id) {
  //     setChatId(chat.id)
  //   }
  // }, [chat])

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      return
    }
    if (!chat) {
      try {
        const response = await fetch('/api/create-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accountId: user.accountId, name: inputValue }),
        })
        const data = await response.json()
        if (response.ok) {
          sendMessage(data.chatId, { sender: user.name, content: inputValue })
          router.push(`/chat/${data.chatId}`)
        } else {
          console.error(data.error)
        }
      } catch (err) {
        console.error(err)
      }
    } else {
      sendMessage(chat.id, { sender: user.name, content: inputValue })
    }
  }
1
  const sendMessage = async (id, message) => {
    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, message }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Message sent successfully:', data);
      } else {
        console.error('Error sending maessage:', data.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  return (
    <div className='flex flex-grow flex-col items-center relative flex-1 py-4 px-6 bg-gray-100'>
      <div className="flex-grow flex flex-col items-center justify-center">
        {chat ? <div className="">{chat.name}</div> : <p className=''>Message UnGPT</p>}
      </div>
      <form onSubmit={handleSubmit} className='flex flex-row w-full bg-white duration-500 delay-150 px-3 py-1 m-3 rounded-full outline outline-2 outline-gray-300 hover:outline-black focus-within:outline-black'>
        <input className="bg-transparent outline-none w-full text-wrap" value={inputValue} onChange={handleInputChange} placeholder='Message UnGPT'/>
        <button type='submit' disabled={!inputValue.trim()}><ArrowUpCircleIcon className={`h-10 ${!inputValue.trim() ? 'opacity-50' : 'opacity-100'}`}/></button>
      </form>
    </div>
  )
}
