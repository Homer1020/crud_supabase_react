import { User } from "../types";
import { calcularEdad } from "../utils/helpers";
import Avatar from "./Avatar";

export default function InfoUser({ user }: { user: User }) {
  return (
    <dialog id={`modal_user_${user.id}`} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <Avatar
          img_path={user.img_path}
          className="w-40 rounded"
        />
        <h3 className="font-bold text-lg">{user.nombre} {user.apellidos}</h3>
        <ul>
          <li className="text-base my-2"><span className="font-bold">Edad: </span> {calcularEdad(new Date(user.fecha_nacimiento))} años</li>
          <li className="text-base my-2"><span className="font-bold">Documento: </span> V - {user.documento}</li>
          <li className="text-base my-2"><span className="font-bold">Correo: </span> V - {user.correo}</li>
        </ul>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Cerrar</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}