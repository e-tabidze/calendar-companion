import { useRouter } from 'next/router'
import Image from '../image'
import { InnerContainer } from './styles'
import User from './user'
import Tnet from "./tnet";
import NavigationBar from "./navigationBar";

const DefaultHeader = () => {
  const router = useRouter()

  const onClickLogo = () => {
    router.push('/')
  }
    const user = 1

    // if (typeof window !== 'undefined') {
    //     user = localStorage.getItem('isCompany')
    // }

    return (
    <InnerContainer>
      <Image src='/images/logo-rent.svg' onClick={onClickLogo} alt='logo' className='w-24 md:w-32 cursor-pointer' />
      <div className="flex items-center">
          <User user={user}/>
          {/*TODO autharization btn*/}
          {/*<button*/}
          {/*    className="hidden md:flex h-[40px] rounded-[12px] items-center pl-[12px] pr-[16px] font-medium text-raisin-100 hover:bg-grey-100 hover:border-raisin-30 text-[12px] lg:text-[14px] border border-raisin-10 ml-[16px] cursor-pointer transition-all"*/}
          {/*  onClick={() =>*/}
          {/*    router.push('https://test.auth.tnet.ge/ka/user/login/?Continue=https://test-front-rent.myauto.ge/')*/}
          {/*  }*/}
          {/*>*/}
          {/*    <Image src='/icons/auth.svg' alt='' width={22} height={22}/>*/}
          {/*    შესვლა*/}
          {/*</button>*/}
        <Tnet/>
      </div>
        <NavigationBar user={user}/>
    </InnerContainer>
  )
}

export default DefaultHeader
