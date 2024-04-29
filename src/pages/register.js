import Link from 'next/link'
import React from 'react'

export default function register() {
  return (
    <div className='flex items-center bg-blue-700 justify-center h-screen'>
      <div className='flex flex-col m-5 md:m-0 grow bg-white border-4 border-gray-700 max-w-screen-sm rounded-xl p-5'>
        <h1 className='text-center text-3xl font-semibold mb-5'>Sign Up</h1>
        <form className='flex flex-col items-center mb-5'>
            <input className='w-1/2 p-1 duration-500 delay-150 scale-100 hover:scale-110 focus:scale-110 outline outline-2 rounded outline-gray-500 hover:outline-black focus:outline-black mb-3' placeholder='Email'/>
            <input className='w-1/2 p-1 duration-500 delay-150 scale-100 hover:scale-110 focus:scale-110 outline outline-2 rounded outline-gray-500 hover:outline-black focus:outline-black mb-4' placeholder='Password'/>
            <input className='w-1/2 p-1 duration-500 delay-150 scale-100 hover:scale-110 focus:scale-110 outline outline-2 rounded outline-gray-500 hover:outline-black focus:outline-black mb-4' placeholder='Confirm Password'/>
            <button className='w-1/3 duration-500 delay-150 scale-100 hover:scale-125 outline outline-2 outline-gray-500 hover:outline-black font-medium bg-green-500 p-1 rounded-full'>Sign Up</button>
        </form>
        <div className='text-center'>Already have an account? <Link className='underline' href="/signin">Sign In</Link></div>
      </div>
    </div>
  )
}
