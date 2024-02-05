import { Popover } from '@headlessui/react'
import Link from 'next/link'
import Icon from 'src/views/app/Icon'
import Action from '../action'

interface Props {
  toggleDeleteProductModal: () => void
  active: number
  toggleActivateProduct: () => void
  id: number
}

const ActionsPopover: React.FC<Props> = ({ toggleDeleteProductModal, active, toggleActivateProduct, id }) => {
  return (
    <div className='absolute right-4 top-4 lg:hidden'>
      <Popover className='relative'>
        <Popover.Button className='flex items-center w-max cursor-pointer'>
          <Icon svgPath='more' width={4} height={14} className='fill-transparent' />
        </Popover.Button>

        <Popover.Panel className='w-[220px] absolute z-50 p-5 h-fit rounded-2xl shadow-2xl bg-white header-shadow text-xs right-0'>
          <Action
            bg={active ? 'bg-raisin-10' : 'bg-green-10'}
            label={active ? 'გამორთვა' : 'ჩართვა'}
            icon={active ? 'stop' : 'play'}
            onClick={toggleActivateProduct}
            className='mb-4 md:mb-0'
          />
          <Link href={`/dashboard/edit-product?id=${id}`} as={`/dashboard/edit-product?id=${id}`}>
            <Action bg='bg-raisin-10' label='რედაქტირება' icon='edit' className='mb-4 md:mb-0' />
          </Link>
          <Action bg='bg-raisin-10' label='წაშლა' icon='trash' onClick={toggleDeleteProductModal} />
        </Popover.Panel>
      </Popover>
    </div>
  )
}

export default ActionsPopover
