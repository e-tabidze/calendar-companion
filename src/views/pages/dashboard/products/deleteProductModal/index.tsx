import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import Icon from 'src/views/app/Icon'

interface Props {
  open: boolean
  toggleModal: () => void
  productId: number | null
  deleteCompany: (id: number | null) => void
}

const DeleteProductConfirmationModal: React.FC<Props> = ({ open, toggleModal, productId, deleteCompany }) => {
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

        <div className='fixed inset-0 z-10 h-screen overflow-y-auto'>
          <div className='absolute left-1/2 -translate-x-1/2 w-fit flex min-h-full items-end justify-center p-4 text-center md:items-center md:p-0'>
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
                <div className='w-full flex justify-end p-3'>
                  <Icon svgPath='close' onClick={toggleModal} height={40} width={40} className='cursor-pointer' />
                </div>
                <Dialog.Title as='h3' className='text-2md text-base-100 leading-6 px-6 pb-6 pt-1'>
                  ნამდვილად გსურთ პროდუქტის წაშლა?
                </Dialog.Title>

                <div className='w-full flex flex-col md:flex-row md:items-center justify-between py-4 px-4 md:px-10 border-t-1 border-grey-90'>
                  <DefaultButton
                    text='უარყოფა'
                    className='border-none'
                    type='submit'
                    onClick={() => {
                      toggleModal()
                    }}
                  />
                  <IconTextButton
                    label='წაშლა'
                    className='text-red-120'
                    icon='clear'
                    width={24}
                    height={24}
                    type='submit'
                    onClick={() => {
                      deleteCompany(productId)
                      toggleModal()
                    }}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default DeleteProductConfirmationModal
