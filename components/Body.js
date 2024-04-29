import React from 'react'

export default function Body() {
  return (
    <div className='flex flex-row h-screen fixed w-full'>
      <div className='flex-shrink-0 justify-center hidden md:flex bg-green-500 w-[260px]'>
        <div>chats</div>
      </div>
      <div className='flex flex-col items-center relative flex-1 bg-blue-500'>
        <div className="">messages</div>
        <div className="max-w-[694.4px]">input</div>
      </div>
    </div>
  )
}
