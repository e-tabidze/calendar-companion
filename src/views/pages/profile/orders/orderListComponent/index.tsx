import Icon from 'src/views/app/Icon'
import { IconButton } from 'src/views/components/button'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import { parseISO, format } from 'date-fns'
import { ka } from 'date-fns/locale'
import Divider from 'src/views/components/divider'
import { useTranslation } from 'next-i18next'

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
  const { t, i18n } = useTranslation()

  return (
    <div>
      <div className='flex flex-wrap md:flex-nowrap py-4 md:w-full gap-4 md:gap-10 items-center'>
        <div className='flex items-center gap-4 2xl:gap-6 w-full md:w-6/12 shrink-0'>
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
              {format(parseISO(startDate), 'd MMM yyyy', i18n.language === 'ka' ? { locale: ka } : {})}
              {' - '}
              {format(parseISO(`1970-01-01T${startTime}`), 'HH:mm')} -
              {format(parseISO(endDate), 'd MMM yyyy', i18n.language === 'ka' ? { locale: ka } : {})}
              {' - '}
              {format(parseISO(`1970-01-01T${endTime}`), 'HH:mm')}
            </Typography>
          </div>
        </div>
        <Typography type='subtitle' className='flex items-center gap-2 md:w-2/12 pl-20 md:pl-0'>
          {price} <Icon svgPath='gel' width={14} height={14} />
        </Typography>
        <Typography
          type='subtitle'
          className={`text-sm xl:text-2sm md:w-4/12 lg:w-2/12 ${
            status === 0
              ? 'text-yellow-100'
              : status === 1
              ? 'text-raisin-100'
              : status === 2
              ? 'text-orange-100'
              : status === 5
              ? 'text-yellow-100'
              : status === 7
              ? 'text-red-120'
              : ''
          }`}
        >
          {status === 0
            ? t('pending')
            : status === 1
            ? t('approved')
            : status === 2
            ? t('canceled')
            : status === 5
            ? 'დაკავებული'
            : status === 7
            ? 'გაუქმებული'
            : ''}
        </Typography>

        <IconButton icon='chevronWithBg' height={38} width={38} className='md:w-1/12 flex justify-end ml-auto' />
      </div>
      <Divider />
    </div>
  )
}

export default OrderListComponent
