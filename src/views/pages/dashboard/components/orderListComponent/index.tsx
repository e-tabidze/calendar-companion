import { IconButton } from 'src/views/components/button'
import { parseISO, format } from 'date-fns'
import { ka } from 'date-fns/locale'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'

const Image = dynamic(() => import('src/views/components/image'), { ssr: false })
const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })

interface Props {
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
  startAddress,
  startDate,
  startTime,
  endDate,
  endTime,
  firstName,
  lastName,
  days,
  productDetails,

  // discount,
  price,
  status
}) => {
  const { t, i18n } = useTranslation()

  return (
    <div className='last:border-none'>
      <div className='md:pr-20 relative flex flex-wrap md:flex-nowrap px-2 py-4 md:w-full gap-4 2xl:gap-10 md:px-0  md:items-center'>
        <div className='flex items-center gap-4 2xl:gap-6 w-full md:w-6/12 lg:w-5/12 shrink-0'>
          <div className='w-[64px] shrink-0'>
            <div className='aspect-w-16 aspect-h-12 rounded-lg overflow-hidden'>
              <Image
                src={productDetails?.images?.split(',')[0]}
                alt={productDetails?.manufacturer?.title}
                height='100%'
                width='100%'
                className='object-cover'
                onError={(ev: any) => {
                  ev.target.src = `/icons/avatar.svg`
                }}
              />
            </div>
          </div>
          <div>
            <Typography type='subtitle' className='text-md'>
              {productDetails?.manufacturer.title} {productDetails?.manufacturer_model?.title}{' '}
              {productDetails?.prod_year}
            </Typography>
            <Typography type='body' className='hidden md:flex text-sm mt-1'>
              {startAddress}
            </Typography>
            {startDate && endDate && (
              <Typography type='body' color='light' className='text-sm'>
                {format(parseISO(startDate), 'd MMM yyyy', i18n.language === 'ka' ? { locale: ka } : {})}
                {' - '}
                {format(parseISO(`1970-01-01T${startTime}`), 'HH:mm')} - {'  '}
                {format(parseISO(endDate), 'd MMM yyyy', i18n.language === 'ka' ? { locale: ka } : {})}
                {' - '}
                {format(parseISO(`1970-01-01T${endTime}`), 'HH:mm')}
              </Typography>
            )}
          </div>
        </div>
        <Typography type='subtitle' className='hidden lg:inline-flex text-sm xl:text-2sm lg:w-3/12'>
          {firstName} {lastName}
        </Typography>

        {/* <Typography type='subtitle' className='hidden lg:inline-flex text-sm xl:text-2sm'>
              ფასდაკლება {discount} %
            </Typography> */}
        <Typography type='subtitle' className='hidden lg:inline-flex text-sm xl:text-2sm lg:w-1/12'>
          {days} {t('day')}
        </Typography>
        <Typography type='subtitle' className='flex items-center gap-2 md:w-3/12 lg:w-1/12 pl-20 md:pl-0'>
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
        <div className='hidden md:flex absolute right-0'>
          <IconButton icon='chevronWithBg' height={38} width={38} />
        </div>
      </div>
    </div>
  )
}

export default OrderListComponent
