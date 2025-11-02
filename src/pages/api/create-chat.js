import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'
import { withAuth } from '../../../lib/auth'

export default withAuth(async (request, response) => {
    if (request.method !== 'POST') {
        response.status(405).json({ error: "Invalid HTTP method" })
        return
    }

    const { name } = request.body
    const { accountId } = request.user

    if (!name) {
        response.status(400).json({ error: "Provide a chat name" })
        return
    }
    
    try {
        const { rows } = await sql`INSERT INTO Chats ( Name ) VALUES (${name}) RETURNING Id;`
        const chatId = rows[0].id
        await sql`UPDATE Accounts SET chats = array_append(chats, ${chatId}) WHERE Id = ${accountId}`
        response.status(200).json({ chatId })
        return
    } catch {
        response.status(500).json({ error: "Something went wrong" })
        return
    }
})