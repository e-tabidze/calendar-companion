import { useRouter } from 'next/router'
import { DefaultButton } from '../button'
import Image from '../image'
import { InnerContainer } from './styles'
import User from './user'

const Header = () => {
  const router = useRouter()

  const onClickLogo = () => {
    router.push('/')
  }

  return (
    <InnerContainer>
      <Image src='/images/logo-rent.svg' onClick={onClickLogo} alt='logo' className='w-24 md:w-32 cursor-pointer' />
      <User />
      <DefaultButton text="AUTH" onClick={() => router.push("https://test.auth.tnet.ge/ka/user/login/?Continue=https://new-rent.myauto.ge/")} />
    </InnerContainer>
  )
}

export default Header
