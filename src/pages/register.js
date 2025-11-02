import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!name || !email || !password || !confirmPassword || password != confirmPassword) {
      setLoading(false)
      setMessage(password != confirmPassword ? "Passwords do not match" : "All fields are required")
      return
    }
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
      if (!res.ok) {
        setLoading(false)
        setMessage('Something went wrong')
        return
      }
    } catch {
      setLoading(false)
      setMessage('Something went wrong')
      return
    }
    
    const form = e.target
    form.reset()
    router.push('/signin')
  }

  return (
    <div className='flex items-center bg-gray-200 justify-center h-full w-full'>
      <div className='flex flex-col m-5 md:m-0 grow bg-gray-100 border-4 border-gray-700 max-w-screen-sm rounded-xl p-5'>
        <h1 className={`text-center text-3xl font-semibold ${message ? 'mb-3' : 'mb-5'}`}>Sign Up</h1>
        {message && <p className='text-center text-red-500 font-medium mb-3'>{message}</p>}
        <form onSubmit={handleSubmit} className='flex flex-col items-center mb-5'>
            <input type='text' disabled={loading} onChange={e => {setName(e.target.value)}} className={`w-1/2 p-1 duration-500 delay-150 scale-100 outline outline-2 rounded outline-gray-500 mb-3 ${loading ? '' : 'hover:scale-110 focus:scale-110 hover:outline-black focus:outline-black'}`} placeholder='Name'/>
            <input type='text' disabled={loading} onChange={e => {setEmail(e.target.value)}} className={`w-1/2 p-1 duration-500 delay-150 scale-100 outline outline-2 rounded outline-gray-500 mb-3 ${loading ? '' : 'hover:scale-110 focus:scale-110 hover:outline-black focus:outline-black'}`} placeholder='Email'/>
            <input type='password' disabled={loading} onChange={e => {setPassword(e.target.value)}} className={`w-1/2 p-1 duration-500 delay-150 scale-100 outline outline-2 rounded outline-gray-500 mb-4 ${loading ? '' : 'hover:scale-110 focus:scale-110 hover:outline-black focus:outline-black'}`} placeholder='Password'/>
            <input type='password' disabled={loading} onChange={e => {setConfirmPassword(e.target.value)}} className={`w-1/2 p-1 duration-500 delay-150 scale-100 outline outline-2 rounded outline-gray-500 mb-4 ${loading ? '' : 'hover:scale-110 focus:scale-110 hover:outline-black focus:outline-black'}`} placeholder='Confirm Password'/>
            <button type='submit' disabled={loading} className={`w-1/3 duration-500 delay-150 scale-100 outline outline-2 outline-gray-500 font-medium p-1 rounded-full ${loading ? 'bg-gray-300' : 'bg-green-500 hover:scale-125 hover:outline-black'}`}>Sign Up</button>
        </form>
        <div className='text-center'>Already have an account? <Link className='underline' href="/signin">Sign In</Link></div>
      </div>
    </div>
  )
}
