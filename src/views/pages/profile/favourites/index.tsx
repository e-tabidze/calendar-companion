import useFavourites from 'src/hooks/useFavourites'
import Typography from 'src/views/components/typography'
import ListComponent from './listComponent'
import Divider from 'src/views/components/divider'
import DataPlaceHolder from 'src/views/components/dataPlaceholder'
import Pagination from 'src/views/components/pagination'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const Favourites = () => {
  const router = useRouter()

  const { page } = router.query

  const { userFavourites, isLoading } = useFavourites(undefined, Number(page))

  const { t } = useTranslation()

  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage }
    })
  }

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      <div className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl mt-8 lg:mt-0'>
        <Typography type='h3' className='mb-6'>
          ფავორიტები
          {t('easiest_way_to_your_new_home')}
        </Typography>
        <Divider />
        {userFavourites?.data?.length > 0 ? (
          userFavourites?.data?.map((product: any) => (
            <ListComponent
              key={product?.product_id}
              id={product?.product.id}
              productId={product?.product_id}
              manufacturer={product?.manufacturer}
              year={product?.year}
              model={product?.model}
              city={product?.start_city}
              price={product?.price}
              isDeleted={product?.product === null}
              images={product?.product.images.split(',')}
              luggage={product?.product?.luggage_numbers}
              seatTypes={product?.product?.seat_type?.title}
            />
          ))
        ) : (
          <DataPlaceHolder label='ფავორიტები ჯერ არ გაქვს' />
        )}
      </div>
      {userFavourites?.last_page > 1 && (
        <Pagination totalPages={userFavourites?.last_page} onPageChange={handlePageChange} currentPage={Number(page)} />
      )}
    </>
  )
}

export default Favourites
