import { createContext, useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { AuthError, AuthTokenResponsePassword, User } from "@supabase/supabase-js";

export interface AuthContextInterface {
  user?: User|null,
  login?: (email:string, password:string) => Promise<AuthTokenResponsePassword>,
  logout?: () => Promise<{
    error: AuthError | null;
  }>
  auth?: boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext<AuthContextInterface>({})

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const login = (email: string, password:string) =>
    supabase.auth.signInWithPassword({ email, password })

  const logout = () => supabase.auth.signOut()

  const [user, setUser] = useState<User|null>(null)
  const [auth, setAuth] = useState<boolean>(false)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        if(session?.user) {
          setUser(session.user)
          setAuth(true)
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe()
    };
  }, [])

  return (
    <authContext.Provider
      value={{
        user,
        login,
        auth,
        logout
      }}
    >
      {children}
    </authContext.Provider>
  )
}