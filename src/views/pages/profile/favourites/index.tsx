import useFavourites from 'src/hooks/useFavourites'
import { IconTextButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'
import ListComponent from './listComponent'

const Favourites = () => {
  const { userFavourites } = useFavourites()

  return (
    <div className='p-2 md:p-10 md:border border-raisin-10 rounded-3xl'>
      <div className='flex justify-between items-center'>
        <Typography type='h3'>ფავორიტები</Typography>
        <div className='flex'>
          <IconTextButton label={'ძებნა'} icon={'/icons/sort.svg'} />
        </div>
      </div>
      {userFavourites?.map((favProduct: any) => (
        <ListComponent key={favProduct.product_id} productId={favProduct.product_id} />
      ))}
    </div>
  )
}

export default Favourites
