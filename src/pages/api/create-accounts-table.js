import { sql } from '@vercel/postgres'

export default async function handler(request, response) {
    // try {
        // const result = await sql`CREATE TABLE Accounts ( Id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), Name varchar(255) NOT NULL, Email varchar(255) UNIQUE NOT NULL, Password varchar(255) NOT NULL, Chats UUID[] DEFAULT '{}');`
        // const result = await sql`DROP TABLE Accounts`
        // response.status(200).json({ result })
        // return
    // } catch (error) {
        // response.status(500).json({ error })
        // return
    // }
    response.status(403).json({ error: "This API route has been disabled in production for security reasons. It is intended for internal testing environments only." })
    return
}