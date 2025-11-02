import Link from 'next/link'
import React, { useContext, useState } from 'react'
import AuthContext from '../../contexts/authContext'

export default function Signin() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!email || !password) {
      setLoading(false)
      setMessage("All fields are required")
      return
    }
    const errMsg = await login(email, password)
    if (errMsg) {
      console.error(errMsg)
      setLoading(false)
      setMessage(errMsg)
    }
  }

  return (
    <div className='flex items-center bg-gray-200 justify-center h-full w-full'>
      <div className='flex flex-col m-5 md:m-0 grow bg-gray-100 border-4 border-gray-700 max-w-screen-sm rounded-xl p-5'>
        <h1 className={`text-center text-3xl font-semibold ${message ? 'mb-3' : 'mb-5'}`}>Sign In</h1>
        {message && <p className='text-center text-red-500 font-medium mb-3'>{message}</p>}
        <form onSubmit={handleSubmit} className='flex flex-col items-center mb-5'>
            <input type='text' disabled={loading} onChange={e => setEmail(e.target.value)} className={`w-1/2 p-1 bg-white duration-500 delay-150 scale-100  outline outline-2 rounded outline-gray-500 mb-3 ${loading ? '' : 'hover:scale-110 focus:scale-110 hover:outline-black focus:outline-black'}`} placeholder='Email'/>
            <input type='password' disabled={loading} onChange={e => setPassword(e.target.value)} className={`w-1/2 p-1 bg-white duration-500 delay-150 scale-100 outline outline-2 rounded outline-gray-500 mb-4 ${loading ? '' : 'hover:scale-110 focus:scale-110 hover:outline-black focus:outline-black'}`} placeholder='Password'/>
            <button type='submit' disabled={loading} className={`w-1/3 duration-500 delay-150 scale-100 outline outline-2 outline-gray-500 font-medium p-1 rounded-full ${loading ? 'bg-gray-300' : 'bg-green-500 hover:scale-125 hover:outline-black'}`}>Sign In</button>
        </form>
        <div className='text-center'>Don't have an account? <Link className='underline' href="/register">Sign Up</Link></div>
      </div>
    </div>
  )
}
