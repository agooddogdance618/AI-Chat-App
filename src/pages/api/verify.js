import jwt from 'jsonwebtoken'

export default function handler(request, response) {
    if (request.method !== 'GET') {
        response.status(405).json({ error: "Invalid HTTP method" })
        return
    }

    const token = request.headers.authorization?.split(' ')[1]

    if(!token) {
        response.status(401).json({ error: 'Authentication required' })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        response.status(200).json({ account: decoded })
        return
    } catch {
        response.status(401).json({ error: 'Invalid token' })
        return
    }
}