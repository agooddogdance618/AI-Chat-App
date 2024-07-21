import { sql } from '@vercel/postgres'

export default async function handler(request, response) {
    try {
        const result = await sql`CREATE TABLE Accounts ( Id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), Name varchar(255) NOT NULL, Email varchar(255) UNIQUE NOT NULL, Password varchar(255) NOT NULL, Chats UUID[] DEFAULT '{}');`
        //const result = await sql`DROP TABLE Accounts`
        return response.status(200).json({ result })
    } catch (error) {
        return response.status(500).json({ error })
    }
}