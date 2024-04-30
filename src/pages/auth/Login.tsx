import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import Input from "../../components/Input"

export default function Login() {
  // const { login, auth, logout } = useContext<AuthContextInterface>(authContext)

  // const handleLogin = async (e) => {
  //   if (login) await login('homermoncallo@gmail.com', 'admin123')
  // }

  // const handleLogout = async () => {
  //   if (logout) await logout()
  // }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 pt-10">
        <div className="max-w-3xl mx-auto">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <form >
                <h2 className="card-title">Iniciar Sesion</h2>
                <Input 
                  label="Correo"
                  name="email"
                  placeholder="john@doe.com"
                  className="mb-1"
                />
                <Input 
                  label="Contrasena"
                  name="password"
                  placeholder="******"
                  className="mb-5"
                />
                <div className="card-actions">
                  <button className="btn btn-primary">Iniciar Sesion</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}