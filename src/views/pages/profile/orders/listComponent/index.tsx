import Icon from 'src/views/app/Icon'
import { IconButton } from 'src/views/components/button'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import { parseISO, format } from 'date-fns'
import { ka } from 'date-fns/locale'
import Divider from 'src/views/components/divider'
import {useTranslation} from "next-i18next";

interface Props {
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
  startAddress,
  startDate,
  startTime,
  endDate,
  endTime,
  productDetails,
  price,
  status
}) => {

  const {t} = useTranslation()

  return (
    <div>
      <div className='flex flex-col py-4 md:w-full gap-4 md:gap-10 md:flex-row md:items-center'>
        <div className='flex items-center gap-4 2xl:gap-6 md:w-5/12 shrink-0'>
          <div className='w-[64px] shrink-0'>
            <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
              {productDetails?.images && (
                <Image
                  src={productDetails?.images.split(',')[0]}
                  alt='orders'
                  height='100%'
                  width='100%'
                  className='object-cover'
                />
              )}
            </div>
          </div>
          <div>
            <Typography type='subtitle' className='text-md'>
              {productDetails?.manufacturer.title} {productDetails?.manufacturer_model?.title}
              {productDetails?.prod_year}
            </Typography>
            <Typography type='body' className='hidden md:flex'>
              {startAddress}
            </Typography>
            <Typography type='body' color='light' className='text-sm md:text-2sm'>
              {format(parseISO(startDate), 'd MMM yyyy', { locale: ka })}
              {' - '}
              {format(parseISO(`1970-01-01T${startTime}`), 'HH:mm')} -
              {format(parseISO(endDate), 'd MMM yyyy', { locale: ka })}
              {' - '}
              {format(parseISO(`1970-01-01T${endTime}`), 'HH:mm')}
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
              {status === 0 ? t('pending') : status === 1 ? t('approved') : status === 2 ? t('canceled') : ''}
            </Typography>
          </div>
          <IconButton icon='chevronWithBg' height={38} width={38} />
        </div>
      </div>
      <Divider />
    </div>
  )
}

export default OrderListComponent
