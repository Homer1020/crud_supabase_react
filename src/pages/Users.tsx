import { useEffect, useState } from "react";
import ListUsers from "../components/ListUsers";
import { getUsers } from "../utils/users";
import { User } from "../types";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function UsersPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const updateUsers = () => {
    setLoading(true)
    getUsers()
      .then((data) => {
        setUsers(data)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
    setLoading(false)
  }

  return (
    <main className="px-5 py-7 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-3">Usuarios</h1>
      <div className="text-sm breadcrumbs mb-3">
        <ul>
          <li><a>Inicio</a></li>
          <li>Usuarios</li>
        </ul>
      </div>
      <Link to="/usuarios/crear" className="btn btn-primary mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Crear registro
      </Link>
      {
        loading
        ?  (
          <Loader />
        )
        : (
          <ListUsers
            users={users}
            updateUsers={updateUsers}
          />
        )
      }
    </main>
  )
}