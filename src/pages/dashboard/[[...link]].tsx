import { useRouter } from 'next/router'

const CompanyDashboard = dynamic(() => import('src/views/pages/dashboard/companyDasboard'), { ssr: true })
const CompanyOrders = dynamic(() => import('src/views/pages/dashboard/companyOrders'), { ssr: true })
const Products = dynamic(() => import('src/views/pages/dashboard/products'), { ssr: true })
const EditCompany = dynamic(() => import('src/views/pages/dashboard/editCompany'), { ssr: true })
const NewProduct = dynamic(() => import('src/views/pages/dashboard/newProduct'), { ssr: true })

import dynamic from 'next/dynamic'

const ProfileLayout = dynamic(() => import('src/layouts/ProfileLayout'), { ssr: true })

const EditProduct = dynamic(() => import('src/views/pages/dashboard/editProduct'), { ssr: true })

const routes = [
  {
    id: 1,
    icon: 'dashboard',
    item: 'დეშბორდი',
    path: '/dashboard/dashboard/'
  },
  {
    id: 2,
    icon: 'newProduct',
    item: 'განცხადების დამატება',
    path: '/dashboard/new-product/'
  },
  {
    id: 3,
    icon: 'incomingOrders',
    item: 'შემოსული ჯავშნები',
    path: '/dashboard/orders/'
  },
  {
    id: 4,
    icon: 'bellOutline',
    item: 'შეტყობინება',
    path: '/dashboard/notifications/'
  },
  {
    id: 5,
    icon: 'payments',
    item: 'გადახდები',
    path: '/dashboard/payments/'
  },
  {
    id: 6,
    icon: 'car',
    item: 'ავტომობილები',
    path: '/dashboard/vehicles/'
  },
  {
    id: 7,
    icon: 'editOutline',
    item: 'კომპანიის რედაქტირება',
    path: '/dashboard/edit-company/'
  },
  {
    id: 8,
    icon: 'logout',
    item: 'გასვლა',
    path: '/dashboard/sign-out'
  }
]

const ProfileRouter = () => {
  const router = useRouter()
  let key = ''

  console.log(router, 'router')

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
    case 'payments':
      return <div>Payments</div>
    case 'vehicles':
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
        <ProfileLayout routes={routes} dividerIndexes={[5]}>
          <ProfileRouter />
        </ProfileLayout>
      )}
    </>
  )
}

export default Profile
