import { Link, useRouteError } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Error() {
  const error: {status: number} = useRouteError() as { status: number }
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <main className="px-5 py-20 max-w-7xl mx-auto">
          <h1 className="text-7xl font-bold mb-4">{error.status}</h1>
          <p className="text-2xl mb-5">La pagina que solicitas no existe.</p>
          <Link className="btn btn-primary" to='/'>Salir de aqui</Link>
        </main>
      </div>
      <Footer />
    </div>
  )
}