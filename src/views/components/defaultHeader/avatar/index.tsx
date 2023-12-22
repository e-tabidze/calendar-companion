import Image from '../../image'
import Typography from '../../typography'
import { AvatarContainer, AvatarInnerContainer, AvatarResponsiveContainer } from './styles'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import useProfile from 'src/hooks/useProfile'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { dashboardRoutes, profileRoutes } from 'src/utils/routes'
import Icon from 'src/views/app/Icon'

const Avatar = () => {
  const [active, setActive] = useState(false)

  const queryClient = useQueryClient()

  const {
    userInfo,
    userCompanies,
    postSwitchProfile,
    activeCompany,
    router,
    activeCompanyId,
    handleLogout,
    defaultImgUrl
  } = useProfile()

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

  const routeClass = `px-6 flex whitespace-nowrap text-md text-raisin-100 py-2 hover:bg-grey-100 transition-all`


  return (
    <Menu as='div' className='relative text-left hidden md:flex'>
      <Menu.Button>
        <AvatarContainer>
          <AvatarInnerContainer>


            <Image
                onError={(ev:any)=>{
                  ev.target.src = `/icons/avatar.svg`
                }}
              src={
                !!activeCompany ? activeCompany.information.logo : userInfo?.information?.profile_pic || defaultImgUrl
              }
              className='object-cover w-full h-full'
              alt='avatar'
            />
          </AvatarInnerContainer>
          <AvatarResponsiveContainer>
            <Typography
              type='subtitle'
              className='max-w-[120px] inline-block overflow-hidden text-ellipsis whitespace-nowrap'
            >
              {!!activeCompany ? activeCompany?.information?.name : userInfo?.information?.first_name}
            </Typography>
            <Icon svgPath='chevron' width={8} height={6} className='fill-transparent flex ml-2 transition-all' />
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
        <Menu.Items className='w-[280px] absolute z-2 top-full mt-5 right-0 bg-white rounded-2xl shadow-sm'>
          <div className='overflow-hidden rounded-2xl'>
            {active ? (
              <>
                <div className='border-b-1 border-raisin-10'>
                  <button className='cursor-pointer flex items-center w-full text-sm p-4' onClick={handleSetActive}>
                    <Icon svgPath='chevron-left' width={20} height={20} className='fill-transparent flex mr-4' />
                    დაბრუნება
                  </button>
                </div>
                <ul className='py-3 max-h-[335px] overflow-y-auto'>
                  {userCompanies?.map(
                    (company: { information: { name: string | undefined; logo: string }; id: string }) => (
                      <li onClick={() => handleProfileSwitch(company?.id)} key={company.id}>
                        <div className='cursor-pointer px-4 py-3 hover:bg-grey-100 flex items-center justify-between'>
                          <div className='flex items-center text-2sm'>
                            <span className='w-10 h-10 mr-4 relative flex items-center justify-center rounded-full overflow-hidden'>
                              <Image
                                src={company?.information?.logo || ''}
                                className='object-cover w-full h-full'
                                alt='avatar'
                                onError={(ev: any) => {
                                  ev.target.src = `/icons/avatar.svg`
                                }}
                              />
                            </span>
                            <div className='flex flex-col'>
                              <span className='text-2sm overflow-hidden text-ellipsis whitespace-nowrap max-w-[140px] inline-block'>
                                {company?.information?.name}
                              </span>
                              <span className='flex text-sm text-raisin-80'>ID: {company?.id} </span>
                            </div>
                          </div>
                          <span
                            className={`flex shrink-0 ml-6 w-6 h-6 rounded-full ${
                              activeCompanyId === company.id
                                ? 'border border-[7px] border-green-100'
                                : 'border-2 border-raisin-60'
                            } `}
                          ></span>
                        </div>
                      </li>
                    )
                  )}
                  <div onClick={() => handleProfileSwitch(userInfo?.UserID)}>
                    <div className='cursor-pointer px-4 py-3 hover:bg-grey-100 flex items-center justify-between'>
                      <div className='flex items-center text-2sm'>
                        <span className='w-10 h-10 mr-4 relative flex items-center justify-center rounded-full overflow-hidden'>
                          <Image
                            src={userInfo?.information?.profile_pic || defaultImgUrl}
                            className='object-cover w-full h-full'
                            alt='avatar'
                          />
                        </span>
                        <div className='flex flex-col'>
                          <span className='text-2sm overflow-hidden text-ellipsis whitespace-nowrap max-w-[140px] inline-block'>
                            {userInfo?.information?.first_name} {userInfo?.information?.last_name}
                          </span>
                          <span className='flex text-sm text-raisin-80'>ID: {userInfo?.UserID} </span>
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
                <div className='flex items-center justify-between border-b-[1px] border-raisin-10 px-6 py-4 mb-2'>
                  <div className='flex items-center'>
                    <span className='w-10 h-10 mr-3 relative flex items-center justify-center rounded-full overflow-hidden'>
                      <Image
                          onError={(ev:any)=>{
                            ev.target.src = `/icons/avatar.svg`
                          }}
                        src={
                          !!activeCompany
                            ? activeCompany.information.logo
                            : userInfo?.information?.profile_pic || defaultImgUrl
                        }
                        className='h-full w-full object-cover'
                        alt='avatar'
                      />
                    </span>
                    <div className='flex flex-col'>
                      <span className='text-2sm text-raisin-100 overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] inline-block'>
                        {activeCompany?.information.email}
                      </span>
                      <span className='flex text-2sm text-raisin-100'>ID: {userInfo?.active_profile_id}</span>
                    </div>
                  </div>
                </div>
                <div className='py-8px'>
                  {userCompanies.length > 0 && (
                    <button
                      className='px-6 flex w-full flex items-center justify-between whitespace-nowrap text-md text-raisin-100 py-2 hover:bg-grey-100 transition-all'
                      onClick={handleSetActive}
                    >
                      ანგარიშის შეცვლა
                      <Icon svgPath='chevron-right' width={20} height={20} className='fill-transparent' />
                    </button>
                  )}
                  {activeCompany ? (
                    <ul>
                      {dashboardRoutes?.map(route => (
                        <li key={route.id}>
                          {route.path ? (
                            <Link href={route.path} className={routeClass}>
                              {route.item}
                            </Link>
                          ) : (
                            <div className='border-t-1 border-raisin-10 mt-2 py-2'>
                              <button className={`w-full ${routeClass}`} onClick={handleLogout}>
                                {route.item}
                              </button>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul>
                      {profileRoutes?.map(route => (
                        <li key={route.id}>
                          {route.path ? (
                            <Link href={route.path} className={routeClass}>
                              {route.item}
                            </Link>
                          ) : (
                            <div className='border-t-1 border-raisin-10 mt-2 py-2'>
                              <button className={`w-full ${routeClass}`} onClick={handleLogout}>
                                {route.item}
                              </button>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
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
