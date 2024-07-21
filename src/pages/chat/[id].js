import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Home from '../../../components/Home'
import AuthContext from '../../../contexts/authContext'

export default function Chat() {
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const [userChatIds, setUserChatIds] = useState([])
  const [chat, setChat] = useState(null)

  useEffect(() => {
    if(user && user.accountId) {
      fetchChatIds()
    }
  }, [user])

  useEffect(() => {
    if (userChatIds.length !== 0) {
      if (!userChatIds.includes(router.query.id)) {
        router.push('/')
      } else {
        fetchChat()
      }
    }
  }, [userChatIds]);

  const fetchChatIds = async () => {
    try {
      const response = await fetch(`/api/get-chat-ids?id=${user.accountId}`);
      const data = await response.json();
      if (response.ok) {
        setUserChatIds(data.chatIds)
      } else {
        console.error(`Error fetching account's chats: ${data.error}`);
      }
    } catch (error) {
      console.error(`Error fetching account's chats: ${error}`);
    }
  };

  const fetchChat = async () => {
    try {
      const response = await fetch(`/api/get-chat?id=${router.query.id}`)
      const data = await response.json()
      if (response.ok) {
        setChat(data.chat)
      } else {
        console.error(`Error fetching chat: ${data.error}`);
      }
    } catch (error) {
      console.error(`Error fetching chat: ${error}`);
    }
  }

  return (
    <Home chat={chat} />
  )
}
