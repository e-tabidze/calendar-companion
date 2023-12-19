import useProfile from 'src/hooks/useProfile'
import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'

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
  services
}) => {
  const { userInfo } = useProfile()

  console.log(services, 'services')

  return (
    <div className={`shadow-2xl w-full rounded-3xl pt-5 px-4 lg:px-6 pb-10 ${className}`}>
      <div className='flex items-center gap-2'>
        <Typography type='h3' className='font-bold'>
          {price} ₾
        </Typography>
        <Typography type='h5' weight='normal'>
          / დღე
        </Typography>
      </div>
      <Typography type='body' className='text-green-100 mb-8'>
        Free cancellation
      </Typography>

      <div className='flex gap-3 lg:items-center mb-6 flex-col lg:flex-row'>
        <div className='flex gap-2'>
          <Typography type='body' className='text-2sm'>
            {dates}
          </Typography>
          <Typography type='body' color='light' className='text-2sm'>
            | {days} დღე
          </Typography>
        </div>
        {changeDates && (
          <button className='border border-raisin-100 rounded-xl p-1 text-sm' onClick={handleDateChange}>
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

      <div className='w-full h-px bg-raisin-10 my-7' />

      <div className='flex gap-2 flex-col justify-between pb-7 lg:items-center lg:flex-row'>
        <div className='flex gap-2'>
          <Typography type='h5' className='text-raisin-100 font-bold'>
            ჯამი
          </Typography>
        </div>
        <Typography type='h5' weight='normal' className='font-bold'>
          {services?.reduce((accumulator: number, service: { type_id: number; count: number; price: number }) => {
            if (service.type_id === 1) {
              accumulator += service.count * service.price * days!
            } else {
              accumulator += service.count * service.price
            }
            
            return accumulator
          }, 0) +
            price * days!}
        </Typography>
      </div>

      {userInfo?.active_profile_id === userInfo?.UserID && (
        <DefaultButton
          bg='bg-orange-100'
          text='ჯავშნის დაწყება'
          className='w-full'
          textColor='text-white'
          type='submit'
          onClick={onClick}
          disabled={days === null || disabled}
        />
      )}
    </div>
  )
}

export default PriceCalcCard
