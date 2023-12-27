import {Fragment, useRef, useState} from 'react'
import Image from '../../image'

// Libraries
import { Dialog, Transition } from '@headlessui/react'
import useProfile from "../../../../hooks/useProfile";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import Icon from "src/views/app/Icon";
import {dashboardRoutes, profileRoutes} from "src/utils/routes";
import Link from "next/link";

interface Props {
    open: boolean
    setOpen: () => void
}
const BurgerMenu: React.FC<Props> = ({ open, setOpen }) => {
    const cancelButtonRef = useRef(null)

    const [active, setActive] = useState(false)

    const queryClient = useQueryClient()

    const { userInfo, userCompanies, postSwitchProfile, activeCompany, router, activeCompanyId, handleLogout, defaultImgUrl } =
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
            console.log(error, 'error')
        }
    }

    const handleSetActive = () => {
        setActive(!active)
    }

    const routeClass = `px-6 flex whitespace-nowrap text-md text-raisin-100 py-2 active:bg-grey-100 transition-all`

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as='div' className='relative z-50' initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 h-screen overflow-y-auto'>
                    <div className='w-full bg-white fixed top-0 left-0 overflow-hidden h-full'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
                            enterTo='opacity-100 translate-y-0 md:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 md:scale-100'
                            leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
                        >
                            <Dialog.Panel className='relative transform overflow-hidden bg-white text-left transition-all w-full'>
                                <div className='flex items-center justify-between mt-5 mb-4 px-6'>
                                    <Dialog.Title as='h3' className='text-sm text-raisin-40'>
                                        მენიუ
                                    </Dialog.Title>
                                    <button onClick={setOpen}>
                                        <Icon svgPath='close' height={40} width={40} className='cursor-pointer'  />
                                    </button>
                                </div>
                                <div>
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
                                                            <div className='cursor-pointer px-4 py-3 active:bg-grey-100 flex items-center justify-between'>
                                                                <div className='flex items-center text-2sm'>
                                                                <span className='w-10 h-10 mr-4 relative flex items-center justify-center rounded-full overflow-hidden'>
                                                                  <Image
                                                                      src={company?.information?.logo || ''}
                                                                      className='object-cover w-full h-full'
                                                                      alt='avatar'
                                                                  />
                                                                </span>
                                                                    <div className='flex flex-col'>
                                                                          <span className='text-2sm  max-w-[140px] inline-block'>
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
                                                    <div className='cursor-pointer px-4 py-3 active:bg-grey-100 flex items-center justify-between'>
                                                        <div className='flex items-center text-2sm'>
                        <span className='w-10 h-10 mr-4 relative flex items-center justify-center rounded-full overflow-hidden'>
                          <Image
                              src={userInfo?.information?.profile_pic}
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
                                                              !!activeCompany ? activeCompany.information.logo : userInfo?.information?.profile_pic || defaultImgUrl
                                                          }
                                                          className='w-full h-full object-cover' alt='avatar' />
                                                    </span>
                                                    <div className='flex flex-col'>
                                                      <span className='text-2sm text-raisin-100'>
                                                        {userInfo?.Email}
                                                      </span>
                                                        <span className='flex text-2sm text-raisin-100'>ID: {userInfo?.active_profile_id}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='py-8px'>
                                                {userCompanies.length > 0  && (
                                                <button
                                                    className='mt-2 px-6 flex w-full flex items-center justify-between whitespace-nowrap text-md text-raisin-100 py-2 active:bg-grey-100 transition-all'
                                                    onClick={handleSetActive}
                                                >
                                                    ანგარიშის შეცვლა
                                                    <Icon svgPath='chevron-right' width={20} height={20} className="fill-transparent" />
                                                </button>
                                                )}
                                                {activeCompany ? (
                                                    <ul className='mb-2'>
                                                        {dashboardRoutes?.map(route => (
                                                            <li key={route.id}>
                                                                {route.path ? (
                                                                    <Link href={route.path} className={routeClass}>
                                                                        {route.item}
                                                                    </Link>
                                                                ) : (
                                                                    <button className={`border-t-1 border-raisin-10 w-full mt-2 pt-2 ${routeClass}`} onClick={handleLogout}>
                                                                        {route.item}
                                                                    </button>
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
                                                                    <button className={`border-t-1 border-raisin-10 w-full mt-2 pt-2 ${routeClass}`}  onClick={handleLogout}>
                                                                        {route.item}
                                                                    </button>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default BurgerMenu
