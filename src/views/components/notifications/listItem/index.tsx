import Link from 'next/link'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'
import { parseISO, format } from 'date-fns'
import { ka } from 'date-fns/locale'
import {useTranslation} from "next-i18next";

interface Props {
  url: string
  notification: any
}

const ListItem: React.FC<Props> = ({ url, notification }) => {
  const {i18n} = useTranslation()

  return (
    <Link href={url} as={url}>
      <li>
        <div className='py-4 flex items-center justify-between border-t-1 border-raisin-10 relative'>
          {notification?.read_at === null && (
            <span className='w-2 h-2 rounded-full bg-orange-100 hover:bg-orange-110 transition-all absolute left-[-17px] top-8'></span>
          )}

          <div className='flex'>
            <span className='w-10 h-10 bg-grey-100 rounded-xl mr-4 flex items-center justify-center shrink-0'>
              <Icon svgPath={notification?.data?.icon} width={24} height={24} />
            </span>
            <div className='flex flex-col'>
              <Typography type='h5' className='text-2sm md:text-md font-medium text-raisin-100'>
                {notification?.data?.text}
              </Typography>
              <Typography type='subtitle' className='text-sm md:text-2sm font-normal text-raisin-100'>
                მართვის მოწმობის თეორიული და პრაქტიკული (მეორე ეტაპი) გამოცდის ჯავშანი. სატრასპორტო
              </Typography>
              <Typography type='subtitle' className='text-sm font-normal text-raisin-30'>
                {format(parseISO(notification?.created_at), 'd MMM yyyy HH:mm', i18n.language === 'ka' ? { locale: ka } : {})}
              </Typography>
            </div>
          </div>
          <button className='hidden sm:flex w-10 h-10 bg-grey-100 rounded-full ml-4 items-center justify-center shrink-0'>
            <Icon svgPath='chevron-right' width={20} height={20} className='fill-transparent' />
          </button>
        </div>
      </li>
    </Link>
  )
}

export default ListItem
