import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'

const ReviewCard = () => {
  return (
    <div className='pt-4 pl-4 pr-10 pb-8 border border-grey-90 rounded-2xl flex gap-4'>
      <Image src='/images/avatar.png' alt='' className='h-fit rounded-full' />
      <div>
        <Typography type='h5' weight='normal'>
          ზურაბ ფანასკერტელი
        </Typography>
        <div className='flex gap-2 mb-4'>
          <Image src='/icons/star.svg' alt='' />
          <Image src='/icons/star.svg' alt='' />
          <Image src='/icons/star.svg' alt='' />
          <Image src='/icons/star.svg' alt='' />
          <Image src='/icons/star.svg' alt='' />
        </div>
        <Typography type='body' color='light'>
          sdfghjkl
        </Typography>
        <Typography type='body' color='dark'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore saepe quod voluptas amet sint iste qui
          deleniti?
        </Typography>
      </div>
    </div>
  )
}

export default ReviewCard
