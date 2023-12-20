import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Typography from 'src/views/components/typography'
import Divider from 'src/views/components/divider'
import { DefaultButton } from 'src/views/components/button'
import Icon from 'src/views/app/Icon'

interface Props {
  open: boolean
  close: () => void
  handleCancel: any
}

const AuthModal: React.FC<Props> = ({ open, close, handleCancel }) => {
  return (
    <>
      <Transition show={open} as={Fragment}>
        <Dialog onClose={close} className='fixed inset-0 z-50 overflow-y-auto ' open={open}>
          <div className='flex items-center justify-center min-h-screen'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-black opacity-50' />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='bg-white rounded-lg max-w-lg mx-auto'>
                <div className='p-6'>
                  <Icon svgPath='cancelOrder' width={84} height={84} className='fill-transparent m-auto pb-6' />
                  <Typography type='h5'>ნამდვილად გსურთ ჯავშნის გაუქმება?</Typography>
                </div>

                <Divider />

                <div className='flex justify-end p-4 gap-4'>
                  <DefaultButton text='უარყოფა' onClick={close} className='border-none' />
                  <DefaultButton text='გაუქმება' bg='bg-orange-100' onClick={handleCancel} textColor='text-white' />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default AuthModal
