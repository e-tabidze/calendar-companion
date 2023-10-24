import { useRouter } from 'next/router'

const CompanyDashboard = dynamic(() => import('src/views/pages/dashboard/companyDasboard'), { ssr: true })
const IncomingOrders = dynamic(() => import('src/views/pages/dashboard/incomingOrders'), { ssr: true })
const Vehicles = dynamic(() => import('src/views/pages/dashboard/vehicles'), { ssr: true })
const EditCompany = dynamic(() => import('src/views/pages/dashboard/editCompany'), { ssr: true })
const NewProduct = dynamic(() => import('src/views/pages/dashboard/newProduct'), { ssr: true })
const ProfileLayout = dynamic(() => import('src/layouts/ProfileLayout'), { ssr: true })

import dynamic from 'next/dynamic'

const routes = [
  {
    id: 1,
    icon: '/icons/orders.svg',
    item: 'დეშბორდი',
    path: '/dashboard/dashboard'
  },
  {
    id: 2,
    icon: '',
    item: 'განცხადების დამატება',
    path: '/dashboard/new-product'
  },
  {
    id: 3,
    icon: '',
    item: 'შემოსული ჯავშნები',
    path: '/dashboard/orders'
  },
  {
    id: 4,
    icon: '',
    item: 'გადახდები',
    path: '/dashboard/payments'
  },
  {
    id: 5,
    icon: '',
    item: 'ავტომობილები',
    path: '/dashboard/vehicles'
  },
  {
    id: 6,
    icon: '',
    item: 'კომპანიის რედაქტირება',
    path: '/dashboard/edit-company'
  },
  {
    id: 7,
    icon: '',
    item: 'გასვლა',
    path: '/dashboard/sign-out'
  }
]

const ProfileRouter = () => {
  const router = useRouter()
  let key = ''

  if (router.query.link?.length) {
    key = router.query?.link[0]
  }

  if (router.query.link?.length == 2) {
    key = 'profile'
  }

  switch (key) {
    case 'dashboard':
      return <CompanyDashboard />
    case 'new-product':
      return <NewProduct />
    case 'orders':
      return <IncomingOrders />
    case 'payments':
      return <div>Payments</div>
    case 'vehicles':
      return <Vehicles />
    case 'edit-company':
      return <EditCompany />
    case 'sign-out':
      return <div>Sign Out</div>
    default:
      return <CompanyDashboard />
  }
}

const Profile = () => {
  const router = useRouter()

  return (
    <>
      {router.asPath === '/dashboard/new-product/' ? (
        <NewProduct />
      ) : (
        <ProfileLayout routes={routes} dividerIndexes={[5]}>
          <ProfileRouter />
        </ProfileLayout>
      )}
    </>
  )
}

export default Profile
