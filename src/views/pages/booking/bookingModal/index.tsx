import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DefaultButton } from '../../../components/button'

// import Typography from '../../../components/typography'

import BookingList from './bookingList'

// import BookingMap from './bookingMap'

import dynamic from 'next/dynamic'

const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })

interface Props {
  open: boolean
  onClose: () => void
  addresses: any
  control: any
}

// const cat = [
//   {
//     title: 'სია',
//     icon: 'booking-list',
//     id: 0
//   },
//   {
//     title: 'რუკაზე',
//     icon: 'booking-map',
//     id: 1
//   }
// ]

// const tabs = (...classes: any) => {
//   return classes.filter(Boolean).join(' ')
// }

const BookingModal: React.FC<Props> = ({ open, onClose, addresses, control }) => {
  // const renderTabContent = (id: any) => {
  //   if (id === 0) {
  //     return <BookingList addresses={addresses} control={control} />
  //   } else {
  //     return <BookingMap />
  //   }
  // }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-[111]' onClose={onClose}>
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
          <div className='absolute left-1/2 -translate-x-1/2 w-full max-w-[790px] flex min-h-full items-end justify-center md:p-4 text-center md:items-center md:p-0'>
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
                <div className='w-full flex justify-between items-center px-5 md:px-10 py-4 md:py-6 sm:px-10 border-b-1 border-raisin-10 mb-6'>
                  <Dialog.Title as='h3' className='text-md md:text-2md text-raisin-100 font-normal'>
                    აირჩიე მისამართი
                  </Dialog.Title>
                  <Icon
                    svgPath='close'
                    height={40}
                    width={40}
                    onClick={onClose}
                    className='flex shrink-0 cursor-pointer'
                  />
                </div>
                <BookingList addresses={addresses} control={control} />
                {/*<div className='overflow-auto max-h-[70vh] pb-5 sm:pb-6 w-max-full'>*/}
                {/*  <Tab.Group>*/}
                {/*    <Tab.List className='flex justify-end space-x-8 border-b border-raisin-10 pt-6 px-4 sm:px-10'>*/}
                {/*      {cat.map((category, key: number) => (*/}
                {/*        <Tab key={key} className='focus:outline-none'>*/}
                {/*          {({ selected }) => (*/}
                {/*            <div*/}
                {/*              className={`flex items-center pb-6 ${*/}
                {/*                selected ? 'border-b-2 border-green-100' : 'border-none'*/}
                {/*              }`}*/}
                {/*            >*/}
                {/*              <Icon svgPath={category.icon} width={24} height={24} className='fill-transparent flex mr-3'/>*/}
                {/*              <Typography type='body' color='dark' className='text-2sm'>*/}
                {/*                {category.title}*/}
                {/*              </Typography>*/}
                {/*            </div>*/}
                {/*          )}*/}
                {/*        </Tab>*/}
                {/*      ))}*/}
                {/*    </Tab.List>*/}
                {/*    <Tab.Panels>*/}
                {/*      {cat.map((item, idx: number) => (*/}
                {/*        <Tab.Panel key={idx} className={tabs('rounded-xl bg-white', 'focus:outline-none')}>*/}
                {/*          {renderTabContent(item.id)}*/}
                {/*        </Tab.Panel>*/}
                {/*      ))}*/}
                {/*    </Tab.Panels>*/}
                {/*  </Tab.Group>*/}
                {/*</div>*/}
                <div className='w-full flex items-center justify-end py-4 px-4 md:px-10 border-t-1 border-grey-90 mt-10'>
                  <DefaultButton
                    text='შენახვა'
                    onClick={onClose}
                    bg='bg-green-100'
                    textColor='text-white'
                    className='text-2sm md:text-md rounded-xl px-6 md:px-8 h-11 md:h-14'
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default BookingModal
