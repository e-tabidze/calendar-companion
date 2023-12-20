import { DefaultButton } from 'src/views/components/button'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'

interface Props {
  title: string
  body: string
  actioBtnLabel: string
  actonBtnClick: () => void
  image: string
}

const  ActionCard = ({ title, body, actioBtnLabel, actonBtnClick, image }: Props) => {
  return (
    <div className='border bg-white flex justify-center pt-10 border-gray-90 rounded-[36px]'>
      <div className='flex flex-col items-center w-3/4'>
        <Typography type='h5' weight='medium'>
          {title}
        </Typography>
        <Typography type='body' color='light' className='mt-7 mb-5 text-center'>
          {body}
        </Typography>
        <DefaultButton bg='bg-orange-100' text={actioBtnLabel} onClick={actonBtnClick} textColor="text-white" />
        <Image src={image} className='w-full' alt='img'/>
      </div>
    </div>
  )
}

export default ActionCard
