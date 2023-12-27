import useFavourites from 'src/hooks/useFavourites'
import Typography from 'src/views/components/typography'
import ListComponent from './listComponent'
import Divider from "src/views/components/divider";

const Favourites = () => {
  const { userFavourites } = useFavourites()

  console.log(userFavourites, 'userFavourites')

  return (
    <div className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl'>
      <Typography type='h3' className='text-md md:text-2lg mb-6'>ფავორიტები</Typography>
      <Divider/>
      {userFavourites?.map((product: any) => (
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
        />
      ))}
    </div>
  )
}

export default Favourites
