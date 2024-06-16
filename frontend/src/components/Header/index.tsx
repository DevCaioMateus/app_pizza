import { useContext } from 'react'
import { FiLogOut } from 'react-icons/fi'

import Link from 'next/link'

import styles from './styles.module.scss'

import { AuthContext } from '@/contexts/AuthContext'

export function Header(){
  const { signOut } = useContext(AuthContext)
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href='/dashboard'>
          <img src='/logo.svg' width={190} height={60} />
        </Link>

        <nav className={styles.menuNav}>
          <Link className='no-decoration' href='/category'>
            <span>
              Categoria
            </span>
          </Link>

          <Link className='no-decoration' href='/product'>
            <span>Cardápio</span>
          </Link>

          <button onClick={signOut}>
            <FiLogOut color='#FFF' size={24} />
          </button>
        </nav>
      </div>
    </header>
  )
}