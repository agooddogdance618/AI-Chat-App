import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(request, response) {
    const { id, name } = request.body
    const messageId = uuidv4();
    const newChat = {
        id: messageId,
        name,
        messages: {}
    };
    try {
       const { rows } = await sql`SELECT * FROM Accounts WHERE Id = ${id}`
       const account = rows[0]
       const updatedChats = [...account.chats, newChat];
       const updatedChatsJSON = JSON.stringify(updatedChats)
       await sql`UPDATE Accounts SET chats = ${updatedChatsJSON}::jsonb WHERE Id = ${id}`
       return res.status(200).json({ message: 'Chat added successfully', newChat });
    } catch (error) {
        return response.status(500).json({ error })
    }
}