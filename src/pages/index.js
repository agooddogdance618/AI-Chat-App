import { useContext, useEffect } from "react";
import Home from "../../components/Home";
import AuthContext from '../../contexts/authContext'
import { useRouter } from "next/router";
import Loading from "../../components/Loading";

export default function index() {
  const { user, loading } = useContext(AuthContext)

  if (loading || !user) return <Loading/>

  return (
    <Home chat={null}/>
  )
}
