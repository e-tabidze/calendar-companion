import { useWatch } from 'react-hook-form'
import useProfile from 'src/hooks/useProfile'
import Icon from 'src/views/app/Icon'
import { DefaultButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import { registerLocale } from 'react-datepicker'

import ka from 'date-fns/locale/ka'
import { format } from 'date-fns'

registerLocale('ka', ka)

interface Props {
  price: number
  dates: string
  days: number | null | undefined
  className?: string
  onClick: () => void
  handleDateChange?: () => void
  disabled: boolean
  changeDates: boolean
  services?: any
  image?: string
  year?: number
  manufacturer?: string
  model?: string
  companyId: number
  control: any
}

const PriceCalcCard: React.FC<Props> = ({
  price,
  dates,
  days,
  className,
  onClick,
  handleDateChange,
  disabled,
  changeDates = true,
  services,
  image,
  year,
  manufacturer,
  model,
  companyId,
  control
}) => {
  const { userInfo, activeCompanyId } = useProfile()

  console.log(services, 'services')

  console.log(userInfo, 'userInfo')

  console.log(activeCompanyId, 'activeCompanyId')

  console.log(companyId, 'companyId')

  const formState = useWatch({ control })

  return (
    <div className={`shadow-2xl w-full rounded-3xl pt-5 px-4 lg:px-6 pb-10 ${className}`}>
      {image && (
        <div className='flex items-center gap-8 mb-6 justify-between'>
          <div className='min-w-[45%]'>
            <Typography type='h3' className='font-bold'>
              {manufacturer} {model} {year}
            </Typography>
            <Typography type='body' className='text-2sm'>
              ან მსგავსი
            </Typography>
          </div>
          {image && (
            <div className='rounded-lg overflow-hidden'>
              <Image src={image} alt='' height={'100%'} width={'100%'} className='object-cover' />
            </div>
          )}
        </div>
      )}

      {image && (
        <div>
          <div className='flex items-center mt-4'>
            <Icon svgPath='booking-start' height={24} width={24} className='fill-transparent flex shrink-0' />
            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              {formState?.booking?.book_from?.length > 0 &&
                `${format(new Date(formState?.booking?.book_from), 'd MMM yyyy', { locale: ka })}`}
            </Typography>

            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              {formState?.start_time}
            </Typography>
            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              -
            </Typography>
            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              {formState?.start_address}
            </Typography>
          </div>

          <div className='flex items-center my-3'>
            <Icon svgPath='booking-stop' height={24} width={24} className='fill-transparent flex shrink-0' />
            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              {formState?.booking?.book_to?.length > 0 &&
                `${format(new Date(formState?.booking?.book_to), 'd MMM yyyy', { locale: ka })}`}
            </Typography>

            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              {formState?.end_time}
            </Typography>
            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              -
            </Typography>
            <Typography type='body' className='text-2sm ml-2 mb-3 lg:mb-0'>
              {formState?.end_address}
            </Typography>
          </div>

          <Divider className='my-7' />
        </div>
      )}

      <div className='flex items-center gap-2'>
        <Typography type='h3' className='font-bold'>
          {price} ₾
        </Typography>
        <Typography type='h5' weight='normal'>
          / დღე
        </Typography>
      </div>

      <div className='flex gap-3 lg:items-center mb-6 flex-col lg:flex-row'>
        <div className='flex gap-1'>
          <Typography type='body' className='text-2sm'>
            {dates}
          </Typography>
          <Typography type='body' color='light' className='text-2sm'>
            | {days} დღე
          </Typography>
        </div>
        {changeDates && (
          <button className='border border-raisin-100 rounded-[8px] px-2 py-1 text-sm' onClick={handleDateChange}>
            შეცვლა
          </button>
        )}
      </div>

      <div className='w-full h-px bg-raisin-10' />
      <Typography type='h5' weight='medium' className='mt-8 mb-5 font-bold'>
        ფასების დეტალები
      </Typography>

      <div className='flex gap-2 flex-col justify-between py-2 lg:items-center lg:flex-row'>
        <div className='flex gap-2'>
          <Typography type='body' className='text-raisin-100'>
            მანქანის ქირაობის საკომისიო
          </Typography>
          <Typography type='body' color='light'>
            | {days} დღე
          </Typography>
        </div>
        <Typography type='h5' weight='normal'>
          {days && days * price + ' ₾'}
        </Typography>
      </div>

      {services?.map((service: any) => (
        <div className='flex gap-2 flex-col justify-between py-2 lg:items-center lg:flex-row' key={service.id}>
          <div className='flex gap-2'>
            <Typography type='body' className='text-raisin-100'>
              {service?.title}
            </Typography>
            <Typography type='body' color='light'>
              | რაოდენობა: {service?.count}
            </Typography>
          </div>
          <Typography type='h5' weight='normal'>
            {service?.type_id == 1 ? service?.count * service?.price * days! : service?.count * service.price} ₾
          </Typography>
        </div>
      ))}

      <Divider className='my-7' />

      <div className='flex gap-2 flex-col justify-between pb-7 lg:items-center lg:flex-row'>
        <div className='flex gap-2'>
          <Typography type='h5' className='text-raisin-100 font-bold'>
            ჯამი
          </Typography>
        </div>
        {days && (
          <Typography type='h5' weight='normal' className='font-bold'>
            {days * price +
              (services
                ? services.reduce((accumulator: number, service: { type_id: number; count: number; price: number }) => {
                    if (service.type_id === 1) {
                      accumulator += service.count * service.price * days
                    } else {
                      accumulator += service.count * service.price
                    }

                    return accumulator
                  }, 0)
                : 0)}{' '}
            ₾
          </Typography>
        )}
      </div>

      {activeCompanyId === companyId || userInfo?.active_profile_id === userInfo?.UserID ? (
        <DefaultButton
          bg='bg-orange-100 hover:bg-orange-110 transition-all'
          text='ჯავშნის დაწყება'
          className='w-full'
          textColor='text-white'
          type='submit'
          onClick={onClick}
          disabled={days === null || disabled}
        />
      ) : null}
    </div>
  )
}

export default PriceCalcCard
