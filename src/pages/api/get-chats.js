import { sql } from "@vercel/postgres"

export default async function handler(request, response) {
    try {
       const { accountId } = request.query
       const { rows: accountsRows } = await sql`SELECT * FROM Accounts WHERE Id = ${accountId}`;
       const account = accountsRows[0]
       const chatIds = account.chats
       const { rows: chats } = await sql`SELECT * FROM Chats WHERE id = ANY(${chatIds})`
       return response.status(200).json({ chats });
    } catch (error) {
        return response.status(500).json({ error })
    }
}