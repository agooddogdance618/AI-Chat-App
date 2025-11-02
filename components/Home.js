import Body from "./Body";
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { useRef, useState } from "react";

export default function Home({ chat }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const overlayRef = useRef(null)

  const handleClickOutside = (e) => {
    if (overlayRef.current && overlayRef.current === e.target) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="flex flex-col w-full home">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <div className='flex flex-row flex-1 relative w-full h-full overflow-hidden'>
        <Sidebar className="flex-none h-full" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <div
          ref={overlayRef}
          onClick={handleClickOutside}
          className={`fixed inset-0 bg-black bg-opacity-40 z-10 ${sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} md:hidden transition-opacity duration-300`}
        />
        {chat === undefined ? <Loading className="flex flex-1 flex-col items-center justify-center w-full h-full"/> : <Body chat={chat} className="flex-1 h-full min-w-0"/>}
      </div>
    </div>
  )
}
