import { IconTextButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'
import ListComponent from './listComponent'

const Favourites = () => {
  return (
    <div className='p-2 sm:p-4'>
      <div className='flex justify-between items-center'>
        <Typography type='h3'>ფავორიტები</Typography>
        <div className='flex'>
          <IconTextButton label={'ძებნა'} icon={'/icons/sort.svg'} />
        </div>
      </div>
      <ListComponent />
      <ListComponent />
      <ListComponent />
      <ListComponent />
      <ListComponent />
      <ListComponent />
    </div>
  )
}

export default Favourites
