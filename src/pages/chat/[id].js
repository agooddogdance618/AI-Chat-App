import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Home from '../../../components/Home'
import AuthContext from '../../../contexts/authContext'

export default function Chat() {
  const router = useRouter()
  const { id, new: isNew } = router.query
  const { user, logout } = useContext(AuthContext)
  const [userChatIds, setUserChatIds] = useState([])
  const [chatIdsError, setChatIdsError] = useState(false)
  const [chat, setChat] = useState(undefined)

  useEffect(() => {
    if (!user?.accountId) return

    if (chatIdsError || userChatIds.length === 0) {
      fetchChatIds()
    }
  }, [user?.accountId, id, chatIdsError])

  useEffect(() => {
    if (!id || userChatIds.length === 0) return

    setChat(undefined)

    if (userChatIds.includes(id)) {
      if (isNew === 'true') {
        const interval = setInterval(async () => {
          const newChat = await fetchChat()
          const lastMsg = newChat?.messages?.[newChat.messages.length - 1]
          if (lastMsg?.sender === 'AI') {
            clearInterval(interval)
            router.replace(`/chat/${id}`, undefined, { shallow: true })
          }
        }, 1500)

        return () => clearInterval(interval)
      } else {
        fetchChat()        
      }
    } else {
      setChat(null)
      console.error("Invalid chat ID")
      router.replace('/')
    }
  }, [userChatIds, id, isNew])

  const fetchChatIds = async () => {
    try {
      const response = await fetch("/api/get-chat-ids", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      });
      const data = await response.json()
      if (response.ok) {
        setUserChatIds(data.chatIds)
        setChatIdsError(false)
      } else {
        console.error("Error fetching account's chats: ", data.error)
        if (response.status === 401) {
          console.error('Unauthorized — token invalid or expired')
          logout()
          return
        }
        setChatIdsError(true)
        setChat(null)
      }
    } catch {
      console.error("Error fetching account's chats")
      setChatIdsError(true)
      setChat(null)
    }
  }

  const fetchChat = async () => {
    try {
      const response = await fetch(`/api/get-chat?id=${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      })
      const data = await response.json()
      if (response.ok) {
        setChat(data.chat)
        return data.chat
      } else {
        console.error("Error fetching chat: ", data.error)
        if (response.status === 401) {
          console.error('Unauthorized — token invalid or expired')
          logout()
          return
        }
        setChat(null)
        return null
      }
    } catch {
      console.error("Error fetching chat")
      setChat(null)
      return null
    }
  }

  return (
    <Home chat={chat === null ? null : chat} />
  )
}
