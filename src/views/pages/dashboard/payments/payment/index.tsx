import { parseISO, format } from 'date-fns'
import { ka } from 'date-fns/locale'
import dynamic from 'next/dynamic'
import {useTranslation} from "next-i18next";

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
  const {t} = useTranslation()

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
            <Typography type='subtitle'>{t('invoice')}: #{id} </Typography>
          </div>
          <div className='flex w-full md:w-1/2 justify-between'>
            <Typography
              type='subtitle'
              className={`text-sm xl:text-2sm ${
                status === 0 ? 'text-yellow-100' : status === 1 ? 'text-green-100' : status === 2 ? 'text-orange-100' : ''
              }`}
            >
              {status === 0 ? t('pending') : status === 1 ? t('approved') : status === 2 ? t('canceled') : ''}
            </Typography> 
          
          <Typography type='h5'>{price} ₾</Typography>
          </div>
      </div>
      <Divider />
    </div>
  )
}

export default Payment
