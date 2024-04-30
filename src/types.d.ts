export interface User {
  id: number
  nombre: string
  apellidos: string
  correo: string
  img_path?: string,
  documento: string,
  fecha_nacimiento: string
}

export interface UserToCreate extends Omit<User, 'id'> {}

export type FormErrors = {
  nombre ?: string,
  apellidos ?: string,
  correo ?: string,
  documento ?: string,
  fecha_nacimiento ?: string,
  img_path ?: string,
}