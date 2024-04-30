import { Link, useParams } from "react-router-dom";
import FormUser from "../components/FormUser";
import { getUser } from "../utils/users";
import { useEffect, useState } from "react";
import { User } from "../types";
import Loader from "../components/Loader";

export default function UserEdit() {
  const { id } = useParams()
  const [user, setUser] = useState<User|null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if(id) {
      getUser(+id)
        .then(user => {
          setUser(user)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [id])

  return (
    <main className="px-5 py-7 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-3">Usuarios</h1>
      <div className="text-sm breadcrumbs mb-3">
        <ul>
          <li><a>Inicio</a></li>
          <li><Link to="/">Usuarios</Link></li>
          <li>Editar usuario</li>
        </ul>
      </div>

      {
      loading
        ? <Loader />
        : (
          <FormUser
            user={ user || undefined }
          />
        )
      }
    </main>
  )
}