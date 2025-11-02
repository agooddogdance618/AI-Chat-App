import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (router.pathname == "/signin" || router.pathname == "/register") return
        const token = localStorage.getItem('token')
        if (token) {
            fetchUser(token)
        } else {
            router.replace('/signin')
            setLoading(false)
            return
        }
    }, [router.asPath])

    const fetchUser = async (token) => {
        try {
            const res = await fetch('/api/verify', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
            const data = await res.json()
            if (!res.ok) {
                console.error(data.error)
                logout()
                return
            }
            setUser(data.account)
        } finally {
            setLoading(false)
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
            const data = await res.json()
            if (!res.ok) return data.error || "Login failed"
            setUser(data.account)
            localStorage.setItem('token', data.token)
            fetchUser(data.token)
            router.replace('/')
            return null
        } catch {
            return 'Something went wrong'
        }
    }

    let redirecting = false

    const logout = () => {
        if (redirecting) return
        redirecting = true
        setUser(null)
        localStorage.removeItem('token')
        router.replace('/signin')
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext