import { sql } from "@vercel/postgres"

export default async function handler(request, response) {
    try {
       const { id } = request.query
       const { rows } = await sql`SELECT Chats FROM Accounts WHERE id = ${id}`
       const { chats } = rows[0]
       return response.status(200).json({ chats });
    } catch (error) {
        return response.status(500).json({ error })
    }
}