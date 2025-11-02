import { sql } from "@vercel/postgres"
import { withAuth } from "../../../lib/auth"
 
export default withAuth(async (request, response) => {
    if (request.method !== 'GET') {
        response.status(405).json({ error: "Invalid HTTP method" })
        return
    }

    const { accountId } = request.user

    try {  
        const { rows } = await sql`SELECT Chats FROM Accounts WHERE Id = ${accountId}`
        const account = rows[0]
        const chatIds = account.chats
        response.status(200).json({ chatIds })
        return
    } catch {
        response.status(500).json({ error: "Something went wrong" })
        return
    }
})