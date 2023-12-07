import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Icon from 'src/views/app/Icon'
import { IconButton } from 'src/views/components/button'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'

interface Props {
  toggleDetails: () => void
  startAddress: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  firstName: string
  lastName: string
  days: number
  productDetails: any
  price: number
  discount: number
}

const OrderListComponent: React.FC<Props> = ({
  toggleDetails,
  startAddress,
  startDate,
  startTime,
  endDate,
  endTime,
  firstName,
  lastName,
  days,
  productDetails,
  discount,
  price
}) => {
  const { width } = useWindowDimensions()

  console.log(productDetails, 'productDetails')

  return (
    <div className='border-b-1 border-raisin-10 last:border-none' onClick={toggleDetails}>
      <div className='flex flex-col px-2 py-4 md:w-full gap-10 md:px-0 md:flex-row md:items-center'>
        <div className='flex gap-4 2xl:gap-6 min-w-max'>
          <Image src='/images/car.png' alt='orders' height={48} width={64} className='rounded-lg object-cover' />
          <div className='min-w-max'>
            <Typography type='subtitle'>
              {' '}
              {productDetails?.manufacturer.title} {productDetails?.manufacturer_model?.title}{' '}
              {productDetails?.prod_year}{' '}
            </Typography>
            <Typography type='body'>{startAddress}</Typography>
            <Typography type='body' color='light'>
              {startDate} {startTime} - {endDate} {endTime}
            </Typography>
          </div>
        </div>
        <div className='flex flex-col items-baseline md:flex-row md:items-center justify-between w-none md:w-full'>
          <div className='flex gap-2 ml-[90px] md:mx-none md:w-max md:gap-6 2xl:gap-10 md:justify-between md:ml-0'>
            <Typography type='subtitle' className='hidden lg:inline-block'>
              {firstName} {lastName}
            </Typography>
            <Typography type='subtitle' className='hidden lg:inline-block'>
              დასდაკლება {discount} %
            </Typography>
            <Typography type='subtitle' className='hidden lg:inline-block'>
              {days} დღე
            </Typography>
            <Typography type='subtitle' className='flex items-center gap-2'>
              {price} <Icon svgPath='gel' width={14} height={14} />{' '}
            </Typography>
            <Typography type='subtitle' className='text-green-100'>
              აქტიური
            </Typography>
          </div>
          {width > 779 && <IconButton icon='/icons/chevronWithBg.svg' height={38} width={38} onClick={toggleDetails} />}
        </div>
      </div>
    </div>
  )
}

export default OrderListComponent
