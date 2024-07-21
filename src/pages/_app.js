import "@/styles/globals.css";
import { AuthProvider } from "../../contexts/authContext";
import Navbar from "../../components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="flex flex-col h-full">
        <Navbar />
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>
      </div>
    </AuthProvider>
  )
}
