import { sql } from '@vercel/postgres'
import bcryptjs from 'bcryptjs'

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        response.status(405).json({ error: "Invalid HTTP method" })
        return
    }

    const { name, email, password } = request.body

    try {
        const hashedPassword = await bcryptjs.hash(password, 10)
        await sql`INSERT INTO Accounts (Name, Email, Password) VALUES (${name}, ${email}, ${hashedPassword});`
        response.status(200).end()
        return
    } catch {
        response.status(500).end()
        return
    }
}