import useFavourites from 'src/hooks/useFavourites'
import Typography from 'src/views/components/typography'
import ListComponent from './listComponent'

const Favourites = () => {
  const { userFavourites } = useFavourites()

  console.log(userFavourites, 'userFavourites')

  return (
    <div className='p-2 md:p-10 md:border border-raisin-10 rounded-3xl'>
      <div className='flex justify-between items-center'>
        <Typography type='h3'>ფავორიტები</Typography>

        {/* <div className='flex'>
          <IconTextButton label={'ძებნა'} icon='sort' width={20} height={12}  />
        </div> */}
      </div>
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
