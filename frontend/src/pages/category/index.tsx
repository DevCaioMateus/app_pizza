import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import Head from 'next/head'

import { Header } from '@/components/Header'

import styles from './styles.module.scss'

import { api } from '@/services/apiClient'

import { canSSRAuth } from '@/utils/canSSRAuth'

export default function Category(){
  const [name, setName] = useState('')

  async function handleRegister(e: FormEvent){
    e.preventDefault()

    if(!name){
      toast.warn('Digite um nome para a categoria.')
      return
    }

    await api.post('/category', {
      name: name
    })

    toast.success('Cadastrada com sucesso.')
    setName('')

  }

  return(
    <>
    <Head>
      <title>
        Nova categoria - Sujeito Pizzaria
      </title>
    </Head>
    <div>
      <Header />
      <main className={styles.container}>
        <h1>
          Cadastrar categorias
        </h1>

        <form 
          className={styles.form}
          onSubmit={handleRegister}
          >
          <input
            type='text'
            placeholder='Digite o nome da categoria'
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button 
            type='submit'
            className={styles.buttonAdd}
          >
            Cadastrar
          </button>
        </form>
      </main>
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {
  return {
    props: {}
  }
})