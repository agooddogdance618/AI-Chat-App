import React, { useContext, useEffect, useRef, useState } from 'react'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import AuthContext from '../contexts/authContext'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default function Body({chat}) {
  const router = useRouter()
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState(chat?.messages ?? [])
  const [firstLoad, setFirstLoad] = useState(true)
  const { user, logout } = useContext(AuthContext)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (chat?.messages) setMessages(chat.messages)
  }, [chat])

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || !user) return

    const message = { sender: user.name, content: inputValue }

    if (!chat) {
      try {
        const response = await fetch('/api/create-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ accountId: user.accountId, name: inputValue }),
        })
        const data = await response.json()
        if (response.ok) {
          sendMessage(data.chatId, message)
          aiResponse(data.chatId, message)
          router.push(`/chat/${data.chatId}?new=true`)
        } else {
          console.error('Error creating chat: ', data.error)
          if (response.status === 401) {
            console.error('Unauthorized — token invalid or expired')
            logout()
          }
        }
      } catch {
        console.error('Error creating chat')
      }
    } else {
      sendMessage(chat.id, message)
      aiResponse(chat.id, message)
    }
    setInputValue("")
  }

  const sendMessage = async (id, message) => {
    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ id, message }),
      })
      let data
      if (response.ok) {
        console.log('Message sent successfully')
        setMessages((prev) => [...(prev || []), message])
      } else {
        data = await response.json()
        console.error('Error sending message:', data.error)
        if (response.status === 401) {
          console.error('Unauthorized — token invalid or expired')
          logout()
        }
      }
    } catch {
      console.error('Error sending message')
    }
  }

  const aiResponse = async (id, message) => {
    try {
      const response = await fetch('/api/ai-response', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(message)
      })
      const data = await response.json()
      if (response.ok) {
        console.log('Response:', data);
        sendMessage(id, { sender: "AI", content: data.result })
      } else {
        console.error('Error getting response:', data.error)
        if (response.status === 401) {
          console.error('Unauthorized — token invalid or expired')
          logout()
        }
      }
    } catch {
      console.log('Error getting response')
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: firstLoad ? "auto" : "smooth", block: "end" })
    if (firstLoad) setFirstLoad(false)
  }, [messages])

  return (
    <div className="flex flex-col items-center relative flex-1 min-w-0 max-w-full h-full bg-gray-100">
      <div className="flex flex-col w-full flex-1 min-w-0 px-5 md:px-20 py-20 overflow-y-auto overflow-x-hidden space-y-2 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-500 scrollbar-track-transparent">
        {chat && messages.length > 0 ? (
          messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.sender === "AI" ? "items-start" : "items-end"}`}>
              <div className={`px-4 py-2 rounded-2xl ${msg.sender === "AI" ? "bg-gray-200 text-gray-800 rounded-bl-none max-w-full" : "bg-blue-500 text-white rounded-br-none max-w-[50%]"}`}>
                {msg.sender === 'AI' ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[[rehypeKatex, { strict: false }]]}>
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
              <div className='text-gray-400 text-xs font-medium'>{msg.sender}</div>
            </div>
          ))
        ) : <h1 className='text-center text-3xl font-semibold'>Message UnGPT</h1>}
        <div className='scroll-my-20' ref={scrollRef} />
      </div>
      <div className="pointer-events-none absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-gray-100 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-100 to-transparent" />
      <form onSubmit={handleSubmit} className='flex flex-row absolute w-3/4 bg-white duration-500 delay-150 px-3 py-1 bottom-5 rounded-full outline outline-2 outline-gray-300 hover:outline-black focus-within:outline-black'>
        <input className="bg-transparent outline-none w-full text-wrap" value={inputValue} onChange={handleInputChange} placeholder='Message UnGPT'/>
        <button type='submit' disabled={!inputValue.trim()}><ArrowUpCircleIcon className={`h-10 duration-300 ${!inputValue.trim() ? 'opacity-50' : 'opacity-100'}`}/></button>
      </form>
    </div>
  )
}
