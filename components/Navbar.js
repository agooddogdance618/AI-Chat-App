import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  return (
    <header className="sticky top-0 z-50 p-2 md:px-10 bg-blue-400 grid grid-cols-3">

        <div className="flex items-center">
            <h1>LOGO</h1>
        </div>

        <div className="flex items-center">

        </div>

        <div className="flex  items-center justify-end">
            {user ? <button onClick={logout} className="px-5 py-2 rounded-full bg-green-500">Log Out</button> : <Link href="/signin"><button className="px-5 py-2 rounded-full bg-green-500">Sign In</button></Link>}
        </div>

    </header>
  );
}
