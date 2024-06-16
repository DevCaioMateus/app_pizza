import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies } from 'nookies'

// função para páginas que só podem ser acessadas por visitantes
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(context)

    // Se o usuário tentar acessar a página, porém tendo já um login salvo, reidicionamos
    if(cookies['@nextauth.token']){
      return {
          redirect:{
          destination: '/dashboard',
          permanent: false,
        }
      }
    }

    return await fn(context)
  }
}