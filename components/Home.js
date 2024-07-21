import { useState } from "react";
import Body from "./Body";
import Sidebar from "./Sidebar";

export default function Home({ chat }) {
  return (
    <div className='flex flex-row h-full w-full'>
      <Sidebar className="h-full"/>
      <Body chat={chat} className="h-full flex-grow"/>
    </div>
  )
}
