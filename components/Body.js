import React from 'react'
import Sidebar from './Sidebar'

export default function Body() {
  return (
    <div className='flex flex-row h-screen fixed w-full'>
      <Sidebar/>
      <div className='flex flex-col items-center relative flex-1 bg-blue-500'>
        <div className="">messages</div>
        <div className="max-w-[694.4px]">input</div>
      </div>
    </div>
  )
}
