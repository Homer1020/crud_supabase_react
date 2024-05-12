import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { supabase } from "../config/supabase";

export default function Navbar(): JSX.Element {
  const { auth, loading } = useContext(authContext)

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="bg-base-300">
      <div className="navbar max-w-7xl mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            <img src="/white-logo.svg" alt="Logo Homer Developer" width={120} />
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 items-center">
            {(auth && !loading) && (
              <>
                <li><Link to="/">Usuarios</Link></li>
                <li>
                  <button onClick={logout}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </svg>
                    Salir
                  </button>
                </li>
              </>
            )}
            {(!auth && !loading) && (<li><Link to="/login">Login</Link></li>)}
            {(loading) && (<li>
              <button className="btn btn-square">
                <span className="loading loading-spinner"></span>
              </button>
            </li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}