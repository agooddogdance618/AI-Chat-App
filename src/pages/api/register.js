import { sql } from '@vercel/postgres'
import bcryptjs from 'bcryptjs'

export default async function handler(request, response) {
    try {
       const { name, email, password } = request.body
       const hashedPassword = await bcryptjs.hash(password, 10)
       await sql`INSERT INTO Accounts (Name, Email, Password) VALUES (${name}, ${email}, ${hashedPassword});`
    } catch (error) {
        return response.status(500).json({ error })
    }

    const accounts = await sql`SELECT * FROM Accounts;`
    return response.status(200).json({ accounts })
}