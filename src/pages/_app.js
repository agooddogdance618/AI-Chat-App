import "@/styles/globals.css";
import 'katex/dist/katex.min.css';
import { AuthProvider } from "../../contexts/authContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 overflow-hidden">
          <Component {...pageProps} />
        </div>
      </div>
    </AuthProvider>
  )
}
