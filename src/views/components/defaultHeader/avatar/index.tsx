import Image from '../../image'
import Typography from '../../typography'
import { AvatarContainer, AvatarInnerContainer, AvatarResponsiveContainer } from './styles'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
import useProfile from 'src/hooks/useProfile'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
  user: any
}
const Avatar: React.FC<Props> = ({ user }) => {
  const { userInfo, userCompanies, postSwitchProfile, actveProfileInfo, activeCompany, router } = useProfile()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!!actveProfileInfo && router?.pathname.includes('profile')) {
      router.push(`/dashboard/dashboard`)
    } else if (actveProfileInfo === null && router?.pathname.includes('dashboard')) {
      router.push('/profile/orders')
    }
  }, [!!actveProfileInfo])

  console.log(actveProfileInfo, 'actveProfileInfo')

  console.log(!!actveProfileInfo, 'actveProfileInfo')

  const switchProfileMutation = useMutation((active_profile_id: string) => postSwitchProfile('', active_profile_id), {
    onSettled: () => {
      queryClient.invalidateQueries(['profileInfo'])
    }
  })

  const handleProfileSwitch = async (id: string) => {
    try {
      switchProfileMutation.mutate(id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Menu as='div' className='relative text-left hidden md:flex'>
      <Menu.Button>
        <AvatarContainer>
          <AvatarInnerContainer>
            <Image src='/images/avatar.png' className='rounded-full' alt='avatar' />
          </AvatarInnerContainer>
          <AvatarResponsiveContainer>
            <Typography
              type='button'
              color='dark'
              weight='normal'
              className='text-[#272A37] text-[14px] font-medium text-nowrap'
            >
              {!!activeCompany ? actveProfileInfo.information.name : userInfo?.information?.first_name}
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
        <Menu.Items className='absolute z-2 top-full mt-[20px] right-0 bg-[#ffffff] rounded-[16px] border border-raisin-10 shadow-[0px_6px_18px_#000000/10]'>
          <div className='overflow-hidden rounded-[16px]'>
            {user == 0 && (
              <>
                <div className='flex border-b-[1px] border-[#E9EAEB] px-[24px] py-[16px]'>
                  <span className='w-[40px] h-[40px] mr-[12px] relative flex items-center justify-center rounded-full overflow-hidden'>
                    <Image src='/images/avatar.png' className='rounded-full' alt='avatar' />
                  </span>
                  <div className='flex flex-col '>
                    <span className='text-[14px] text-[#272A37] overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] inline-block'>
                      namename@gmail.com
                    </span>
                    <span className='flex text-[14px] text-[#272A37]'>ID: 146797</span>
                  </div>
                </div>
                <ul className='py-[8px] border-b-1 border-raisin-10'>
                  <li>
                    <a
                      href='#'
                      className='px-[24px] flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all'
                    >
                      ჩემი შეკვეთები
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='px-[24px] flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all'
                    >
                      ბარათები და ტრანზაქციები
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='px-[24px] flex items justify-between whitespace-nowrap text-[16px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all'
                    >
                      <span> პარამეტრები</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='px-[24px] flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all'
                    >
                      კომპანიის შექმნა
                    </a>
                  </li>
                </ul>
              </>
            )}
            <ul className='py-3'>
              {userCompanies?.map((company: { information: { name: string | undefined }; id: string }) => (
                <li onClick={() => handleProfileSwitch(company?.id)} key={company.id}>
                  {/* <a href=''> */}
                  <div className='px-[24px] py-3 hover:bg-[#F2F3F6] flex items-center justify-between'>
                    <div className='flex items-center text-[14px]'>
                      <span className='w-10 h-10 mr-4 relative flex items-center justify-center rounded-full overflow-hidden'>
                        <Image src='/images/avatar.png' className='rounded-full' alt='avatar' />
                      </span>
                      <div className='flex flex-col'>
                        <span className='flex text-[14px]'> {company?.information?.name} </span>
                        <span className='flex text-[12px] text-raisin-80'>ID: {company?.id} </span>
                      </div>
                    </div>
                    <span className="after:content-[''] after:w-3 after:h-3 after:rounded-full after:bg-black ml-6 w-6 h-6 rounded-full flex items-center justify-center border border-2 border-black"></span>
                  </div>
                  {/* </a> */}
                </li>
              ))}
              <div onClick={() => handleProfileSwitch(userInfo?.UserID)}> Personal </div>

              {/* <li>
                            <a href="">
                                <div className="px-[24px] py-3 hover:bg-[#F2F3F6] flex items-center justify-between">
                                        <div className="flex items-center text-[14px]">
                                           <span
                                               className="w-10 h-10 mr-4 relative flex items-center justify-center rounded-full overflow-hidden">
                                                <Image src='/images/avatar.png' className='rounded-full' alt='avatar' />
                                          </span>
                                            <div className="flex flex-col">
                                                <span className="flex text-[14px]">ბენე ექსლუზივი </span>
                                                <span className="flex text-[12px] text-raisin-80">ID: 79428749</span>
                                            </div>

                                        </div>
                                    <span className="after:content-[''] after:w-3 after:h-3 after:rounded-full after:bg-black ml-6 w-6 h-6 rounded-full flex items-center justify-center border border-2 border-black"></span>
                                </div>
                            </a>
                        </li> */}
              {/* <li>
                            <a href="">
                                <div className="px-[24px] py-3 hover:bg-[#F2F3F6] flex items-center justify-between">
                                    <div className="flex items-center text-[14px]">
                                       <span
                                           className="w-10 h-10 mr-4 relative flex items-center justify-center rounded-full overflow-hidden">
                                            <Image src='/images/avatar.png' className='rounded-full' alt='avatar' />
                                      </span>
                                        <div className="flex flex-col">
                                            <span className="flex text-[14px]">ბენე მოტო </span>
                                            <span className="flex text-[12px] text-raisin-80">ID: 79428749</span>
                                        </div>
                                    </div>
                                    <span className="ml-6 w-6 h-6 rounded-full flex items-center justify-center border border-2 border-black"></span>
                                </div>
                            </a>
                        </li> */}
              {/* <li>
                            <a href="">
                                <div className="px-[24px] py-3 hover:bg-[#F2F3F6] flex items-center justify-between">
                                    <div className="flex items-center text-[14px]">
                                       <span
                                           className="w-10 h-10 mr-4 relative flex items-center justify-center rounded-full overflow-hidden">
                                            <Image src='/images/avatar.png' className='rounded-full' alt='avatar'/>
                                      </span>
                                        <div className="flex flex-col">
                                            <span className="flex text-[14px]">name name </span>
                                            <span className="flex text-[12px] text-raisin-80">ID: 79428749</span>
                                        </div>
                                    </div>
                                    <span
                                        className="ml-6 w-6 h-6 rounded-full flex items-center justify-center border border-2 border-black"></span>
                                </div>
                            </a>
                        </li> */}
            </ul>

            <div className='border-t-[1px] border-[#E9EAEB] py-[8px]'>
              <a
                className='flex text-[16px] text-[#272A37] cursor-pointer py-[8px] px-[24px] hover:bg-[#F2F3F6] transition-all'
                href='#'
              >
                გასვლა
              </a>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Avatar
