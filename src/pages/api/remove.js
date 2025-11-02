import { sql } from '@vercel/postgres'

export default async function handler(request, response) {
    // try {
        // const { id } = request.query
        // await sql`DELETE FROM Accounts WHERE Id = ${id};`
    // } catch (error) {
        // response.status(500).json({ error })
        // return
    // }

    // const accounts = await sql`SELECT * FROM Accounts;`
    // response.status(200).json({ accounts })
    // return

    response.status(403).json({ error: "This API route has been disabled in production for security reasons. It is intended for internal testing environments only." })
    return
}