import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useContext, useEffect } from "react";
import { authContext } from "./context/AuthContext";

export default function App() {
  const { auth, loading } = useContext(authContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(!auth && !loading) {
      navigate('/login')    
    }
  }, [auth, navigate, loading])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        { (!loading && auth) && <Outlet /> }
      </div>
      <Footer />
    </div>
  )
}