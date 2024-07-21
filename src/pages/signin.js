import Link from 'next/link'
import React, { useContext, useState } from 'react'
import AuthContext from '../../contexts/authContext'

export default function Signin() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      alert("BAD")
      return
    }
    await login(email, password)
  }

  return (
    <div className='flex items-center bg-blue-700 justify-center h-screen'>
      <div className='flex flex-col m-5 md:m-0 grow bg-white border-4 border-gray-700 max-w-screen-sm rounded-xl p-5'>
        <h1 className='text-center text-3xl font-semibold mb-5'>Sign In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center mb-5'>
            <input type='text' onChange={e => {setEmail(e.target.value)}} className='w-1/2 p-1 duration-500 delay-150 scale-100 hover:scale-110 focus:scale-110 outline outline-2 rounded outline-gray-500 hover:outline-black focus:outline-black mb-3' placeholder='Email'/>
            <input type='password' onChange={e => {setPassword(e.target.value)}} className='w-1/2 p-1 duration-500 delay-150 scale-100 hover:scale-110 focus:scale-110 outline outline-2 rounded outline-gray-500 hover:outline-black focus:outline-black mb-4' placeholder='Password'/>
            <button className='w-1/3 duration-500 delay-150 scale-100 hover:scale-125 outline outline-2 outline-gray-500 hover:outline-black font-medium bg-green-500 p-1 rounded-full'>Sign In</button>
        </form>
        <div className='text-center'>Don't have an account? <Link className='underline' href="/register">Sign Up</Link></div>
      </div>
    </div>
  )
}
