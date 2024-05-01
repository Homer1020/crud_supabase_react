import { ChangeEvent, useEffect, useRef, useState } from "react";
import ListUsers from "../components/ListUsers";
import { getUsers } from "../utils/users";
import { User } from "../types";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function UsersPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([])
  const [filterUsers, setFilterUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data)
        setFilterUsers(data)
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
        setFilterUsers(data)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
        if(searchRef.current) searchRef.current.value = ''
      })
    setLoading(false)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    interface UserSearch extends Partial<User> {
      fecha_nacimiento?: string
    }

    const search = e.target.value
    const filteredUsers = users.filter(user => {
      const realUser: UserSearch = {...user}
      delete realUser.img_path
      delete realUser.fecha_nacimiento
      return Object.values(realUser).some(value => `${value}`.toLowerCase().includes(search.toLowerCase()))
    })
    setFilterUsers(filteredUsers)
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
      <div className="md:flex mb-6">
        <Link to="/usuarios/crear" className="btn btn-primary mb-5 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Crear registro
        </Link>
        <label className="input input-bordered flex items-center gap-2 max-w-150 ml-auto">
          <input ref={searchRef} type="text" className="grow" placeholder="Buscar..." onChange={handleSearch} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>
      </div>
      {
        loading
        ?  (
          <Loader />
        )
        : (
          <ListUsers
            users={filterUsers}
            updateUsers={updateUsers}
          />
        )
      }
    </main>
  )
}