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
  productDetails: any
  price: number
  status: number
}

const OrderListComponent: React.FC<Props> = ({
  toggleDetails,
  startAddress,
  startDate,
  startTime,
  endDate,
  endTime,
  productDetails,
  price,
  status
}) => {
  const { width } = useWindowDimensions()

  console.log(productDetails, 'productDetails')

  return (
    <div className='border-b-1 border-raisin-10 last:border-none' onClick={toggleDetails}>
      <div className='flex flex-col py-4 md:w-full gap-4 md:gap-10 md:flex-row md:items-center'>
        <div className='flex items-center gap-4 2xl:gap-6'>
          <Image src='/images/car.png' alt='orders' height={48} width={64} className='rounded-lg object-cover h-min' />
          <div className=''>
            <Typography type='subtitle' className='text-md'>
              {productDetails?.manufacturer.title} {productDetails?.manufacturer_model?.title}
              {productDetails?.prod_year}
            </Typography>
            <Typography type='body' className='hidden md:flex'>{startAddress}</Typography>
            <Typography type='body' color='light' className='text-sm md:text-2sm'>
              {startDate} {startTime} - {endDate} {endTime}
            </Typography>
          </div>
        </div>
        <div className='flex flex-col items-baseline md:flex-row md:items-center justify-between w-none md:w-full'>
          <div className='flex items-center gap-2 ml-[90px] md:mx-none md:w-max md:gap-6 2xl:gap-10 md:justify-between md:ml-0'>
            <Typography type='subtitle' className='flex items-center gap-2'>
              {price} <Icon svgPath='gel' width={14} height={14} />
            </Typography>
            <Typography
              type='subtitle'
              className={`text-sm md:text-2sm ${
                status === 0
                  ? 'text-yellow-100'
                  : status === 1
                  ? 'text-green-100'
                  : status === 2
                  ? 'text-orange-100'
                  : ''
              }`}
            >
              {status === 0 ? 'მოლოდინში' : status === 1 ? 'დადასტურებული' : status === 2 ? 'გაუქმებული' : ''}
            </Typography>
          </div>
          {width > 779 && <IconButton icon='chevronWithBg' height={38} width={38} onClick={toggleDetails} />}
        </div>
      </div>
    </div>
  )
}

export default OrderListComponent
