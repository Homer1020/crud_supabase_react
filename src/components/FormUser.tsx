import { useState } from "react";
import { FormErrors, User } from "../types";
import { createUser, deleteAvatar, getUserFromForm, updateUser, uploadAvatar } from "../utils/users";
import Input from "./Input";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function FormUser({ user }: { user?: User }): JSX.Element {
  const [sending, setSending] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const navigate = useNavigate()

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSending(true)

    if(!(e.target instanceof HTMLFormElement)) return null

    const form = new FormData(e.target)

    // esto me dice tambien si los campos tienen errores ademas de parsear el FormData
    const {formErrors, user: userToCreate} = getUserFromForm(form)

    // upload avatar
    const file = form.get('img_path') as File

    if(file.size > 2 * 1024 * 1024) {
      formErrors.img_path = 'La imagen debe pesar 2mb o menos'
    }

    // validar el formulario
    if(Object.keys(formErrors).length) {
      setFormErrors(formErrors)
      setSending(false)
      return null
    }

    if(file.name) {
      if(user?.img_path) await deleteAvatar(user.img_path)
      const {data, error} = await uploadAvatar(file)
      if(!error && data) userToCreate.img_path = data.path
    }

    // si es actualizar
    if(user?.id) {
      const {error} = await updateUser(user.id, userToCreate)
      if(error) {
        Swal.fire({
          title: "Ocurrio un error inesperado",
          icon: "error",
          background: '#212121',
          color: '#fff'
        })
      }
      setSending(false)
      Swal.fire({
        title: "Usuario actualizado correctamente!",
        icon: "success",
        background: '#212121',
        color: '#fff'
      })
      navigate('/')
      return
    }

    const {error, user: createdUser} = await createUser(userToCreate)

    if(error) {
      if(+error.code == 23505 && error.message.includes('correo')) {
        setFormErrors({...formErrors, correo: 'El correo ya esta en uso'})
      }
      if(+error.code == 23505 && error.message.includes('documento')) {
        setFormErrors({...formErrors, documento: 'El documento ya esta en uso'})
      }
    }
    if(createdUser) {
      Swal.fire({
        title: "Usuario creado correctamente!",
        icon: "success",
        background: '#212121',
        color: '#fff'
      })
      navigate('/')
    }

    setSending(false)
  }

  return (
    <form onSubmit={ handleCreateUser }>
      {user && (
        <Avatar
          img_path={user.img_path}
          className="h-24 rounded"
        />
      )}
      <div className="flex flex-col md:grid gap-5 md:grid-cols-2">
        <div>
          <Input
            label="Nombre"
            name="nombre"
            placeholder="John"
            defaultValue={ user?.nombre }
            error={formErrors.nombre}
          />
        </div>

        <div>
          <Input
            label="Apellidos"
            name="apellidos"
            placeholder="Doe"
            defaultValue={user?.apellidos}
            error={formErrors.apellidos}
          />
        </div>

        <div>
          <Input
            label="Correo"
            name="correo"
            placeholder="johndoe@example.com"
            defaultValue={user?.correo}
            error={formErrors.correo}
          />
        </div>

        <div>
          <Input
            label="Cedula"
            name="documento"
            placeholder="V - 10101010"
            defaultValue={user?.documento}
            error={formErrors.documento}
          />
        </div>

        <div>
          <label htmlFor="img_path" className="label">Imagen de perfil</label>
          <input type="file" id="img_path" name="img_path" className="file-input-bordered file-input w-full" accept="image/*" />
          { formErrors.img_path && (
            <span className="text-red-400 mt-2 block text-sm">{formErrors.img_path}</span>
          ) }
        </div>

        <div>
          <Input
            type="date"
            label="Fecha de nacimiento"
            name="fecha_nacimiento"
            defaultValue={user?.fecha_nacimiento}
            error={formErrors.fecha_nacimiento}
          />
        </div>

        <div className="col-start-1 col-span-2 mt-5">
          <button disabled={sending} type="submit" className="btn btn-success">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
            </svg>

            Guardar
          </button>
        </div>
      </div>
    </form>
  )
}