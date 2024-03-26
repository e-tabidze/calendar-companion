import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import Icon from 'src/views/app/Icon'
import Divider from 'src/views/components/divider'
import {useTranslation} from "next-i18next";

interface Props {
  open: boolean
  toggleModal: () => void
  productId: number | null
  deleteCompany: (id: number | null) => void
}

const DeleteProductConfirmationModal: React.FC<Props> = ({ open, toggleModal, productId, deleteCompany }) => {
  const {t} = useTranslation()

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
                <div className='w-full px-8 pt-5 pb-8 md:px-16 md:pt-10 md:pb-16 flex items-center flex-col'>
                  <Icon svgPath='trash-red' width={64} height={64} />
                  <Dialog.Title as='h3' className='text-sm md:text-2md text-base-100 leading-6 pt-4'>
                    {t('sure_remove_product')}
                  </Dialog.Title>
                </div>
                <Divider />
                <div className='w-full flex md:items-center justify-between py-2 md:py-4 px-4 md:px-10'>
                  <DefaultButton
                    text={t('decline')}
                    className='border-none text-sm md:text-md'
                    type='submit'
                    onClick={() => {
                      toggleModal()
                    }}
                  />
                  <IconTextButton
                    label={t('remove')}
                    className='text-red-120 text-sm md:text-md'
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
