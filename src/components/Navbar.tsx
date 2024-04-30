import { Link } from "react-router-dom";

export default function Navbar(): JSX.Element {
  return (
    <div className="bg-base-300">
      <div className="navbar max-w-7xl mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            <img src="/white-logo.svg" alt="Logo Homer Developer" width={120} />
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Usuarios</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}