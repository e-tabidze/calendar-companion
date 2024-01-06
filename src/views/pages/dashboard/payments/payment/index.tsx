import { parseISO, format } from 'date-fns'
import { ka } from 'date-fns/locale'
import dynamic from 'next/dynamic'

const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })

interface Props {
  firstName: string
  lastName: string
  date: string
  id: string
  price: string
  status: number
}

const Payment: React.FC<Props> = ({ firstName, lastName, date, id, price, status }) => {
  return (
    <div>
        <div className='flex flex-col md:gap-10 md:items-center md:flex-row my-3 items-center justify-between'>
          <div className='flex w-full md:w-1/2 justify-between'>
            <Typography type='subtitle'>
              {firstName} {lastName}
            </Typography>

            <Typography type='body' color='light'>
              {format(parseISO(date), 'd MMM yyyy', { locale: ka })}
            </Typography>
            <Typography type='subtitle'>ინვოისი: #{id} </Typography>
          </div>
          <div className='flex w-full md:w-1/2 justify-between'>
            <Typography
              type='subtitle'
              className={`text-sm xl:text-2sm ${
                status === 0 ? 'text-yellow-100' : status === 1 ? 'text-green-100' : status === 2 ? 'text-orange-100' : ''
              }`}
            >
              {status === 0 ? 'მოლოდინში' : status === 1 ? 'დადასტურებული' : status === 2 ? 'გაუქმებული' : ''}
            </Typography> 
          
          <Typography type='h5'>{price} ₾</Typography>
          </div>
      </div>
      <Divider />
    </div>
  )
}

export default Payment
