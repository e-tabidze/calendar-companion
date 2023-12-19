import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Carousel from 'src/views/components/carousel'
import { IconButton } from 'src/views/components/button'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  images: any[]
}

const ProductImagesDialog = ({ open, setOpen, images }: Props) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50 w-screen h-screen' onClose={setOpen} open={open}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
          enterTo='opacity-100 translate-y-0 md:scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 translate-y-0 md:scale-100'
          leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
        >
          <Dialog.Panel className='fixed inset-0 z-10 transform md:p-10 lg:p-0 bg-white text-left shadow-xl transition-all w-screen h-screen overflow-y-auto'>
            <div className='absolute top-4 right-0'>
              <IconButton icon='close' className='!w-16 !h-16 cursor-pointer' onClick={setOpen} width={48} height={48} />
            </div>
            <div className='lg:w-9/12 xl:w-8/12 m-auto px-5 lg:px-0 w-max-full h-full justify-center flex flex-col'>
              <Carousel itemsArray={images} type='gallery' thumbs />
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default ProductImagesDialog
