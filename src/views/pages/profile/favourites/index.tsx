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
      {userFavourites?.map((favProduct: any) => (
        <ListComponent
          key={favProduct?.product_id}
          productId={favProduct?.product_id}
          manufacturer={favProduct?.manufacturer}
          year={favProduct?.year}
          model={favProduct?.model}
          city={favProduct?.start_city}
          price={favProduct?.price}
          isDeleted={favProduct?.product === null}
        />
      ))}
    </div>
  )
}

export default Favourites
