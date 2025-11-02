import { sql } from "@vercel/postgres"
import { validate as isUUID } from 'uuid'
import { withAuth } from "../../../lib/auth"

export default withAuth(async (request, response) => {
    if (request.method !== 'PATCH') {
        response.status(405).json({ error: "Invalid HTTP method" })
        return
    }

    const { id, name } = request.body
    const { accountId } = request.user

    if(!isUUID(id)) {
        response.status(400).json({ error: "Invalid chat ID" })
        return
    }

    try {
        const { rows : accountRows } = await sql`SELECT EXISTS ( SELECT 1 FROM Accounts WHERE Id = ${accountId} AND ${id}::uuid = ANY(Chats) ) AS chat_exists;`
        const chatExists = accountRows[0]?.chat_exists ?? false
        if (!chatExists) {
            response.status(400).json({ error: "Invalid chat ID" })
            return
        }
        await sql`UPDATE Chats SET Name = ${name} WHERE Id = ${id};`
        response.status(200).end()
        return
    } catch {
        response.status(500).json({ error: "Something went wrong" })
        return
    }
})