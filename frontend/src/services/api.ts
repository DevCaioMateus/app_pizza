import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'

import { signOut } from '@/contexts/AuthContext'

export function setupAPIClient(context: undefined){
  let cookies = parseCookies(context)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['@nextauth.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError) => {
    if (error.response?.status === 401) {
      // qualquer erro 401 (não autorizado) desloga o usuário
      if (typeof window !== undefined) {
        // chama a função para deslogar o usuário
        signOut()
      } else {
        return Promise.reject(new AuthTokenError())
      }
    }

    return Promise.reject(error)

  })

  return api
}