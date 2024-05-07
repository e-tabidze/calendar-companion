import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import DefaultHeader from 'src/views/components/defaultHeader'
import ProfileNavigation from 'src/views/components/profileNavigation'
import HeaderWrapper from '../views/components/headerWrapper'
import Footer from 'src/views/components/footer'
import { IconTextButton } from 'src/views/components/button'
import BurgerMenu from 'src/views/components/defaultHeader/burgerMenu'
import {useTranslation} from "next-i18next";

interface Route {
  id: number
  icon: string
  item: string
  path?: string
  onClick?: any
}

interface Props {
  routes: Route[]
  dividerIndexes: number[]
  children: any
  pagination?: boolean
}

const ProfileLayout: React.FC<Props> = ({ routes, dividerIndexes, children }) => {
  const {t} = useTranslation()
  const router = useRouter()
  const { width } = useWindowDimensions()
  const [selectedRoute, setSelectedRoute] = useState<any>(routes[0])
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false)
  const [burderMenu, setBurgerMenu] = useState(false)

  const handleRouteChange = (route: any) => {
    if (route.path) {
      router.push(route.path)
    }
    setSelectedRoute(route)
  }

  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed)

  useEffect(() => {
    setSidebarCollapsed(width > 1023 && width < 1280)
  }, [width])

  return (
    <main>
      <HeaderWrapper>
        <DefaultHeader />
      </HeaderWrapper>
      <div className='w-full max-w-[1240px] 2xl:max-w-[1470px] m-auto flex gap-none px-5 xl:px-0 lg:gap-6 mt-1 lg:mt-10'>
        {width > 1023 && (
          <ProfileNavigation
            routes={routes}
            sidebarCollapsed={sidebarCollapsed}
            handleRouteChange={handleRouteChange}
            toggleSidebarCollapse={toggleSidebarCollapse}
            selectedRoute={selectedRoute}
            dividerIndexes={dividerIndexes}
          />
        )}
        <div className='transition-all duration-300 w-full z-[11] p-0 md:p-4 lg:p-0'>
          <IconTextButton
            icon='chevron-l'
            label={t('my_profile')}
            width={8}
            height={12}
            onClick={() => setBurgerMenu(!burderMenu)}
            className='block lg:hidden'
          />
          {children}
        </div>
      </div>
      <Footer />
      <BurgerMenu open={burderMenu} setOpen={() => setBurgerMenu(!burderMenu)} />
    </main>
  )
}

export default ProfileLayout
