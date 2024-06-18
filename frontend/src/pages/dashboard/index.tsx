import { useState } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'

import Head from 'next/head'

import { Header } from '@/components/Header'
import { ModalOrder } from '@/components/ModalOrder'

import { canSSRAuth } from '@/utils/canSSRAuth'

import styles from './styles.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'

import { setupAPIClient } from '@/services/api'

type OrderProps = {
  id: string
  table: string | number
  status: boolean
  draft: boolean
  name: string | null
}

interface HomeProps {
  orders: OrderProps[]
}

export type OrderItemProps = {
  id: string
  amount: number
  orderId: string
  productId: string
  product: {
    id: string
    name: string
    description: string
    price: string
    banner: string
  }
  order:{
    id: string
    table: string | number
    status: boolean
    name: string | null
  }
}

export default function Dashboard({ orders }: HomeProps){
  const [orderList, setOrderList] = useState(orders || [])

  const [modalItem, setModalItem] = useState<OrderItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false)

  function handleCloseModal(){
    setModalVisible(false)
  }

  async function handleOpenModalView(id: string){
    const apiClient = setupAPIClient()

    const response = await apiClient.get('/order/detail', {
      params: {
        orderId: id
      }
    })
    console.log('response', response.data)
    setModalItem(response.data)
    setModalVisible(true)
  }

  async function handleFinishOrder(id: string){
    console.log('id', id)
    const apiClient = setupAPIClient()
    await apiClient.put('/order/finish', {
      orderId: id
    })

    const response = await apiClient.get('/orders')

    setOrderList(response.data)

    setModalVisible(false)
    toast.success('Pedido concluído')
  }

  async function handleRefreshOrders(){
    const apiClient = setupAPIClient()

    const response = await apiClient.get('/orders')
    setOrderList(response.data)
  }

  Modal.setAppElement('#__next')

  return(
    <>
    <Head>
      <title>
        Painel - Sujeito Pizzaria
      </title>
    </Head>
    <div>
      <Header />
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <h1>Útimos pedidos
          </h1>
          <button onClick={handleRefreshOrders}>
            <FiRefreshCcw 
              size={25} 
              color='#3fffA3' 
            />
          </button>
        </div>

        <article className={styles.listOrders}>

          { orderList.length === 0 && (
            <span className={styles.emptyList}>
              Nenhum pedido aberto.
            </span>
          )}

          { orderList.map( item => (
            <section 
              key={item.id}
              className={styles.orderItem}>
              <button onClick={() => handleOpenModalView(item.id)}>
                <div className={styles.tag} />
                <span>
                  Mesa {item.table}
                  </span>
              </button>
            </section>
          )) }

        </article>
      </main>
      { modalVisible && (
        <ModalOrder 
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          order={modalItem}
          handleFinishOrder={ handleFinishOrder }
        />
      ) }
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {
  const apitClient = setupAPIClient(context)

  const response = await apitClient.get('/orders')

  return {
    props: {
      orders: response.data
    }
  }
})