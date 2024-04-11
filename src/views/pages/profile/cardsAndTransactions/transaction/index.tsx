import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import { parseISO, format } from 'date-fns'
import { ka } from 'date-fns/locale'
import {useTranslation} from "next-i18next";

interface Props {
  date: string
  id: string
  price: string
  status: number
}

const Transaction: React.FC<Props> = ({ date, id, price, status }) => {
  const {t, i18n} = useTranslation()

  return (
    <div>
      <div className='flex items-center justify-between my-3'>
        <div className='flex flex-col md:gap-10 md:items-center md:flex-row'>
          <Typography className='min-w-[80px]' type='body' color='light'>
            {format(parseISO(date), 'd MMM yyyy', i18n.language === 'ka' ? { locale: ka } : {})}
          </Typography>
          <Typography className='min-w-[180px]' type='subtitle'>{t('order_id')}: #{id} </Typography>
          <Typography
            type='subtitle'
            className={`text-sm xl:text-2sm ${
              status === 0 ? 'text-yellow-100' : status === 1 ? 'text-green-100' : status === 2 ? 'text-orange-100' : ''
            }`}
          >
            {status === 0 ? t('pending') : status === 1 ? t('approved') : status === 2 ? t('canceled') : ''}
          </Typography>
        </div>
        <Typography type='h5'>-{price}₾</Typography>
      </div>
      <Divider />
    </div>
  )
}

export default Transaction
