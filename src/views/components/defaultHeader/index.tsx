import { useRouter } from 'next/router'
import Image from '../image'
import { InnerContainer } from './styles'
import User from './user'
import Tnet from './tnet'
import NavigationBar from './navigationBar'
import useProfile from 'src/hooks/useProfile'
import {IconButton, IconTextButton} from '../button'
import { isMobile } from 'react-device-detect'

// import LanguagePicker from './languagePicker'
import { useEffect,useState } from 'react'

import dynamic from 'next/dynamic'

const Filters = dynamic(() => import('src/views/pages/search/filters'), { ssr: false })

const DefaultHeader = () => {
  const router = useRouter()

  const { isAuthenticated, activeCompany, isLoading, handleLogin } = useProfile()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated !== false) {
        if (!!activeCompany && router?.pathname.includes('profile')) {
          router.push(`/dashboard/dashboard`)
        } else if (activeCompany === null && router?.pathname.includes('dashboard')) {
          router.push('/profile/orders')
        }
      } else if (isAuthenticated === false) {
        if (router?.pathname.includes('profile') || router?.pathname.includes('dashboard')) {
          router.push('/')
        }
      }
    }
  }, [!!activeCompany, isAuthenticated])

  const onClickLogo = () => {
    router.push('/')
  }
  useEffect(() => {
    setIsMobileDevice(isMobile)
  }, [])
  
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  
return (
    <InnerContainer>
      <div className="flex justify-between items-center w-full">
        <div className='flex items-center flex-wrap md:flex-nowrap'>
          <Image src='/images/logo-rent.svg' onClick={onClickLogo} alt='logo' className='w-24 md:w-32 cursor-pointer mr-14 md:mr-0' />
          {router?.asPath?.startsWith('/search') && !isMobileDevice && <Filters />}
        </div>
        <div className='flex items-center'>
          {/* <LanguagePicker responsive className='md:mx-4' /> */}
          {isAuthenticated && isLoading ? (
              <>Loading... </>
          ) : isAuthenticated ? (
              <User />
          ) : (
              <>
                <IconTextButton
                    icon='auth'
                    width={25}
                    height={24}
                    label='შესვლა'
                    className='hidden md:flex fill-transparent border border-raisin-10 rounded-xl px-3 h-10 items-center text-raisin-100 text-2sm transition-all hover:bg-grey-100 hover:border-raisin-30'
                    onClick={handleLogin}
                />
                <IconButton icon='auth'
                            className='flex md:hidden'
                            onClick={handleLogin}
                            width={25}
                            height={24} />
              </>

          )}
          <Tnet />
        </div>
      </div>
      {router?.asPath?.startsWith('/search') && isMobileDevice && <Filters /> }
      {isMobileDevice && <NavigationBar /> }

    </InnerContainer>
  )
}

export default DefaultHeader
