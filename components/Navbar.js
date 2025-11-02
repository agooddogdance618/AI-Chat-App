import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useContext(AuthContext)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <header className="sticky flex justify-between top-0 z-30 p-2 px-10 bg-white">

        <div className="flex md:hidden items-center">
            <button onClick={toggleSidebar}><Bars3Icon className="h-8 translate-y-0.5"/></button>
        </div>

        <div className="flex items-center">
            <h1>LOGO</h1>
        </div>

        <div className="flex items-center">
            {user ? <button onClick={logout} className="px-5 py-2 rounded-full bg-green-500">Log Out</button> : <Link href="/signin"><button className="px-5 py-2 rounded-full bg-green-500">Sign In</button></Link>}
        </div>

    </header>
  );
}
