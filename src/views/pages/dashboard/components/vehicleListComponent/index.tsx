import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import useProducts from '../../products/useProducts'
import Action from './action'
import dynamic from 'next/dynamic'
import ActionsPopover from './actionsPopover'
import Toast from 'src/views/components/toast'
import { dynamicTranslateCities } from 'src/utils/translationUtils'

const Image = dynamic(() => import('src/views/components/image'), { ssr: true })
const Carousel = dynamic(() => import('src/views/components/carousel'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const DeleteProductConfirmationModal = dynamic(() => import('../../products/deleteProductModal'), { ssr: false })

import toast from 'react-hot-toast'
import { useTranslation } from 'next-i18next'
import BookDatesDialog from './bookDatesDialog'
import useCurrency from 'src/hooks/useCurrency'
import { removeExtraDecimalDigits } from 'src/utils/priceFormat'

interface Props {
  priceGel: number
  priceUsd: number
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
  priceGel,
  priceUsd,
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
  const [bookDatesDialog, setBookDatesDialog] = useState(false)

  const { currency } = useCurrency()

  const { t } = useTranslation()

  const { deleteProduct, activeProducts } = useProducts(filter)

  const queryClient = useQueryClient()

  const deleteProductMutation = useMutation(() => deleteProduct(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['companyProducts'])
      toast.custom(<Toast type='success' title={t('car_successfully_removed')} />)
    },
    onError: () => {
      toast.custom(<Toast type='error' title={t('error_try_again_later')} />)
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

  const toggleBookDatesDialog = () => setBookDatesDialog(!bookDatesDialog)

  return (
    <>
      <div className='relative border-b-1 border-raisin-10 last:border-none'>
        <div className='flex flex-col px-2 py-4 md:w-full justify-between gap-6 md:px-0 md:flex-row md:items-center'>
          <div className='flex gap-6 2xl:gap-6'>
            <div className='w-[80px] sm:w-[140px] md:w-[150px] 2xl:w-[250px]'>
              <Link href={`/details/${id}`}>
                <Carousel
                  itemsArray={images?.split(',')?.map((imgUrl, index) => (
                    <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden' key={index}>
                      <Image
                        src={imgUrl || ''}
                        alt={`${manufacturer} ${model} ${prodYear}`}
                        height='100%'
                        width='100%'
                        className='object-cover'
                        onError={(ev: any) => {
                          ev.target.src = `/icons/avatar.svg`
                        }}
                      />
                    </div>
                  ))}
                  type='card'
                />
              </Link>
            </div>
            <div className='w-full'>
              <Typography type='body' color='light'>
                {dynamicTranslateCities(startCity, t)}
              </Typography>
              <Link href={`/details/${id}`}>
                <Typography type='subtitle' className='text-sm md:text-2sm'>
                  {manufacturer} {model} {prodYear}
                </Typography>
                <div className='flex items-center md:min-w-[254px] justify-between gap-10 mt-4 md:mt-10'>
                  <Typography type='h4' weight='medium' color='dark' className='text-2sm md:text-3md'>
                    {currency === 'GEL'
                      ? removeExtraDecimalDigits(priceGel)
                      : removeExtraDecimalDigits(priceUsd)}{' '}
                    {currency === 'GEL' ? '₾' : '$'}
                    <span className='text-[14px] pl-3 font-normal text-center'>{t('day')}</span>
                  </Typography>
                  <Typography
                    type='subtitle'
                    className={`cursor-default py-1 px-2 rounded-lg text-sm md:text-2sm md:min-w-[120px] text-center ${
                      active ? 'text-white bg-green-100' : 'text-raisin-100 bg-grey-100'
                    }`}
                  >
                    {active ? t('active') : t('paused')}
                  </Typography>
                </div>
              </Link>
            </div>
          </div>
          <div className='hidden lg:flex gap-4'>
            <Action
              bg={active ? 'bg-raisin-10' : 'bg-green-10'}
              label={active ? t('stop') : t('play')}
              icon={active ? 'stop' : 'play'}
              onClick={toggleActivateProduct}
              disabled={activeProductMutation?.isLoading}
            />
            <Action bg='bg-raisin-10' label={t('hold_date')} icon='calendarSmall' onClick={toggleBookDatesDialog} />
            <Link href={`/dashboard/edit-product?id=${id}`} as={`/dashboard/edit-product?id=${id}`}>
              <Action bg='bg-raisin-10' label={t('edit')} icon='edit' />
            </Link>
            <Action
              bg='bg-raisin-10'
              label={t('remove')}
              icon='trash'
              onClick={toggleDeleteProductModal}
              disabled={deleteProductMutation.isLoading}
            />
          </div>
        </div>
        <ActionsPopover
          toggleDeleteProductModal={toggleDeleteProductModal}
          toggleBookDatesDialog={toggleBookDatesDialog}
          toggleActivateProduct={toggleActivateProduct}
          active={active}
          id={id}
        />
      </div>
      <DeleteProductConfirmationModal
        open={deleteProductModal}
        toggleModal={toggleDeleteProductModal}
        deleteCompany={deletProduct}
        productId={id}
      />
      <BookDatesDialog open={bookDatesDialog} setOpen={toggleBookDatesDialog} productId={id} />
    </>
  )
}

export default VehicleListComponent
