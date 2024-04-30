import { Link } from "react-router-dom";
import FormUser from "../components/FormUser";

export default function UserCreate(): JSX.Element {
  return (
    <main className="px-5 py-7 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-3">Usuarios</h1>
      <div className="text-sm breadcrumbs mb-3">
        <ul>
          <li><a>Inicio</a></li>
          <li><Link to="/">Usuarios</Link></li>
          <li>Crear usuario</li>
        </ul>
      </div>

      <FormUser />
    </main>
  )
}