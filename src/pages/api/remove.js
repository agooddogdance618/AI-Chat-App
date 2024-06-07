import { sql } from '@vercel/postgres'

export default async function handler(request, response) {
    try {
       const { id, table } = request.query
       await sql`DELETE FROM ${sql(table)} WHERE Id = ${id};`
    } catch (error) {
        return response.status(500).json({ error })
    }

    const accounts = await sql`SELECT * FROM Accounts;`
    return response.status(200).json({ accounts })
}