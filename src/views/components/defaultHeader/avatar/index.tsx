import Image from '../../image'
import Typography from '../../typography'
import { AvatarContainer, AvatarInnerContainer, AvatarResponsiveContainer } from './styles'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import useProfile from 'src/hooks/useProfile'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Avatar = () => {
  const { userInfo, userCompanies, postSwitchProfile, activeCompany, router, isAuthenticated } = useProfile()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!!activeCompany && router?.pathname.includes('profile')) {
      router.push(`/dashboard/dashboard`)
    } else if (activeCompany === null && router?.pathname.includes('dashboard')) {
      router.push('/profile/orders')
    }
  }, [!!activeCompany])

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
  const [active, setActive] = useState(false);
  const handleSetActive = () => {
    setActive(!active);
  };

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
              {isAuthenticated ? !!activeCompany ? activeCompany.information.name : userInfo?.information?.first_name : "LOGIN"}
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
                  <div className="flex items-center border-b-1 border-raisin-10 p-[16px] text-[12px]">
                    <button className="cursor-pointer flex mr-[16px]" onClick={handleSetActive}>
                      <Image src='/icons/chevron-left.svg' alt='chevron' />
                    </button>
                    დაბრუნება
                  </div>
                  <ul className="py-3 max-h-[335px] overflow-y-auto">
                    {userCompanies?.map((company: { information: { name: string | undefined }; id: string }) => (
                        <li onClick={() => handleProfileSwitch(company?.id)} key={company.id}>
                          <div className='cursor-pointer px-[16px] py-3 hover:bg-[#F2F3F6] flex items-center justify-between'>
                            <div className='flex items-center text-[14px]'>
                          <span
                              className='w-10 h-10 mr-4 relative flex items-center justify-center rounded-full overflow-hidden'>
                            <Image src='/images/avatar.png' className='rounded-full' alt='avatar'/>
                          </span>
                              <div className='flex flex-col'>
                                <span className='text-[14px] overflow-hidden text-ellipsis whitespace-nowrap max-w-[140px] inline-block'> {company?.information?.name} </span>
                                <span className='flex text-[12px] text-raisin-80'>ID: {company?.id} </span>
                              </div>
                            </div>
                            {/*TODO default: border-2 border-raisin-60, active: border-[7px] border-green-100*/}
                            <span
                                className="flex shrink-0 ml-6 w-6 h-6 rounded-full border border-[7px] border-green-100"></span>
                          </div>
                        </li>
                    ))}
                    <div  onClick={() => handleProfileSwitch(userInfo?.UserID)}>
                      <div className='cursor-pointer px-[16px] py-3 hover:bg-[#F2F3F6] flex items-center justify-between'>
                        <div className='flex items-center text-[14px]'>
                          <span
                              className='w-10 h-10 mr-4 relative flex items-center justify-center rounded-full overflow-hidden'>
                            <Image src='/images/avatar.png' className='rounded-full' alt='avatar'/>
                          </span>
                          <div className='flex flex-col'>
                            <span className='text-[14px] overflow-hidden text-ellipsis whitespace-nowrap max-w-[140px] inline-block'> სახელი გვარი </span>
                            <span className='flex text-[12px] text-raisin-80'>ID: 136173 </span>
                          </div>
                        </div>
                        {/*TODO default: border-2 border-raisin-60, active: border-[7px] border-green-100*/}
                        <span
                            className="flex shrink-0 ml-6 w-6 h-6 rounded-full border border-[7px] border-green-100"></span>
                      </div>
                    </div>
                  </ul>
                </>
            ):
             (
               <>
                 <div className='flex items-center justify-between border-b-[1px] border-[#E9EAEB] px-[24px] py-[16px]'>
                   <div className="flex items-center">
                  <span className='w-[40px] h-[40px] mr-[12px] relative flex items-center justify-center rounded-full overflow-hidden'>
                  <Image src='/images/avatar.png' className='rounded-full' alt='avatar' />
                </span>
                     <div className='flex flex-col'>
                  <span className='text-[14px] text-[#272A37] overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] inline-block'>
                    namename@gmail.com
                  </span>
                       <span className='flex text-[14px] text-[#272A37]'>ID: 146797</span>
                     </div>
                   </div>
                   <button className="cursor-pointer shrink-0 flex" onClick={handleSetActive}>
                     <Image src='/icons/chevron-right.svg' alt='chevron' />
                   </button>
                 </div>

                 {activeCompany ? (
                 <ul className='py-[8px]'>
                   <li>
                     <a
                         href='#'
                         className='px-[24px] flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all'
                     >
                       დეშბორდი
                     </a>
                   </li>
                   <li>
                     <a
                         href='#'
                         className='px-[24px] flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all'
                     >
                       განცხადების დამატება
                     </a>
                   </li>
                   <li>
                     <a
                         href='#'
                         className='px-[24px] flex items justify-between whitespace-nowrap text-[16px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all'
                     >
                       <span> შემოსული ჯავშნები</span>
                     </a>
                   </li>
                   <li>
                     <a
                         href='#'
                         className='px-[24px] flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all'
                     >
                       გადახდები
                     </a>
                   </li>
                   <li>
                     <a
                         href='#'
                         className='px-[24px] flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all'
                     >
                      ავტომობილები
                     </a>
                   </li>
                   <li>
                     <a
                         href='#'
                         className='px-[24px] flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px] hover:bg-[#F2F3F6] transition-all'
                     >
                       კომპანიის რედაქტირება
                     </a>
                   </li>
                 </ul>
                 ):
                 (
                   <ul className='py-[8px]'>
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
                 )
                 }

                 <div className='border-t-[1px] border-[#E9EAEB] py-[8px]'>
                   <a
                       className='flex text-[16px] text-[#272A37] cursor-pointer py-[8px] px-[24px] hover:bg-[#F2F3F6] transition-all'
                       href='#'
                   >
                     გასვლა
                   </a>
                 </div>
               </>
             )
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Avatar
