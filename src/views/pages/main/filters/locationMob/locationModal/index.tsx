import { Fragment, useRef } from 'react'

import { Dialog, Transition, Combobox } from '@headlessui/react'

import Icon from 'src/views/app/Icon'
import { Controller } from 'react-hook-form'
import useSearchLocations from 'src/views/pages/main/filters/locationDropdown/useSearchLocations'

interface Props {
  open: boolean
  toggleModal: () => void
  control: any
}

const LocationModal: React.FC<Props> = ({ open, toggleModal, control }) => {
  const { cities } = useSearchLocations()

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
              <Dialog.Panel className='relative transform overflow-hidden rounded-tl-3xl rounded-tr-3xl md:rounded-bl-3xl md:rounded-br-3xl bg-white text-left shadow-xl transition-all w-full md:my-4 md:max-w-3xl'>
                <span
                  onTouchStart={handleTouchStart}
                  onClick={handleOutsideClick}
                  className='absolute top-2  left-1/2 -translate-x-1/2 h-[3px] w-[50px]  bg-raisin-20'
                />
                <div className='w-full flex justify-between items-center px-4 py-5 sm:py-6 sm:px-10 border-b-1 border-grey-90'>
                  <Dialog.Title as='h3' className='w-full flex items-center justify-between'>
                    ადგილმდებარეობა
                    <Icon svgPath='close' onClick={toggleModal} height={40} width={40} className='cursor-pointer' />
                  </Dialog.Title>
                </div>
                <Controller
                  name='location'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Combobox value={value} onChange={onChange}>
                      <div className='relative mt-1'>
                        <div className='relative w-full p-4'>
                          <Combobox.Input
                            className='w-full border border-raisin-10 h-12 rounded-lg p-4 text-2sm'
                            placeholder='ჩაწერე ადგილმდებარეობა'
                            displayValue={(city: any) => city.city}
                            onChange={onChange}
                            value={value}
                          />
                          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'></Combobox.Button>
                        </div>
                        <ul className='max-h-[360px] overflow-auto'>
                          {cities?.map((city: any) => (
                            <Combobox.Option
                              key={city.city}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 px-8 text-raisin-100 mb-1 ${
                                  active ? 'bg-raisin-10' : ''
                                }`
                              }
                              value={city.city}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`flex items-center truncate text-2sm ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    <Icon
                                      svgPath='locationOutline'
                                      width={24}
                                      height={24}
                                      className='fill-transparent flex shrink-0 mr-2'
                                    />
                                    {city.city}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`flex items-center pl-3 ${active ? 'text-white' : 'text-raisin-100'}`}
                                    ></span>
                                  ) : null}
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </div>
                    </Combobox>
                  )}
                />
                <div className='w-full flex flex-row items-center justify-between py-4 px-4 md:px-10 border-t-1 border-grey-90 border-t-1 border-raisin-10'>
                  <button
                    className='w-full h-12 flex items-center justify-center rounded-2xl bg-orange-100 text-white'
                    onClick={toggleModal}
                  >
                    არჩევა
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default LocationModal
