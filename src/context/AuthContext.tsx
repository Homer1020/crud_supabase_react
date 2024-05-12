/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react"
import { supabase } from "../config/supabase"
import { Session } from "@supabase/supabase-js"

type Auth = Session|null

interface AuthContextInterface {
  auth: Auth,
  loading: boolean
}

export const authContext = createContext({} as AuthContextInterface)

export default function AuthContextProvider({
  children
}: {
  children: JSX.Element | Array<JSX.Element>
}) {
  const [loading, setLoading] = useState<boolean>(true)
  const [session, setSession] =   useState<Auth>(null)

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: {session} }) => {
        console.log(session)
        setSession(session)
      })
    .finally(() => {
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <authContext.Provider
      value={{
        auth: session,
        loading
      }}
    >
      { children }
    </authContext.Provider>
  )
}