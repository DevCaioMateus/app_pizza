import { FormEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/home.module.scss'

import logoImg from '../../public/logo.svg'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

import { AuthContext } from '@/contexts/AuthContext'

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: FormEvent){
    e.preventDefault()

    if (!email || !password) {
      toast.warn('Preencha os dados.')
      return
    }

    setLoading(true)

    let data = {
      email,
      password
    }

    await signIn(data)

    setLoading(false)
  }

  return (
    <>
    <Head>
      <title>Sujeito Pizza - Faça seu login</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt='Logo Sujeito Pizzaria' />

      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input 
            type='text'
            placeholder='Digite seu email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            type='password'
            placeholder='Digite sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type='submit'
            loading={loading}
          >
            Acessar
          </Button>
        </form>

        <Link className='no-decoration' href='/signup'>
          <span className={styles.text}>
            Não possui uma conta? Cadastre-se
          </span>
        </Link>

      </div>
    </div>
    </>
  );
}
