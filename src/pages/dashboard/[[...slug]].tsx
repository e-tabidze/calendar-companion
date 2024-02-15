import { useRouter } from 'next/router'

const CompanyDashboard = dynamic(() => import('src/views/pages/dashboard/companyDasboard'), { ssr: true })
const CompanyOrders = dynamic(() => import('src/views/pages/dashboard/companyOrders'), { ssr: true })
const Products = dynamic(() => import('src/views/pages/dashboard/products'), { ssr: true })
const EditCompany = dynamic(() => import('src/views/pages/dashboard/editCompany'), { ssr: true })
const NewProduct = dynamic(() => import('src/views/pages/dashboard/newProduct'), { ssr: true })
const Notifications = dynamic(() => import('src/views/pages/dashboard/notifications'), { ssr: false })
const Payments = dynamic(() => import('src/views/pages/dashboard/payments'), { ssr: false })

import dynamic from 'next/dynamic'
import { dashboardRoutes } from 'src/utils/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { queryClient } from '../_app'
import { dehydrate } from '@tanstack/react-query'

const ProfileLayout = dynamic(() => import('src/layouts/ProfileLayout'), { ssr: false })

const EditProduct = dynamic(() => import('src/views/pages/dashboard/editProduct'), { ssr: true })

const ProfileRouter = () => {
  const router = useRouter()
  let key = ''

  if (router.query.slug?.length) {
    key = router.query?.slug[0]
  }

  switch (key) {
    case 'dashboard' || '':
      return <CompanyDashboard />
    case 'new-product':
      return <NewProduct />
    case 'orders':
      return <CompanyOrders />
    case 'notifications':
      return <Notifications />
    case 'payments':
      return <Payments />
    case 'products':
      return <Products />
    case 'edit-company':
      return <EditCompany />
    case 'sign-out':
      return <div>Sign Out</div>
    default:
      return <></>
  }
}

const Profile = () => {
  const router = useRouter()

  return (
    <>
      {router.asPath === '/dashboard/new-product/' ? (
        <NewProduct />
      ) : router.asPath.includes('/dashboard/edit-product/') ? (
        <EditProduct />
      ) : (
        <ProfileLayout routes={dashboardRoutes} dividerIndexes={[5]}>
          <ProfileRouter />
        </ProfileLayout>
      )}
    </>
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  const [translations] = await Promise.all([serverSideTranslations(locale)])

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...translations
    }
  }
}

export default Profile
