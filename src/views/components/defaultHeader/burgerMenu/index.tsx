import {Fragment, useRef, useState} from 'react'
import Image from '../../image'

// Libraries
import { Dialog, Transition } from '@headlessui/react'
import useProfile from "../../../../hooks/useProfile";
import {useMutation, useQueryClient} from "@tanstack/react-query";

interface Props {
    open: boolean
    setOpen: () => void
}
const BurgerMenu: React.FC<Props> = ({ open, setOpen }) => {
    const cancelButtonRef = useRef(null)
    const { userInfo, userCompanies, postSwitchProfile, activeCompany, router, isAuthenticated } = useProfile()
    const queryClient = useQueryClient()

    const [active, setActive] = useState(false);
    const handleSetActive = () => {
        setActive(!active);
    };
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
                    <div className='w-full bg-[#ffffff] fixed top-0 left-0 px-[32px] overflow-hidden h-full'>
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
                                <div className='flex items-center justify-between mt-[20px] mb-[16px]'>
                                    <Dialog.Title as='h3' className='text-[12px] text-[#A9AAAF]'>
                                        მენიუ
                                    </Dialog.Title>
                                    <Image src='/icons/close.svg' onClick={setOpen} alt='' height={40} width={40} />
                                </div>
                                <div className='overflow-hidden rounded-[16px]'>
                                    {active ? (
                                            <>
                                                <div className="flex items-center border-b-1 border-raisin-10 py-[16px] text-[12px]">
                                                    <button className="cursor-pointer flex mr-[16px]" onClick={handleSetActive}>
                                                        <Image src='/icons/chevron-left.svg' alt='chevron' />
                                                    </button>
                                                    დაბრუნება
                                                </div>
                                                <ul className="py-3 max-h-[335px] overflow-y-auto">
                                                    {userCompanies?.map((company: { information: { name: string | undefined }; id: string }) => (
                                                        <li onClick={() => handleProfileSwitch(company?.id)} key={company.id}>
                                                            <div className='cursor-pointer py-3  flex items-center justify-between'>
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
                                                        <div className='cursor-pointer py-3 flex items-center justify-between'>
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
                                                <div className='flex items-center justify-between border-b-[1px] border-[#E9EAEB] py-[16px]'>
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
                                                                    className='flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px]'
                                                                >
                                                                    დეშბორდი
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href='#'
                                                                    className='flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px]'
                                                                >
                                                                    განცხადების დამატება
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href='#'
                                                                    className='flex items justify-between whitespace-nowrap text-[16px] text-[#272A37] py-[8px]'
                                                                >
                                                                    <span> შემოსული ჯავშნები</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href='#'
                                                                    className='flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px]'
                                                                >
                                                                    გადახდები
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href='#'
                                                                    className='flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px]'
                                                                >
                                                                    ავტომობილები
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href='#'
                                                                    className='flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px]'
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
                                                                    className='flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px]'
                                                                >
                                                                    ჩემი შეკვეთები
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href='#'
                                                                    className='flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px]'
                                                                >
                                                                    ბარათები და ტრანზაქციები
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href='#'
                                                                    className='flex items justify-between whitespace-nowrap text-[16px] text-[#272A37] py-[8px]'
                                                                >
                                                                    <span> პარამეტრები</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href='#'
                                                                    className='flex whitespace-nowrap text-[16px] text-[#272A37] py-[8px]'
                                                                >
                                                                    კომპანიის შექმნა
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    )
                                                }

                                                <div className='border-t-[1px] border-[#E9EAEB] py-[8px]'>
                                                    <a
                                                        className='flex text-[16px] text-[#272A37] cursor-pointer py-[8px]'
                                                        href='#'
                                                    >
                                                        გასვლა
                                                    </a>
                                                </div>
                                            </>
                                        )
                                    }
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
