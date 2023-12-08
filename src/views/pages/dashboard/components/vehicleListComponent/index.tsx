import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Typography from 'src/views/components/typography'
import DeleteProductConfirmationModal from '../../products/deleteProductModal'
import useProducts from '../../products/useProducts'
import Action from './action'

interface Props {
  price: number
  startCity: string
  model: string
  manufacturer: string
  prodYear: number
  active: number
  id: number
  filter: '' | 0 | 1 | 2
}

const VehicleListComponent: React.FC<Props> = ({ price, startCity, prodYear, model, manufacturer, active, id, filter }) => {
  const [deleteProductModal, setDeleteProductModal] = useState(false)

  const { width } = useWindowDimensions()

  const { deleteProduct, activeProducts } = useProducts(filter)

  const queryClient = useQueryClient()

  const deleteProductMutation = useMutation(() => deleteProduct(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['companyProducts'])
    }
  })

  const activeProductMutation = useMutation(() => activeProducts(id, active === 1 ? 0 : 1), {
    onSuccess: () => {
      queryClient.invalidateQueries(['companyProducts'])
    }
  })

  const deletProduct = () => {
    deleteProductMutation.mutate()
  }

  const toggleActivateProduct = () => {
    activeProductMutation.mutate()
  }

  const toggleDeleteProductModal = () => setDeleteProductModal(!deleteProductModal)

  return (
    <>
      {deleteProductMutation.isLoading && <div>Deleting...</div>}
      {deleteProductMutation.isSuccess && <div>Product deleted successfully!</div>}
      <div className='relative border-b-1 border-raisin-10 last:border-none'>
        <div className='flex flex-col px-2 py-4 md:w-full justify-between gap-6 md:px-0 md:flex-row md:items-center'>
          <div className='flex gap-6 2xl:gap-6 min-w-max'>
            <Image
              src='/images/car.png'
              alt=''
              height={width > 779 ? 150 : 50}
              width={width > 779 ? 250 : 82}
              className='rounded-lg object-cover'
            />
            <div className='min-w-max'>
              <Typography type='body' color='light'>
                {startCity}
              </Typography>
              <Link href={`/details/${id}`}>
                <Typography type='subtitle'>
                  {manufacturer} {model} {prodYear}
                </Typography>
                <div className='flex items-center gap-10 md:mt-10'>
                  <Typography type='h4' weight={width > 779 ? 'medium' : 'normal'} color='dark'>
                    {price} ₾ დღე
                  </Typography>
                  <Typography
                    type='subtitle'
                    className={`cursor-default py-1 px-2 rounded-lg text-2sm ${
                      active ? 'text-white bg-green-100' : 'text-raisin-100 bg-grey-100'
                    }`}
                  >
                    {active ? 'აქტიური' : 'გამორთული'}
                  </Typography>
                </div>
              </Link>
            </div>
          </div>
          <div className='hidden md:flex gap-4'>
            <Action
              bg={active ? 'bg-raisin-10' : 'bg-green-10'}
              label={active ? 'გამორთვა' : 'ჩართვა'}
              icon={active ? 'stop' : 'play'}
              onClick={toggleActivateProduct}
            />
            <Link href={`/dashboard/edit-product?id=${id}`} as={`/dashboard/edit-product?id=${id}`}>
              <Action bg='bg-raisin-10' label='რედაქტირება' icon='edit' />
            </Link>
            <Action bg='bg-raisin-10' label='წაშლა' icon='trash' onClick={toggleDeleteProductModal} />
          </div>
        </div>
        <Image src='/icons/more.svg' alt='' height={13} width={3} className='absolute right-5 top-5 md:hidden' />
      </div>
      <DeleteProductConfirmationModal
        open={deleteProductModal}
        toggleModal={toggleDeleteProductModal}
        deleteCompany={deletProduct}
        productId={id}
      />
    </>
  )
}

export default VehicleListComponent
