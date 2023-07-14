import Image from '../image'
import Typography from '../typography'

interface Props {
  border?: boolean
  category: string
  selected?: boolean
  handleSelect?: any
}

const CategoryCard = ({ border, category, selected, handleSelect }: Props) => {
  return (
    <div
      onClick={handleSelect}
      className={`flex flex-col items-center justify-center cursor-pointer p-4 w-28 h-28 tablet:w-36 tablet:h-36 ${
        border && 'border border-gray-20 rounded-2xl'
      } ${selected ? 'border-2 border-green-100 bg-green-20' : ''} `}
    >
      <Image src='/icons/vehicleCategory.svg' className='h-5' alt='img' />
      <Typography type='body' color='dark' className='mt-4'>
        {category}
      </Typography>
      <Typography type='body' color={selected ? 'dark' : 'light'} className='text-md font-light'>
        177
      </Typography>
    </div>
  )
}

export default CategoryCard
