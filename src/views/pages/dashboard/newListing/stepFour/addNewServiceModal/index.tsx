import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DefaultButton, IconButton } from 'src/views/components/button'
import Counter from 'src/views/components/counter'
import Divider from 'src/views/components/divider'
import { DefaultInput, MultilineInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'

interface Props {
  open: boolean
  onClose: () => void
}

const AddNewServiceModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
                <Dialog.Title as='h3' className='w-full flex items-center justify-between px-10 py-6'>
                  <Typography type='h5' weight='normal' className='text-2md'>
                    ახალი სერვისის დამატება
                  </Typography>
                  <IconButton icon='/icons/close.svg' onClick={onClose} width={40} height={40} />
                </Dialog.Title>
                <Divider />
                <div className='p-6 mb-20'>
                  <div className='flex flex-col gap-4'>
                    <DefaultInput label='სერვისის დასახელება' />
                    <MultilineInput label='გადაცემის პირობები' rows={4} />
                  </div>
                  <Typography type='subtitle' className='text-black font-bold mt-9 mb-2'>
                    ღირებულება
                  </Typography>
                  <div className='flex justify-between items-center w-full gag-6'>
                    <Typography type='body' className='w-7/12'>
                      მითითებული ფასი განსაზღვრავს დამატებითი სერვისისის 1 დღის ქირაობის ფასს, რომლის ცვალებადობაც
                      დამოკიდებული იქნება დღეების რაოდენობასზე
                    </Typography>
                    <DefaultInput label='დღიური ღირებულება' className='!w-64' />
                  </div>

                  <Typography type='subtitle' className='text-black font-bold mt-12 mb-2'>
                    ღირებულება
                  </Typography>
                  <div className='flex justify-between items-center w-full gag-6'>
                    <Typography type='body' className='w-7/12'>
                      მითითებული ფასი განსაზღვრავს დამატებითი სერვისისის 1 დღის ქირაობის ფასს, რომლის ცვალებადობაც
                      დამოკიდებული იქნება დღეების რაოდენობასზე
                    </Typography>
                    <div className='flex justify-center items-center border border-px-raisin-130 w-64 rounded-2xl h-14'>
                      <Counter />
                    </div>
                  </div>
                </div>
                <div className='flex justify-end absolute bottom-0 w-full shadow-md'>
                  <DefaultButton text='დამატება' bg='bg-green-100' className='my-4 mr-10'></DefaultButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AddNewServiceModal
