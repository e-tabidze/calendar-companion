import useFavourites from 'src/hooks/useFavourites'
import Typography from 'src/views/components/typography'
import ListComponent from './listComponent'
import Divider from 'src/views/components/divider'
import DataPlaceHolder from 'src/views/components/dataPlaceholder'

const Favourites = () => {
  const { userFavourites, isLoading } = useFavourites()

  console.log(userFavourites, 'userFavourites')

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl mt-8 lg:mt-0'>
      <Typography type='h3' className='mb-6'>
        ფავორიტები
      </Typography>
      <Divider />
      {userFavourites?.length > 0 ? (
        userFavourites?.map((product: any) => (
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
  )
}

export default Favourites
