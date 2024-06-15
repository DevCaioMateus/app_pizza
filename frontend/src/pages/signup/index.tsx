import { FormEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/home.module.scss'

import logoImg from '../../../public/logo.svg'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

import { AuthContext } from '@/contexts/AuthContext'

export default function SignUp() {
  const { signUp } = useContext(AuthContext)


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignUp(e: FormEvent){
    e.preventDefault()

    if(!name || !email || !password) {
      toast.warn('Preencha todos os campos')
      return
    }

    setLoading(true)

    let data = {
      name,
      email,
      password
    }

    await signUp(data)

    setLoading(false)

  }
  
  return (
    <>
    <Head>
      <title>Sujeito Pizza - Cadastre-se</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt='Logo Sujeito Pizzaria' />

      <div className={styles.login}>
        <h1>Crie sua conta</h1>

        <form onSubmit={handleSignUp}>
        <Input 
            type='text'
            placeholder='Digite seu nome'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            Cadastrar
          </Button>
        </form>

        <Link className='no-decoration' href='/'>
          <span className={styles.text}>
            Já possui uma conta? Faça o login
          </span>
        </Link>

      </div>
    </div>
    </>
  );
}
