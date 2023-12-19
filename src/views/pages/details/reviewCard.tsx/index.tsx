import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import Icon from "src/views/app/Icon";

const ReviewCard = () => {
  return (
    <div className='pt-4 pl-4 pr-10 pb-8 border border-grey-90 rounded-2xl flex gap-4'>
      <Image src='/images/avatar.png' alt='' className='h-fit rounded-full' />
      <div>
        <Typography type='h5' weight='normal'>
          ზურაბ ფანასკერტელი
        </Typography>
        <div className='flex gap-2 mb-4'>
          <Icon svgPath='star' width={16} height={16}/>
          <Icon svgPath='star' width={16} height={16}/>
          <Icon svgPath='star' width={16} height={16}/>
          <Icon svgPath='star' width={16} height={16}/>
          <Icon svgPath='star' width={16} height={16}/>
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
