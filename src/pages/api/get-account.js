import { sql } from "@vercel/postgres"

export default async function handler(request, response) {
    try {
       const { id } = request.query
       const { rows } = await sql`SELECT * FROM Accounts WHERE Id = ${id}`
       const account = rows[0]
       return response.status(200).json({ account });
    } catch (error) {
        return response.status(500).json({ error })
    }
}