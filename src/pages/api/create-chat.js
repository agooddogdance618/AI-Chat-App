import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(request, response) {
    const { accountId, name } = request.body
    
    try {
       const { rows } = await sql`INSERT INTO Chats ( Name ) VALUES (${name}) RETURNING Id;`
       const chatId = rows[0].id
       await sql`UPDATE Accounts SET chats = array_append(chats, ${chatId}) WHERE id = ${accountId}`
       return response.status(200).json({ chatId });
    } catch (error) {
        return response.status(500).json({ error })
    }
}