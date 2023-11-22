import Review from 'src/views/components/review'
import Typography from 'src/views/components/typography'
import ReviewCard from '../reviewCard.tsx'

interface Props {
  id: string
}

const Reviews: React.FC<Props> = ({ id }) => {
  return (
    <div id={id}>
      <Typography type='h3'>შეფასებები</Typography>
      <div className='flex items-center gap-5 mt-10 mb-5'>
        <Review review={4.5} size='large' />
        <Typography type='h5' weight='normal'>
          206 შეფასება
        </Typography>
      </div>

      <div className='flex overflow-scroll lg:grid grid-cols-1 lg:grid-cols-2 gap-4 mb-20'>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  )
}

export default Reviews
