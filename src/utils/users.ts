import { PostgrestError } from "@supabase/supabase-js"
import { supabase } from "../config/supabase"
import { FormErrors, User, UserToCreate } from "../types"

export const getUsers = async (): Promise<User[]> => {
  const { data } = await supabase
    .from('usuarios')
    .select()
    .order('id', { ascending: false })
  return data as User[]
}

export const getUser = async (id: number): Promise<User|null> => {
  const { data } = await supabase
    .from('usuarios')
    .select()
    .eq('id', id)
    .limit(1)
  if(data?.[0]) return data[0] as User
  return null
}

export const createUser = async(userData: UserToCreate): Promise<{
  error: PostgrestError|null,
  user: User|null
}> => {
  const { error, data } = await supabase
    .from('usuarios')
    .insert(userData)
    .select()

  if(error) return {error, user: null}

  const user: User = {
    id: data[0].id,
    nombre: data[0].nombre,
    apellidos: data[0].apellidos,
    img_path: data[0].img_path,
    correo: data[0].correo,
    documento: data[0].documento,
    fecha_nacimiento: data[0].fecha_nacimiento,
  }

  return {error: null, user}
}

export const deleteUser = async (id: number): Promise<{
  error: PostgrestError | null;
  status: number;
}> => {
  const {error, status, data} = await supabase
    .from('usuarios')
    .delete()
    .eq('id', id)
    .select()

  // delete image
  if(data?.[0]) {
    await deleteAvatar(data[0].img_path)
  }

  return {error, status}
}

// tipar la salida de la funcion no es tan necesario
export const updateUser = async (id: number, newUser: UserToCreate) => {
  const {data, error} = await supabase
    .from('usuarios')
    .update(newUser)
    .eq('id', id)
    .select()

  return {data, error}
}

export const getUserFromForm = (form: FormData): {user: UserToCreate, formErrors: FormErrors} => {
  const formErrors: FormErrors = {}

  const nombre = form.get('nombre')?.toString() || ''
  if(!nombre) formErrors.nombre = 'El nombre es requerido.'
  else if(!(/^[a-zA-Z]+$/.test(nombre))) formErrors.nombre = 'Los nombres no llevan numeros.'

  const apellidos = form.get('apellidos')?.toString() || ''
  if(!apellidos) formErrors.apellidos = 'Los apellidos son requerido.'
  else if(!(/^[a-zA-Z]+$/.test(apellidos))) formErrors.apellidos = 'Los apellidos no llevan numeros.'

  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const correo = form.get('correo')?.toString() || ''
  if(!correo) formErrors.correo = 'El correo es requerido.'
  else if(!regexEmail.test(correo)) formErrors.correo = 'El correo no parece ser valido.'

  const documento = form.get('documento')?.toString() || ''
  if(!documento) formErrors.documento = 'El documento es requerido.'
  else if(isNaN(+documento)) formErrors.documento = 'El documento solo debe tener numeros.'

  const fecha_nacimiento = form.get('fecha_nacimiento')?.toString() || ''
  if(!fecha_nacimiento) formErrors.fecha_nacimiento = 'La fecha de nacimiento es requerida.'
  else if(new Date(fecha_nacimiento) > new Date()) formErrors.fecha_nacimiento = 'La fecha debe ser en el pasado.'

  return ({
    user: ({
      nombre,
      apellidos,
      correo,
      documento,
      fecha_nacimiento,
    }),
    formErrors
  })
}

export const uploadAvatar = async (file: File) => {
  const name = file.name.split('.')[0]
  const extname = file.name.split('.')[1]
  const { data, error } = await supabase
    .storage
    .from('avatars')
    .upload(`public/${Date.now()}-${name}.${extname}`, file, {
      cacheControl: '3600',
      upsert: false
    })

  return {data, error}
}

export const deleteAvatar = async (path:string) => {
  const {error, data} = await supabase
    .storage
    .from('avatars')
    .remove([path])

  return {data, error}
}