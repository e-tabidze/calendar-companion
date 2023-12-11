import { Fragment } from 'react'
import { Dialog, Tab, Transition } from '@headlessui/react'
import { IconTextButton } from '../../../components/button'
import Image from '../../../components/image'
import Typography from '../../../components/typography'
import BookingList from './bookingList'
import BookingMap from './bookingMap'
import Icon from "src/views/app/Icon";

interface Props {
  open: boolean
  onClose: () => void
  addresses: any
  control: any
}
const cat = [
  {
    title: 'სია',
    icon: '/icons/booking-list.svg',
    id: 0
  },
  {
    title: 'რუკაზე',
    icon: '/icons/booking-map.svg',
    id: 1
  }
]
const tabs = (...classes: any) => {
  return classes.filter(Boolean).join(' ')
}

const BookingModal: React.FC<Props> = ({ open, onClose, addresses, control }) => {
  const renderTabContent = (id: any) => {
    if (id === 0) {
      return <BookingList addresses={addresses} control={control} />
    } else {
      return <BookingMap />
    }
  }

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
          <div className='absolute left-1/2 -translate-x-1/2 w-full max-w-[790px] flex min-h-full items-end justify-center p-4 text-center md:items-center md:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
              enterTo='opacity-100 translate-y-0 md:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 md:scale-100'
              leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all w-full md:my-4 md:max-w-3xl'>
                <div className='w-full flex justify-between items-center px-10 py-6 sm:py-6 sm:px-10 border-b-1 border-raisin-10'>
                  <Dialog.Title as='h3' className='text-[18px] text-raisin-100 font-normal'>
                    აირჩიე მისამართი საიდან წაიყვან მანქანა
                  </Dialog.Title>
                  <Icon svgPath='close' height={40} width={40} onClick={onClose} />
                </div>
                <div className='overflow-auto max-h-[70vh] pb-5 sm:pb-6 w-max-full'>
                  <Tab.Group>
                    <Tab.List className='flex justify-end space-x-8 border-b border-raisin-10 pt-6 px-4 sm:px-10'>
                      {cat.map((category, key: number) => (
                        <Tab key={key} className='focus:outline-none'>
                          {({ selected }) => (
                            <div
                              className={`flex items-center pb-6 ${
                                selected ? 'border-b-2 border-green-100' : 'border-none'
                              }`}
                            >
                              <Image src={category.icon} alt='' className='flex mr-3' />
                              <Typography type='body' color='dark' className='text-2sm'>
                                {category.title}
                              </Typography>
                            </div>
                          )}
                        </Tab>
                      ))}
                    </Tab.List>
                    <Tab.Panels>
                      {cat.map((item, idx: number) => (
                        <Tab.Panel key={idx} className={tabs('rounded-xl bg-white', 'focus:outline-none')}>
                          {renderTabContent(item.id)}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </div>
                <div className='w-full flex flex-col md:flex-row md:items-center justify-between py-4 px-4 md:px-10 border-t-1 border-grey-90'>
                  <IconTextButton
                    label='გასუფთავება'
                    icon='return'
                    width={20}
                    height={22}
                    className='fill-transparent text-raisin-50 text-sm underline font-normal'
                  />
                  <div className='flex items-center justify-center bg-green-100 text-white text-md rounded-xl px-8 h-14'>
                    შენახვა
                  </div>
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
