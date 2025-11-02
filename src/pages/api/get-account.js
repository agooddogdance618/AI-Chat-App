import { sql } from "@vercel/postgres"

export default async function handler(request, response) {
    // try {
        // const { id } = request.query
        // const { rows } = await sql`SELECT * FROM Accounts WHERE Id = ${id}`
        // const account = rows[0]
        // response.status(200).json({ account })
        // return
    // } catch (error) {
        // response.status(500).json({ error })
        // return
    // }
    response.status(403).json({ error: "This API route has been disabled in production for security reasons. It is intended for internal testing environments only." })
    return
}