import { Fragment, useRef } from 'react'
import Image from '../../image'

// Libraries
import { Dialog, Transition } from '@headlessui/react'

interface Props {
    open: boolean
    setOpen: () => void
}

const BurgerMenu: React.FC<Props> = ({ open, setOpen }) => {
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
                                <nav className="burger-nav active">
                                    <ul className="burger-main-menu">
                                        <li><a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                            გაფორმება
                                        </a></li>
                                        <li><a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                            VIN-ის შემოწმება
                                        </a></li>
                                        <li><a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                            დილერები
                                        </a></li>
                                        <li><a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                            ავტოსალონები
                                        </a></li>
                                        <li><a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                            აუქციონი
                                        </a></li>
                                        <li><a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                            ავტონაწილები
                                        </a></li>
                                        <li><a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                            კატალოგი
                                        </a></li>
                                        <li><a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                            ბლოგი
                                        </a></li>
                                    </ul>
                                    <ul className="burger-help-menu py-[24px] border-t-[1px] border-[#E9EAEB] mt-[24px]">
                                        <li><a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                            დახმარება
                                        </a></li>
                                        <li><a target="_blank" href=""
                                               className="flex text-[16px] text-[#272A37] py-[8px]" rel="noreferrer">
                                            კონტაქტი
                                        </a></li>
                                    </ul>
                                </nav>
                                <div
                                    className="burger-menu-langs flex items-center border-t-[1px] border-[#E9EAEB] pt-[32px] active">
                                    <ul className="flex">
                                        <li className="mr-[8px]">
                                            <div className="lng lng-ka"><a
                                                className="h-[40px] flex items-center text-[#1B1D27] text-[12px] font-medium px-[8px] cursor-pointer rounded-[8px] bg-[#F2F3F6] border border-[#1B1D27]"><span
                                                className="lang-code">ქართული</span></a></div>
                                        </li>
                                        <li className="mr-[8px]">
                                            <div className="lng lng-en"><a
                                                className="h-[40px] flex items-center text-[#1B1D27] text-[12px] font-medium px-[8px] cursor-pointer border border-[#D4D4D7] rounded-[8px]"
                                                href=""><span className="lang-code">English</span></a></div>
                                        </li>
                                        <li className="mr-[8px]">
                                            <div className="lng lng-ru"><a
                                                className="h-[40px] flex items-center text-[#1B1D27] text-[12px] font-medium px-[8px] cursor-pointer border border-[#D4D4D7] rounded-[8px]"
                                                href=""><span className="lang-code">Русский</span></a></div>
                                        </li>
                                    </ul>
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
