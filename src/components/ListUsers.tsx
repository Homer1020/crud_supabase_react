import { Link } from "react-router-dom";
import { User } from "../types";
import { calcularEdad } from "../utils/helpers";
import { deleteUser } from "../utils/users";
import InfoUser from "./InfoUser";
import Avatar from "./Avatar";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useState } from "react";

const MySwal = withReactContent(Swal)

export default function ListUsers({ users, updateUsers }: { users: User[], updateUsers: () => void }): JSX.Element {
  const [deleting, setDeleting] = useState<number|null>(null)

  const handleDeleteUser = async (id: number) => {
    MySwal.fire({
      title: "Seguro que quieres eliminar a este usuario?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      background: '#212121',
      color: '#fff'
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setDeleting(id)
        const {error} = await deleteUser(id)
        if(!error) {
          Swal.fire({
            title: "Eliminado!",
            icon: "success",
            background: '#212121',
            color: '#fff'
          })
          updateUsers()
          setDeleting(null)
        }
      }
    })
  }

  const handleShowUser = (id: number) => {
    const $modal = document.getElementById(`modal_user_${id}`) as HTMLDialogElement
    if($modal) $modal.showModal()
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Documento</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {!users.length && (
            <tr>
              <td colSpan={8}>
              <div role="alert" className="alert">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Sin registros</span>
              </div>
              </td>
            </tr>
          )}
          {users.map((user) => (
            <tr key={ user.id }>
              <th>#{user.id}</th>
              <td>
                <Avatar img_path={user.img_path} className="w-12 rounded" />
              </td>
              <td>{user.nombre}</td>
              <td>{user.apellidos}</td>
              <td>{user.correo}</td>
              <td>V - {user.documento}</td>
              <td>{calcularEdad(new Date(user.fecha_nacimiento))} años</td>
              <td className="text-nowrap">
                <button disabled={deleting === user.id} onClick={ () => { handleDeleteUser(user.id) } } className="btn btn-square mr-2 btn-error">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>

                <Link to={`/usuarios/${user.id}/editar`} className={`btn btn-square btn-warning mr-2 ${deleting === user.id ? 'btn-disabled' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </Link>

                <InfoUser
                  user={user}
                />

                <button disabled={deleting === user.id} className="btn btn-square btn-success" onClick={() => { handleShowUser(user.id) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 1.5a.75.75 0 0 1 .75.75V4.5a.75.75 0 0 1-1.5 0V2.25A.75.75 0 0 1 12 1.5ZM5.636 4.136a.75.75 0 0 1 1.06 0l1.592 1.591a.75.75 0 0 1-1.061 1.06l-1.591-1.59a.75.75 0 0 1 0-1.061Zm12.728 0a.75.75 0 0 1 0 1.06l-1.591 1.592a.75.75 0 0 1-1.06-1.061l1.59-1.591a.75.75 0 0 1 1.061 0Zm-6.816 4.496a.75.75 0 0 1 .82.311l5.228 7.917a.75.75 0 0 1-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 0 1-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 0 1-1.247-.606l.569-9.47a.75.75 0 0 1 .554-.68ZM3 10.5a.75.75 0 0 1 .75-.75H6a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 10.5Zm14.25 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H18a.75.75 0 0 1-.75-.75Zm-8.962 3.712a.75.75 0 0 1 0 1.061l-1.591 1.591a.75.75 0 1 1-1.061-1.06l1.591-1.592a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                  </svg>


                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}