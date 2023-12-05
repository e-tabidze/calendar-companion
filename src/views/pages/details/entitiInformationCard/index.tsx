import Image from '../../../components/image'
import Review from '../../../components/review'
import Typography from '../../../components/typography'

interface Props {
  name: string
  entityProductsCount: number
}

const EntityInformationCard: React.FC<Props> = ({ name, entityProductsCount }) => {
  return (
    <div className='my-12 gap-8 flex items-center'>
      <div className='relative w-fit '>
        <Image src='/images/avatar.png' className='w-16 h-16 object-cover rounded-xl z-0' alt='' />
        {/*<Review className='absolute py-1 px-2 -bottom-4' review={4.89} size='normal' />*/}
      </div>
      <div>
        <Typography type='h5' weight='normal'>
          {name}
        </Typography>
        <Typography type='body' color='light'>
          {entityProductsCount} განცხადება
        </Typography>
      </div>
    </div>
  )
}

export default EntityInformationCard
