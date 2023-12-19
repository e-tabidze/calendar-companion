import { useRouter } from 'next/router'

const CompanyDashboard = dynamic(() => import('src/views/pages/dashboard/companyDasboard'), { ssr: true })
const CompanyOrders = dynamic(() => import('src/views/pages/dashboard/companyOrders'), { ssr: true })
const Products = dynamic(() => import('src/views/pages/dashboard/products'), { ssr: true })
const EditCompany = dynamic(() => import('src/views/pages/dashboard/editCompany'), { ssr: true })
const NewProduct = dynamic(() => import('src/views/pages/dashboard/newProduct'), { ssr: true })

import dynamic from 'next/dynamic'
import { dashboardRoutes } from 'src/utils/routes'
import Notifications from 'src/views/pages/dashboard/notifications'
import Payments from 'src/views/pages/dashboard/payments'

const ProfileLayout = dynamic(() => import('src/layouts/ProfileLayout'), { ssr: false })

const EditProduct = dynamic(() => import('src/views/pages/dashboard/editProduct'), { ssr: true })

const ProfileRouter = () => {
  const router = useRouter()
  let key = ''

  if (router.query.link?.length) {
    key = router.query?.link[0]
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

export default Profile
