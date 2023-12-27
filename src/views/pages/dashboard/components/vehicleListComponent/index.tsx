import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import useProducts from '../../products/useProducts'
import Action from './action'
import dynamic from 'next/dynamic'

const Image = dynamic(() => import('src/views/components/image'), { ssr: true })
const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
const Carousel = dynamic(() => import('src/views/components/carousel'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const DeleteProductConfirmationModal = dynamic(() => import('../../products/deleteProductModal'), { ssr: false })

interface Props {
  price: number
  startCity: string
  model: string
  manufacturer: string
  prodYear: number
  active: number
  id: number
  filter: '' | '0' | '1' | '2'
  images: string
}

const VehicleListComponent: React.FC<Props> = ({
  price,
  startCity,
  prodYear,
  model,
  manufacturer,
  active,
  id,
  filter,
  images
}) => {
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
      <div className='relative border-b-1 border-raisin-10 last:border-none'>
        <div className='flex flex-col px-2 py-4 md:w-full justify-between gap-6 md:px-0 md:flex-row md:items-center'>
          <div className='flex gap-6 2xl:gap-6'>
            <div className='w-[64px] md:w-[150px] lg:w-[200px] xl:w-[250px]'>
              <Carousel
                itemsArray={images?.split(',')?.map((imgUrl, index) => (
                  <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden' key={index}>
                    <Image
                      src={imgUrl || ''}
                      alt={`${manufacturer} ${model} ${prodYear}`}
                      height={'100%'}
                      width={'100%'}
                      className='object-cover'
                      onError={(ev: any) => {
                        ev.target.src = `/icons/avatar.svg`
                      }}
                    />
                  </div>
                ))}
                type='card'
              />
            </div>
            <div className='pr-6 md:pr-0'>
              <Typography type='body' color='light'>
                {startCity}
              </Typography>
              <Link href={`/details/${id}`}>
                <Typography type='subtitle'>
                  {manufacturer} {model} {prodYear}
                </Typography>
                <div className='flex items-center gap-10 md:mt-10'>
                  <Typography
                    type='h4'
                    weight={width > 779 ? 'medium' : 'normal'}
                    color='dark'
                    className='text-md md:text-3md'
                  >
                    {price} ₾ დღე
                  </Typography>
                  <Typography
                    type='subtitle'
                    className={`cursor-default py-1 px-2 rounded-lg text-sm md:text-2sm ${
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
              disabled={activeProductMutation?.isLoading}
            />
            <Link href={`/dashboard/edit-product?id=${id}`} as={`/dashboard/edit-product?id=${id}`}>
              <Action bg='bg-raisin-10' label='რედაქტირება' icon='edit' />
            </Link>
            <Action
              bg='bg-raisin-10'
              label='წაშლა'
              icon='trash'
              onClick={toggleDeleteProductModal}
              disabled={deleteProductMutation.isLoading}
            />
          </div>
        </div>
        <Icon svgPath='more' width={4} height={14} className='absolute right-5 top-5 md:hidden' />
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
