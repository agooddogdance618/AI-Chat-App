import { sql } from "@vercel/postgres"

export default async function handler(request, response) {
    try {
       const { id } = request.query
       const { rows } = await sql`SELECT * FROM Chats WHERE Id = ${id}`
       const chat = rows[0]
       return response.status(200).json({ chat });
    } catch (error) {
        return response.status(500).json({ error })
    }
}