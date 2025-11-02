import { sql } from '@vercel/postgres'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

const TOKEN_EXPIRATION = "1000000"

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        response.status(405).json({ error: "Invalid HTTP method" })
        return
    }

    const { email, password } = request.body

    if (!email || !password) {
        response.status(400).json({ error: "All fields are required" })
        return
    } 
    try { 
        const  { rows } = await sql`SELECT * FROM Accounts WHERE Email = ${email}`
        const account = rows[0]
        if (!account) {
            response.status(404).json({ error: "No account found" })
            return
        }
        if (!await bcryptjs.compare(password, account.password)) {
            response.status(401).json({ error: "Invalid password" })
            return
        }
        const token = jwt.sign({ accountId: account.id, name: account.name , email: account.email }, process.env.JWT_SECRET_KEY, { expiresIn:TOKEN_EXPIRATION })
        response.status(200).json({ token, account })
        return
    } catch {
        response.status(500).json({ error: "Something went wrong" })
        return
    }
}