// import Review from '../../../components/review'
import dynamic from 'next/dynamic'

const Image = dynamic(() => import('../../../components/image'), { ssr: true })
const Typography = dynamic(() => import('../../../components/typography'), { ssr: false })
interface Props {
  name: string
  entityProductsCount: number
}

const EntityInformationCard: React.FC<Props> = ({ name, entityProductsCount }) => {
  return (
    <div className='my-12 gap-6 md:gap-8 flex items-center'>
      <div className='relative w-fit shadow-sm rounded-xl w-16 h-16 rounded-xl z-0 overflow-hidden'>
        <Image src='/images/avatar.png' className='w-full h-full object-cover' alt='' />
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
