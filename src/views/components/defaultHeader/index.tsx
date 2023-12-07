import { useRouter } from 'next/router'
import Image from '../image'
import { InnerContainer } from './styles'
import User from './user'
import Tnet from './tnet'
import NavigationBar from './navigationBar'
import useProfile from 'src/hooks/useProfile'
import { DefaultButton } from '../button'
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
          <DefaultButton text='შესვლა' onClick={handleLogin} />
        )}
        <Tnet />
      </div>
      <NavigationBar />
    </InnerContainer>
  )
}

export default DefaultHeader
