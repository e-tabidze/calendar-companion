import { useRouter } from 'next/router'
import Image from '../image'
import { InnerContainer } from './styles'
import User from './user'
import Tnet from "./tnet";
import TnetBtn from "./tnetBtn";
import BurgerBtn from "./burgerBtn";
import NavigationBar from "./navigationBar";

const DefaultHeader = () => {
  const router = useRouter()

  const onClickLogo = () => {
    router.push('/')
  }

  return (
    <InnerContainer>
      <Image src='/images/logo-rent.svg' onClick={onClickLogo} alt='logo' className='w-24 md:w-32 cursor-pointer' />
      {/*<DefaultButton*/}
      {/*  onClick={() =>*/}
      {/*    router.push('https://test.auth.tnet.ge/ka/user/login/?Continue=https://test-front-rent.myauto.ge/')*/}
      {/*  }*/}
      {/*  text='AUTH'*/}
      {/*/>*/}
      <div className="flex items-center">
          <User />
        <BurgerBtn/>
        <Tnet/>
        <TnetBtn/>
      </div>
        <NavigationBar/>
    </InnerContainer>
  )
}

export default DefaultHeader
