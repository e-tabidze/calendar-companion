import { useRouter } from 'next/router'
import Image from '../image'
import { InnerContainer } from './styles'
import User from './user'
import Tnet from './tnet'
import NavigationBar from './navigationBar'
import useProfile from 'src/hooks/useProfile'
import {IconTextButton} from '../button'
import LanguagePicker from './languagePicker'
import { useEffect } from 'react'
import { TNET_AUTH } from 'src/env'

const DefaultHeader = () => {
  const router = useRouter()

  const { isAuthenticated, activeCompany, isLoading } = useProfile()

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

  const handleLogin = () => {
    const externalPageUrl = TNET_AUTH
    window.location.href = externalPageUrl
    router.push('/')
  }

  return (
    <InnerContainer>
      <Image src='/images/logo-rent.svg' onClick={onClickLogo} alt='logo' className='w-24 md:w-32 cursor-pointer' />
      <div className='flex items-center'>
        <LanguagePicker responsive className='mx-4' />
        {isLoading ? (
          <>Loading... </>
        ) : isAuthenticated ? (
          <User />
        ) : (
          <IconTextButton icon='auth' width={25} height={24} label='შესვლა'
                          className="border border-raisin-10 rounded-xl px-3 h-10 items-center text-raisin-100 text-2sm transition-all hover:bg-grey-100 hover:border-raisin-30" onClick={handleLogin} />
        )}
        <Tnet />
      </div>
      <NavigationBar />
    </InnerContainer>
  )
}

export default DefaultHeader
