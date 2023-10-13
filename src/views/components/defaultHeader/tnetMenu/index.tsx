import { Fragment, useRef } from 'react'
import Image from '../../image'

// Libraries
import { Dialog, Transition } from '@headlessui/react'

interface Props {
    open: boolean
    setOpen: () => void
}

const TnetMenu: React.FC<Props> = ({ open, setOpen }) => {
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
                    <div className='w-full bg-[#ffffff] fixed bottom-0 left-0 rounded-tl-[24px] rounded-tr-[24px] overflow-y-auto flex flex-col pb-[32px] px-[24px]'>
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
                                    <Dialog.Title as='h3' className='font-bold text-[20px] text-[#000000]'>
                                        TNET
                                    </Dialog.Title>
                                    <Image src='/icons/close.svg' onClick={setOpen} alt='' height={40} width={40} />
                                </div>
                                <div className="flex flex-col items-center text-center md:px-[16px]">
                                    <p
                                    className="text-[14px] text-[#7D7F87] mb-[16px] whitespace-normal">ყველაზე დიდი ტექნოლოგიური
                                    ეკოსისტემა, რომელიც აერთიანებს 11 პლატფორმას:</p></div>
                                <div className="flex flex-wrap border border-[#E9EAEB] rounded-[12px]">
                                    <div className="w-1/2 border-r-[1px] border-[#E9EAEB]">
                                        <a className="icon-h-32px h-[92px]   bg-[#F5F5F8] hover:bg-[#F5F5F8] border-b-[1px] border-[#E9EAEB] px-[16px] flex items-center justify-center"
                                           href="https://www.myauto.ge/ka/" target="_blank" rel="noreferrer">
                                            <Image src='/icons/tnet/myauto.svg' alt='img'/>
                                        </a>
                                    </div>
                                    <div className="w-1/2">
                                        <a
                                        className="icon-h-32px h-[92px]   border-b-[1px] border-[#E9EAEB] px-[16px] flex items-center justify-center"
                                        href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                                        <Image src='/icons/tnet/myhome.svg' alt='img'/>
                                    </a>
                                    </div>
                                    <div className="w-1/2 border-r-[1px] border-[#E9EAEB]">
                                        <a
                                            className="icon-h-32px h-[92px]   border-b-[1px] border-[#E9EAEB] px-[16px] flex items-center justify-center"
                                            href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                                            <Image src='/icons/tnet/mymarket.svg' alt='img'/>
                                        </a>
                                    </div>
                                    <div className="w-1/2">
                                        <a
                                            className="icon-h-32px h-[92px]   border-b-[1px] border-[#E9EAEB] px-[16px] flex items-center justify-center"
                                            href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                                            <Image src='/icons/tnet/myparts.svg' alt='img'/>
                                        </a>
                                    </div>
                                    <div className="w-1/2 border-r-[1px] border-[#E9EAEB]">
                                        <a
                                            className="icon-h-32px h-[92px]   border-b-[1px] border-[#E9EAEB] px-[16px] flex items-center justify-center"
                                            href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                                            <Image src='/icons/tnet/vendoo.svg' alt='img'/>
                                        </a>
                                    </div>
                                    <div className="w-1/2">
                                        <a
                                            className="icon-h-32px h-[92px]   border-b-[1px] border-[#E9EAEB] px-[16px] flex items-center justify-center"
                                            href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                                            <Image src='/icons/tnet/swoop.svg' alt='img'/>
                                        </a>
                                    </div>
                                    <div className="w-1/2 border-r-[1px] border-[#E9EAEB]">
                                        <a
                                            className="icon-h-32px h-[92px]   border-b-[1px] border-[#E9EAEB] px-[16px] flex items-center justify-center"
                                            href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                                            <Image src='/icons/tnet/tkt.svg' alt='img'/>
                                        </a>
                                    </div>
                                    <div className="w-1/2">
                                        <a
                                            className="icon-h-32px h-[92px]   border-b-[1px] border-[#E9EAEB] px-[16px] flex items-center justify-center"
                                            href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                                            <Image src='/icons/tnet/livo.svg' alt='img'/>
                                        </a>
                                    </div>
                                    <div className="w-1/2 border-r-[1px] border-[#E9EAEB]">
                                        <a
                                            className="icon-h-32px h-[92px]   border-b-[1px] border-[#E9EAEB] px-[16px] flex items-center justify-center"
                                            href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                                            <Image src='/icons/tnet/saba.png' alt='img' height={32} width={69}/>
                                        </a>
                                    </div>
                                    <div className="w-1/2">
                                        <a
                                            className="icon-h-32px h-[92px]   border-b-[1px] border-[#E9EAEB] px-[16px] flex items-center justify-center"
                                            href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                                            <Image src='/icons/tnet/myshop.svg' alt='img'/>
                                        </a>
                                    </div>
                                    <div className="w-full">
                                        <a
                                            className="icon-h-32px h-[92px]   px-[16px] flex items-center justify-center"
                                            href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                                            <Image src='/icons/tnet/super-app.svg' alt='img'/>
                                        </a>
                                    </div>
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default TnetMenu
