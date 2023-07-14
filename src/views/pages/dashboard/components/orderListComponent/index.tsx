import Image from 'next/image'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { IconButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'

interface Props {
  toggleDetails: () => void
}

const OrderListComponent: React.FC<Props> = ({ toggleDetails }) => {
  const { width } = useWindowDimensions()

  return (
    <div className='' onClick={toggleDetails}>
      <div className='flex flex-col px-2 py-4 large:w-full gap-6 large:px-0 large:flex-row large:items-center'>
        <div className='flex gap-6 min-w-max'>
          <Image src='/images/car.png' alt='' height={48} width={64} className='rounded-lg object-cover' />
          <div className='min-w-max'>
            <Typography type='subtitle'>Mercedes E Class 2022</Typography>
            <Typography type='body'>ნ. ყიფშიძის ქუჩა 10</Typography>
            <Typography type='body' color='light'>
              ივნ 22, 2022 - 14:00 - ივლ 17, 2022 - 16:00
            </Typography>
          </div>
        </div>
        <div className='flex flex-col items-baseline large:flex-row large:items-center justify-between w-none large:w-full'>
          <div className='flex gap-2 ml-[90px] large:mx-none large:w-max large:gap-10 large:justify-between large:ml-0'>
            <Typography type='subtitle' className='hidden laptop:inline-block'>
              მერი კვინიკაური
            </Typography>
            <Typography type='subtitle' className='hidden laptop:inline-block'>
              100$
            </Typography>
            <Typography type='subtitle' className='hidden laptop:inline-block'>
              5 დღე
            </Typography>
            <Typography type='subtitle'>500$</Typography>
            <Typography type='subtitle' className='text-green-100'>
              აქტიური
            </Typography>
          </div>
          {width > 779 && <IconButton icon='/icons/chevronWithBg.svg' height={38} width={38} onClick={toggleDetails} />}
        </div>
      </div>
      <Divider />
    </div>
  )
}

export default OrderListComponent
