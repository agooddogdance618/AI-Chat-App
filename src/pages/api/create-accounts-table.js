import { sql } from '@vercel/postgres'

export default async function handler(request, response) {
    try {
        const result = await sql`CREATE TABLE Accounts ( Name varchar(255), Email varchar(255), Password varchar(255) );`
        return response.status(200).json({ result })
    } catch (error) {
        return response.status(500).json({ error })
    }
}