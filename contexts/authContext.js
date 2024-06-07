import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            fetchUser(token)
        }
    }, [])

    const fetchUser = async (token) => {
        try {
            const res = await fetch('/api/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            if (!res.ok) throw new Error('Failed to fetch user')
            const data = await res.json()
            setUser(data.account)
        } catch (err) {
            setUser(null)
        }
    }

    const login = async (email, password) => {
        try {
            const res = await fetch("api/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            if (!res.ok) throw new Error('Login failed')
            const data = await res.json()
            setUser(data.account)
            localStorage.setItem('token', data.token)
            fetchUser(data.token)
            router.push('/')
        } catch (err) {
            console.error('Login failed', err)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
        router.push('/')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext