import { Fragment, useRef } from 'react'

import { Dialog, Transition } from '@headlessui/react'

import Icon from 'src/views/app/Icon'

// import {useTranslation} from "next-i18next"

interface Props {
    open: boolean
    onClose: () => void
    toggleModal: () => void
}

const CloseModal: React.FC<Props> = ({ open, toggleModal, onClose }) => {

    // const {t} = useTranslation()

    const modalRef = useRef<HTMLDivElement>(null)

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            toggleModal()
        }
    }

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const touchY = e.touches[0].clientY
        const modalHeight = modalRef.current ? modalRef.current.clientHeight : 0
        const isSwipeDown = touchY > modalHeight * 0.01
        if (isSwipeDown) {
            toggleModal()
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as='div' className='relative z-[111]' onClose={toggleModal}>
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

                <div className='fixed inset-0 z-10 md:h-screen overflow-y-auto'>
                    <div className='absolute left-1/2 -translate-x-1/2 w-full max-w-[790px] flex min-h-full items-end justify-center text-center md:items-center md:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
                            enterTo='opacity-100 translate-y-0 md:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 md:scale-100'
                            leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
                        >
                            <Dialog.Panel className='relative transform overflow-hidden rounded-tl-3xl rounded-tr-3xl md:rounded-bl-3xl md:rounded-br-3xl bg-white text-left shadow-xl transition-all w-full md:my-4 md:max-w-[400px]'>
                                <span
                                    onTouchStart={handleTouchStart}
                                    onClick={handleOutsideClick}
                                    className='md:hidden absolute top-2 left-1/2 -translate-x-1/2 h-[3px] w-[50px] bg-raisin-20'
                                />
                                <div>
                                    <div className="p-4 flex justify-end">
                                        <Icon svgPath='close' onClick={toggleModal} height={40} width={40} className='cursor-pointer' />
                                    </div>

                                    <div className="flex flex-col justify-center items-center mt-10 mb-20">
                                        <h3 className="font-medium text-md mb-[12px]">ნამდვილად გსურთ გათიშვა? </h3>
                                        <p className="text-2sm text-black">ყველა შევსებული მონაცემი წაიშლება</p>
                                    </div>
                                    <div className='py-6 px-8 w-full flex items-center justify-center border-t-1 border-raisin-10 gap-[16px]'>
                                        <button
                                            className='h-[52px] flex items-center px-8 rounded-xl bg-transparent hover:bg-raisin-5 transition-all text-black text-2sm'
                                            onClick={onClose}
                                        >
                                            გათიშვა
                                        </button>
                                        <button
                                            className='h-[52px] flex items-center px-8 rounded-xl bg-orange-100 hover:bg-orange-110 transition-all text-white text-2sm'
                                            onClick={toggleModal}
                                        >
                                           გაგრძელება
                                        </button>
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

export default CloseModal
