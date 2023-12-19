import { useState } from 'react'
import BurgerMenu from 'src/views/components/defaultHeader/burgerMenu'
import useProfile from '../../../../hooks/useProfile'
import Icon from 'src/views/app/Icon'
import Image from 'src/views/components/image'
import Link from 'next/link'
import { TNET_AUTH } from 'src/env'
import { useRouter } from 'next/router'

const NavigationBar = () => {
  const [burger, toggleBurger] = useState(false)
  const { isAuthenticated, activeCompany, isLoading, userInfo } = useProfile()

  const router = useRouter()

  // const handleLogin = () => {
  //     const externalPageUrl = TNET_AUTH
  //     window.location.href = externalPageUrl
  //     router.push('/')
  // }

  return (
    <div className='lg:hidden bg-white py-4 fixed bottom-0 left-0 w-full z-[111] box-shadow-sm'>
      <ul className='flex justify-around'>
        <li>
          <Link href={`${activeCompany ? '/dashboard/dashboard' : '/'}`}>
            <div className='flex flex-col items-center text-[10px]'>
              <span className={`flex ${router.pathname == '/dashboard/dashboard/' ? 'text-orange-100' : ''}`}>
                <Icon
                  svgPath='home'
                  width={24}
                  height={24}
                  className={`${
                    router.pathname.includes('/dashboard/dashboard/') ? 'fill-orange-100' : 'fill-raisin-100'
                  }`}
                />
              </span>
              <span className='text-[10px] mt-1'>{activeCompany ? 'დეშბორდი' : 'მთავარი'}</span>
            </div>
          </Link>
        </li>
        {activeCompany && (
          <li>
            <Link href='/dashboard/new-product/'>
              <div className='flex flex-col items-center text-[10px]'>
                <span className='flex'>
                  <Icon svgPath='add-outline' width={24} height={24} />
                </span>
                <span className='mt-1'>დამატება</span>
              </div>
            </Link>
          </li>
        )}
        {!activeCompany && (
          <li>
            <Link href={`${isAuthenticated ? '/profile/favourites/' : TNET_AUTH}`}>
              <div className='flex flex-col items-center text-raisin-70'>
                <span className='flex'>
                  <Icon
                    svgPath='favorite'
                    width={24}
                    height={24}
                    className={`${
                      router.pathname.includes('/profile/favourites/') ? 'fill-orange-100' : 'fill-raisin-100'
                    }`}
                  />
                </span>
                <span className='text-[10px] mt-1'>ფავორიტები</span>
              </div>
            </Link>
          </li>
        )}
        <li>
          <Link
            href={
              isAuthenticated ? (!!activeCompany ? '/dashboard/notifications/' : '/profile/notifications/') : TNET_AUTH
            }
          >
            <div className='flex flex-col items-center text-raisin-70'>
              <span className='flex'>
                <Icon
                  svgPath='bell'
                  width={24}
                  height={24}
                  className={`${router.pathname.includes('/notifications/') ? 'fill-orange-100' : 'fill-raisin-100'}`}
                />
              </span>
              <span className='text-[10px] mt-1'>შეტყობინებები</span>
            </div>
          </Link>
        </li>
        <li>
          {isLoading ? (
            <span className='flex w-6 h-6 rounded-full bg-raisin-5'></span>
          ) : (
            <button onClick={() => toggleBurger(!burger)}>
              <div className='flex flex-col items-center text-raisin-70'>
                <span className='w-6 h-6 relative flex items-center justify-center rounded-full overflow-hidden'>
                  {isAuthenticated ? (
                    <Image
                      src={!!activeCompany ? activeCompany.information.logo : userInfo?.information?.profile_pic}
                      className='object-cover w-full h-full'
                      alt='avatar'
                    />
                  ) : (
                    <Icon svgPath='auth' width={25} height={24} />
                  )}
                </span>
                <span className='text-[10px] mt-1'>{isAuthenticated ? ' პროფილი' : 'შესვლა'}</span>
              </div>
            </button>
          )}
        </li>
      </ul>
      {isAuthenticated && <BurgerMenu open={burger} setOpen={() => toggleBurger(!burger)} />}
    </div>
  )
}

export default NavigationBar
