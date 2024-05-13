import { ChangeEvent, useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import Card from "../../components/ui/Card";
import { supabase } from "../../config/supabase";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

export default function Login() {
  const { auth, loading } = useContext(authContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (auth && !loading) {
      navigate('/')
    }
  }, [auth, navigate, loading])

  const [sending, setSending] = useState(false)
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSending(true)

    const { email, password } = formValues

    console.log({ email, password })

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log({ data, error })

    setSending(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex justify-center items-center">
        <div className="container">
          {
          (!auth && !loading) && (
            <Card>
              <form onSubmit={handleLogin}>
                <h2 className="uppercase card-title mb-3">Entrar al Sistema</h2>
                <div className="mb-3">
                  <Input
                    label="Correo electronico"
                    name="email"
                    type="email"
                    placeholder="correo@correo.com"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-7">
                  <Input
                    label="Comtraseña"
                    name="password"
                    type="password"
                    placeholder="* * * * * * *"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button disabled={sending} className="btn btn-success">
                    {
                      !sending ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                      ) : (
                        <span className="loading loading-spinner"></span>
                      )
                    }

                    Iniciar Sesion
                  </button>
                </div>
              </form>
            </Card>
          )
        }
        </div>
      </div>
      <Footer />
    </div>
  )
}