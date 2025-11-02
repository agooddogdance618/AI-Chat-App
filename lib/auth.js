import jwt from "jsonwebtoken"

export function withAuth(handler) {
    return async (request, response) => {
        const token = request.headers.authorization?.split(' ')[1]
        
        if(!token) {
            response.status(401).json({ error: 'Authentication required' })
            return
        }
    
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
            request.user = user
            return handler(request, response)
        } catch (err) {
            response.status(401).json({ error: 'Invalid token' })
            return
        }
    }
}