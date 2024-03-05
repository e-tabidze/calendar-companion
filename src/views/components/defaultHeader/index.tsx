import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from '../image'
import User from 'src/views/components/defaultHeader/user'
import Tnet from 'src/views/components/defaultHeader/tnet'
import NavigationBar from 'src/views/components/defaultHeader/navigationBar'
import useProfile from 'src/hooks/useProfile'
import { IconTextButton } from 'src/views/components/button'
import { isMobile } from 'react-device-detect'

import dynamic from 'next/dynamic'

const Filters = dynamic(() => import('src/views/pages/search/filters'), { ssr: false })
const LanguagePicker = dynamic(() => import('src/views/components/defaultHeader/languagePicker'), { ssr: false })

import { InnerContainer } from './styles'
import { useTranslation } from 'next-i18next'

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
  const { t } = useTranslation()

  return (
    <InnerContainer>
      <div className='flex justify-between items-center w-full'>
        <div className='flex items-center flex-wrap md:flex-nowrap'>
          <Image
            src='/images/logo-rent.svg'
            onClick={onClickLogo}
            alt='logo'
            className='h-8 md:h-10 cursor-pointer mr-14 md:mr-0'
          />
          {router?.asPath?.startsWith('/search') && <Filters />}
        </div>
        <div className='flex items-center'>
          <LanguagePicker responsive className='md:mx-4' />
          {isAuthenticated && isLoading ? (
            <>Loading... </>
          ) : isAuthenticated ? (
            <User />
          ) : (
            <IconTextButton
              icon='auth'
              width={25}
              height={24}
              label={t('login')}
              type='button'
              className='hidden md:flex fill-transparent border border-raisin-10 rounded-xl pl-3 pr-4 h-10 items-center text-raisin-100 text-2sm transition-all hover:bg-grey-100 hover:border-raisin-30'
              onClick={handleLogin}
            />
          )}
          {!isMobileDevice && <Tnet />}
        </div>
      </div>
      {isMobileDevice && <NavigationBar />}
    </InnerContainer>
  )
}

export default DefaultHeader
