import { useRouter } from 'next/router'
import Image from '../image'
import { InnerContainer } from './styles'
import User from './user'
import Tnet from './tnet'
import NavigationBar from './navigationBar'
import useProfile from 'src/hooks/useProfile'
import { DefaultButton } from '../button'
import LanguagePicker from './languagePicker'

const DefaultHeader = () => {
  const router = useRouter()

  const { isAuthenticated } = useProfile()

  const onClickLogo = () => {
    router.push('/')
  }

  const handleLogin = () => {
    const externalPageUrl = 'https://test.auth.tnet.ge/ka/user/login/?Continue=https://test-front-rent.myauto.ge/'
    window.location.href = externalPageUrl
  }

  return (
    <InnerContainer>
      <Image src='/images/logo-rent.svg' onClick={onClickLogo} alt='logo' className='w-24 md:w-32 cursor-pointer' />
      <div className='flex items-center'>
        <LanguagePicker />
        {isAuthenticated ? <User /> : <DefaultButton text='შესვლა' onClick={handleLogin} />}
        <Tnet />
      </div>
      <NavigationBar />
    </InnerContainer>
  )
}

export default DefaultHeader
