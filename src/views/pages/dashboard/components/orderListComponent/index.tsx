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
  status: number
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
  price,
  status
}) => {
  const { width } = useWindowDimensions()

  console.log(productDetails, 'productDetails')

  return (
    <div className='border-b-1 border-raisin-10 last:border-none' onClick={toggleDetails}>
      <div className='flex flex-col px-2 py-4 md:w-full gap-4 xl:gap-10 md:px-0 md:flex-row md:items-center'>
        <div className='flex items-center gap-4 2xl:gap-6'>
          <div className="w-[64px] shrink-0">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <Image src='/images/car.png' alt='orders' height={'100%'} width={'100%'} className='object-cover' />
            </div>
          </div>
          <div>
            <Typography type='subtitle' className="text-md">
              {productDetails?.manufacturer.title} {productDetails?.manufacturer_model?.title}
              {productDetails?.prod_year}
            </Typography>
            <Typography type='body' className='hidden md:flex text-sm xl:text-2sm'>{startAddress}</Typography>
            <Typography type='body' color='light' className='text-sm'>
              {startDate} {startTime} - {endDate} {endTime}
            </Typography>
          </div>
        </div>
        <div className='flex flex-col items-baseline md:flex-row md:items-center justify-between w-none md:w-full'>
          <div className='flex items-center gap-2 ml-[90px] md:mx-none md:w-max md:gap-4 2xl:gap-10 md:justify-between md:ml-0'>
            <Typography type='subtitle' className='hidden lg:inline-flex text-sm xl:text-2sm'>
              {firstName} {lastName}
            </Typography>
            <Typography type='subtitle' className='hidden lg:inline-flex text-sm xl:text-2sm'>
              ფასდაკლება {discount} %
            </Typography>
            <Typography type='subtitle' className='hidden lg:inline-flex text-sm xl:text-2sm'>
              {days} დღე
            </Typography>
            <Typography type='subtitle' className='flex items-center gap-2'>
              {price} <Icon svgPath='gel' width={14} height={14} />
            </Typography>
            <Typography
              type='subtitle'
              className={`text-sm xl:text-2sm ${
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
          {width > 779 && <IconButton icon='chevronWithBg' height={38} width={38} onClick={toggleDetails} className="ml-4" />}
        </div>
      </div>
    </div>
  )
}

export default OrderListComponent
