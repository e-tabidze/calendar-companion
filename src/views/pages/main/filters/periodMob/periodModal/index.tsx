import {Fragment, useState} from 'react'

import { Dialog, Transition } from '@headlessui/react'

import Icon from 'src/views/app/Icon'
import {Controller} from "react-hook-form";
import DatePicker from "react-datepicker";
import {formatDate} from "src/utils/formatDate";

interface Props {
    open: boolean
    toggleModal: () => void
    control: any
}

const PeriodModal: React.FC<Props> = ({open, toggleModal, control}) => {
    const [dateRange, setDateRange] = useState<[Date, Date] | [null, null]>([null, null])
    const [startDate, endDate] = dateRange

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
                            <Dialog.Panel className='relative transform overflow-hidden rounded-tl-3xl rounded-tr-3xl md:rounded-bl-3xl md:rounded-br-3xl bg-white text-left shadow-xl transition-all w-full md:my-4 md:max-w-3xl'>
                                <div className='w-full flex justify-between items-center px-4 py-5 sm:py-6 sm:px-10 border-b-1 border-grey-90'>
                                    <Dialog.Title as='h3' className='w-full flex items-center justify-between'>
                                        პერიოდი
                                        <Icon svgPath='close' onClick={toggleModal} height={40} width={40} className='cursor-pointer' />
                                    </Dialog.Title>
                                </div>
                                <Controller
                                    name='booking'
                                    control={control}
                                    render={({ field: { onChange } }) => (
                                        <div className='flex justify-center py-6'>
                                            <DatePicker
                                                className='text-center border-l-4 border-red-500  w-full p-3 rounded text-sm  outline-none  focus:ring-0 bg-transparent'
                                                inline
                                                selectsRange={true}
                                                startDate={startDate}
                                                endDate={endDate}
                                                monthsShown={1}
                                                onChange={(update: any) => {
                                                    if (update) {
                                                        const [start, end] = update
                                                        onChange({ book_from: formatDate(start), book_to: formatDate(end) })
                                                        setDateRange(update)
                                                    } else {
                                                        onChange(null)
                                                        setDateRange([null, null])
                                                    }
                                                }}
                                                dateFormat='yyyy-MM-dd'
                                                onChangeRaw={e => e.preventDefault()}
                                                minDate={new Date()}
                                            />
                                        </div>

                                    )}
                                />
                                <div className="w-full flex flex-row items-center justify-between py-4 px-4 md:px-10 border-t-1 border-grey-90 border-t-1 border-raisin-10">
                                    <button className='w-full h-12 flex items-center justify-center rounded-2xl bg-orange-100 text-white' onClick={toggleModal}>არჩევა</button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default PeriodModal
