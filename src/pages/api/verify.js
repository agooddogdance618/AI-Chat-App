import jwt from 'jsonwebtoken'

const JWT_SECRET_KEY = 'secret'

export default function handler(request, response) {
    const token = request.headers.authorization?.split(' ')[1]

    if(!token) {
        return response.status(401).json({ message: 'Authentication required' })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY)
        return response.status(200).json({ account: decoded })
    } catch (err) {
        return response.status(401).json({ message: 'Invalid token' })
    }
}