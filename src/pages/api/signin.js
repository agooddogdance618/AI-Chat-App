import { sql } from '@vercel/postgres'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

const JWT_SECRET_KEY = 'secret'
const TOKEN_EXPIRATION = "1000000"

export default async function handler(request, response) {
    const { email, password } = request.body

    if (!email || !password) {
        return response.status(400).json({ error: "no email/password" })
    } 
    try { 
        const  { rows } = await sql`SELECT * FROM Accounts WHERE Email = ${email}`
        const account = rows[0]
        if (!account) {
            return response.status(404).json({ error: "no account found" })
        }
        if (!bcryptjs.compare(password, account.password)) {
            return response.status(401).json({ error: "incorrect password" })
        }
        const token = jwt.sign({ accountId: account.id, name: account.name , email: account.email }, JWT_SECRET_KEY, { expiresIn:TOKEN_EXPIRATION })
        return response.status(200).json({ token, account })
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}