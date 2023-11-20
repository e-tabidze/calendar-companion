import Image from '../../image'
import Typography from '../../typography'
import { AvatarContainer, AvatarInnerContainer, AvatarResponsiveContainer } from './styles'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import useProfile from 'src/hooks/useProfile'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import Cookie from 'src/helpers/Cookie'

const companyRoutes = [
  {
    id: 1,
    item: 'დეშბორდი',
    path: '/dashboard/dashboard'
  },
  {
    id: 2,
    item: 'განცხადების დამატება',
    path: '/dashboard/new-product/'
  },
  {
    id: 3,
    item: 'შემოსული ჯავშნები',
    path: '/dashboard/orders/'
  },
  {
    id: 4,
    item: 'გადახდები',
    path: '/dashboard/payments/'
  },
  {
    id: 5,
    item: 'ავტომობილები',
    path: '/dashboard/vehicles/'
  },
  {
    id: 6,
    item: 'კომპანიის რედაქტირება',
    path: '/dashboard/edit-company/'
  }
]

const profileRoutes = [
  {
    id: 1,
    item: 'ჩემი შეკვეთები',
    path: '/profile/orders/'
  },
  {
    id: 2,
    item: 'ბარათები და ტრანზაქციები',
    path: '/profile/transactions/'
  },
  {
    id: 3,
    item: 'პარამეტრები',
    path: '/profile/personal-information/'
  },
  {
    id: 4,
    item: 'კომპანიის შექმნა',
    path: '/profile/create-company/'
  }
]

const Avatar = () => {
  const [active, setActive] = useState(false)

  const queryClient = useQueryClient()

  const { userInfo, userCompanies, postSwitchProfile, activeCompany, router, activeCompanyId } =
    useProfile()

  const switchProfileMutation = useMutation((active_profile_id: string) => postSwitchProfile('', active_profile_id), {
    onSettled: () => {
      queryClient.invalidateQueries(['profileInfo'])
      router.reload()
    }
  })

  const handleProfileSwitch = async (id: string) => {
    try {
      switchProfileMutation.mutate(id)
    } catch (error) {
      console.log(error)
    }
  }
  const handleSetActive = () => {
    setActive(!active)
  }

  const handleLogout = async () => {
    Cookie.removeAll()
    localStorage.clear()
    router.reload()
    await queryClient.invalidateQueries(['profileInfo'])
  }

  const routeClass = `px-[24px] flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px] hover:bg-grey-100 transition-all`

  return (
    <Menu as='div' className='relative text-left hidden md:flex'>
      <Menu.Button>
        <AvatarContainer>
          <AvatarInnerContainer>
            <Image src='/images/avatar.png' className='rounded-full' alt='avatar' />
          </AvatarInnerContainer>
          <AvatarResponsiveContainer>
            <Typography type='subtitle'>
              {!!activeCompany ? activeCompany.information.name : userInfo?.information?.first_name}
            </Typography>
            <Image src='/icons/chevron.svg' alt='img' className='flex ml-[8px] transition-all' />
          </AvatarResponsiveContainer>
        </AvatarContainer>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='w-[280px] absolute z-2 top-full mt-[20px] right-0 bg-[#ffffff] rounded-[16px] border border-raisin-10 shadow-[0px_6px_18px_#000000/10]'>
          <div className='overflow-hidden rounded-[16px]'>
            {active ? (
              <>
                <div className='flex items-center border-b-1 border-raisin-10 p-[16px] text-[12px]'>
                  <button className='cursor-pointer flex mr-[16px]' onClick={handleSetActive}>
                    <Image src='/icons/chevron-left.svg' alt='chevron' />
                  </button>
                  დაბრუნება
                </div>
                <ul className='py-3 max-h-[335px] overflow-y-auto'>
                  {userCompanies?.map((company: { information: { name: string | undefined }; id: string }) => (
                    <li onClick={() => handleProfileSwitch(company?.id)} key={company.id}>
                      <div className='cursor-pointer px-[16px] py-3 hover:bg-grey-100 flex items-center justify-between'>
                        <div className='flex items-center text-[14px]'>
                          <span className='w-10 h-10 mr-4 relative flex items-center justify-center rounded-full overflow-hidden'>
                            <Image src='/images/avatar.png' className='rounded-full' alt='avatar' />
                          </span>
                          <div className='flex flex-col'>
                            <span className='text-[14px] overflow-hidden text-ellipsis whitespace-nowrap max-w-[140px] inline-block'>
                              {company?.information?.name}
                            </span>
                            <span className='flex text-[12px] text-raisin-80'>ID: {company?.id} </span>
                          </div>
                        </div>
                        {/*TODO default: border-2 border-raisin-60, active: border-[7px] border-green-100*/}
                        <span
                          className={`flex shrink-0 ml-6 w-6 h-6 rounded-full ${
                            activeCompanyId === company.id
                              ? 'border border-[7px] border-green-100'
                              : 'border-2 border-raisin-60'
                          } `}
                        ></span>
                      </div>
                    </li>
                  ))}
                  <div onClick={() => handleProfileSwitch(userInfo?.UserID)}>
                    <> {console.log(userInfo, 'userInfo')} </>

                    <div className='cursor-pointer px-[16px] py-3 hover:bg-grey-100 flex items-center justify-between'>
                      <div className='flex items-center text-[14px]'>
                        <span className='w-10 h-10 mr-4 relative flex items-center justify-center rounded-full overflow-hidden'>
                          <Image src='/images/avatar.png' className='rounded-full' alt='avatar' />
                        </span>
                        <div className='flex flex-col'>
                          <span className='text-[14px] overflow-hidden text-ellipsis whitespace-nowrap max-w-[140px] inline-block'>
                            {userInfo?.information?.first_name} {userInfo?.information?.last_name}
                          </span>
                          <span className='flex text-[12px] text-raisin-80'>ID: {userInfo?.UserID} </span>
                        </div>
                      </div>
                      <span
                        className={`flex shrink-0 ml-6 w-6 h-6 rounded-full ${
                          userInfo?.active_profile_id === userInfo?.UserID
                            ? 'border border-[7px] border-green-100'
                            : 'border-2 border-raisin-60'
                        } `}
                      ></span>
                    </div>
                  </div>
                </ul>
              </>
            ) : (
              <>
                <div className='flex items-center justify-between border-b-[1px] border-raisin-10 px-[24px] py-[16px]'>
                  <div className='flex items-center'>
                    <span className='w-[40px] h-[40px] mr-[12px] relative flex items-center justify-center rounded-full overflow-hidden'>
                      <Image src='/images/avatar.png' className='rounded-full' alt='avatar' />
                    </span>
                    <div className='flex flex-col'>
                      <span className='text-[14px] text-[#272A37] overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] inline-block'>
                        {userInfo?.Email}
                      </span>
                      <span className='flex text-[14px] text-[#272A37]'>ID: {userInfo?.active_profile_id}</span>
                    </div>
                  </div>
                  <button className='cursor-pointer shrink-0 flex' onClick={handleSetActive}>
                    <Image src='/icons/chevron-right.svg' alt='chevron' />
                  </button>
                </div>

                {activeCompany ? (
                  <ul className='py-[8px]'>
                    {companyRoutes?.map(route => (
                      <li key={route.id}>
                        <Link href={route.path} className={routeClass}>
                          {route.item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className='py-[8px]'>
                    {profileRoutes?.map(route => (
                      <li key={route.id}>
                        <Link href={route.path} className={routeClass}>
                          {route.item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                <div
                  className='border-t-[1px] border-raisin-10 cursor-pointer py-4 px-8 hover:bg-grey-100 transition-all'
                  onClick={handleLogout}
                >
                  გასვლა
                </div>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Avatar
