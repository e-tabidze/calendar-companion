import { Fragment, useRef } from 'react'
import Image from '../../image'

// Libraries
import { Dialog, Transition } from '@headlessui/react'

interface Props {
    user: any
    open: boolean
    setOpen: () => void
}
const BurgerMenu: React.FC<Props> = ({ open, setOpen, user }) => {
    const cancelButtonRef = useRef(null)

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
                                <nav>
                                    {user == 1 &&
                                    <ul>
                                        <li>
                                            <a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                                დეშბორდი
                                            </a>
                                        </li>
                                        <li>
                                            <a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                                განცხადების დამატება
                                            </a>
                                        </li>
                                        <li>
                                            <a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                                შემოსული ჯაშნები
                                            </a>
                                        </li>
                                        <li>
                                            <a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                                გადახდები
                                            </a>
                                        </li>
                                        <li>
                                            <a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                                ავტომობილები
                                            </a>
                                        </li>
                                        <li>
                                            <a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                                კომპანიის რედაქტირება
                                            </a>
                                        </li>
                                    </ul>
                                    }
                                    {user == 0 &&
                                    <ul>
                                        <li>
                                            <a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                                ჩემი შეკვეთები
                                            </a>
                                        </li>
                                        <li>
                                            <a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                                ბარათები დატრანზაქციები
                                            </a>
                                        </li>
                                        <li>
                                            <a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                                პარამეტრები
                                            </a>
                                        </li>
                                        <li>
                                            <a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                                კომპანიის შექმნა
                                            </a>
                                        </li>
                                    </ul>
                                    }
                                    <ul className="py-[24px] border-t-[1px] border-[#E9EAEB] mt-[24px]">
                                        <li>
                                            <a href="">
                                                <div className="py-3 hover:bg-[#F2F3F6] flex items-center justify-between">
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
                                        </li>
                                        <li>
                                            <a href="">
                                                <div className="py-3 hover:bg-[#F2F3F6] flex items-center justify-between">
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
                                        </li>
                                        <li>
                                            <a href="">
                                                <div className="py-3 hover:bg-[#F2F3F6] flex items-center justify-between">
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
                                        </li>

                                    </ul>
                                    <ul className="py-[24px] border-t-[1px] border-[#E9EAEB]">
                                        <li>
                                            <a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                                გასვლა
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default BurgerMenu
