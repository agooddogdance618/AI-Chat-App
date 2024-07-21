import { sql } from "@vercel/postgres"

export default async function handler(request, response) {
    try {
       const { id, message } = request.body
       const { rows: chatRows } = await sql`SELECT * FROM Chats WHERE Id = ${id}`
       const chat = chatRows[0]
       const updatedMessages = [...chat.messages, message];
       const { rows: updatedChatRows } = await sql`UPDATE Chats SET messages = ${JSON.stringify(updatedMessages)}::jsonb WHERE id = ${id} RETURNING *`;
       return response.status(200).json(updatedChatRows[0]);
    } catch (error) {
        return response.status(500).json({ error })
    }
}