import { createContext, ReactNode, useState, useEffect } from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { toast } from 'react-toastify'

import { api } from '@/services/apiClient'

type AuthContextData = {
  user?: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
  signUp: (credentials: SignUpProps) => Promise<void>
}

type UserProps = {
  id: string
  name: string
  email: string
}

type SignInProps = {
  email: string
  password: string
}

type SignUpProps = {
  name: string
  email: string
  password: string
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  try {
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  } catch (err) {
    console.error(`Error at signOut. Details: ${err}`)
  }
}

export function AuthProvider({children}: AuthProviderProps){
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user

  useEffect(() => {
    // Tentar pegar token no cookie
    const { '@nextauth.token': token } = parseCookies()

    if(token){
      api.get('/me').then(response => {
        const { id, name, email } = response 

        setUser({
          id,
          name,
          email
        })

      })
      .catch(() => {
        signOut()
      })
    }
  },[])

  async function signIn({ email, password }: SignInProps){
    try {

      const response = await api.post('/session', {
        email,
        password
      })

      const { id, name, token } = response.data

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mês
        path: '/' // Quais caminhos terão acesso ao cookie
      })

      setUser({
        id,
        name,
        email,
      })

      // Passar para proximas requisições o token

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success('Logado com sucesso!')

      // Redirecionar o usuário para /dashboard
      Router.push('/dashboard')

    } catch (err) {
      toast.error('Erro ao fazer login.')
      console.error(`Error at sign in. Details: ${err}`)
    }
  }

  async function signUp({name, email, password}: SignUpProps){
    try {

      const response = await api.post('/users', {
        name,
        email,
        password
      })

      toast.success('Cadastrado com sucesso.')

      Router.push('/')

    } catch (err) {
      toast.error('Erro ao cadastrar.')
      console.error(`Error at sign up. Details: ${err}`)
    }
  }

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}