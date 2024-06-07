import { sql } from '@vercel/postgres'

export default async function handler(request, response) {
    try {
       const { name, email, password } = request.body
       await sql`INSERT INTO Accounts (Name, Email, Password) VALUES (${name}, ${email}, ${password});`
    } catch (error) {
        return response.status(500).json({ error })
    }

    const accounts = await sql`SELECT * FROM Accounts;`
    return response.status(200).json({ accounts })
}