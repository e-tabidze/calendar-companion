import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import Transaction from './transaction'

const CardsAndTransactions = () => {
  const { width } = useWindowDimensions()
  
  return (
    <div className='px-5 md:px-10'>
      <div className='flex justify-between items-center my-10'>
        <Typography type='h3'>ბარათები და ტრანზაქციები</Typography>
        <IconTextButton
          label='ახალი ბარათი'
          icon='add'
          width={20}
          height={20}
          className='border border-raisin-10 h-8 px-4'
          onClick={() => console.log('CLICK')}
        />
      </div>
      <Divider />
      <div className='flex justify-between items-center my-7'>
        <Typography type='h3'>ჩემი შეკვეთები</Typography>
        <div className='flex gap-4 md:gap-8'>
          <IconTextButton label={width > 779 ? 'ფილტრი' : ''} icon='filters' width={22} height={20} />
          <IconTextButton label={width > 779 ? 'ძებნა' : ''} icon='sort' width={20} height={12} />
        </div>
      </div>
      <div>
        <Divider />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
      </div>
    </div>
  )
}

export default CardsAndTransactions
