import useNotifications from 'src/hooks/useNotifications'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'
import { parseISO, format } from 'date-fns'
import { ka } from 'date-fns/locale'
import { useRouter } from 'next/router'
import {useTranslation} from "next-i18next";

interface Props {
  id: string
  company: string
}

const Details: React.FC<Props> = ({ id, company }) => {
  const { notifictionDetails } = useNotifications(String(id), String(company))
  const router = useRouter()
  const {t} = useTranslation()

  return (
    <div className='border mt-6 md:mt-0 border-raisin-10 rounded-2xl md:rounded-3xl p-6 md:py-10 md:px-8'>
      <div onClick={() => router.back()} className='flex items-center mb-12 cursor-pointer'>
        <div className='flex w-10 h-10 bg-grey-100 rounded-full mr-4 items-center justify-center shrink-0'>
          <Icon svgPath='chevron-left' width={20} height={20} className='fill-transparent' />
        </div>
        <Typography type='h3' className='font-bold md:font-normal text-sm md:text-2sm'>
          {t('messages')}
        </Typography>
      </div>
      <div className=''>
        <div className='flex items-center'>
          <span className='w-14 h-14 bg-grey-100 rounded-xl mr-6 flex items-center justify-center shrink-0'>
            <Icon svgPath={notifictionDetails?.data?.icon} width={24} height={24} />
          </span>
          <div className='flex flex-col'>
            <Typography type='subtitle' className='text-sm font-normal text-raisin-30'>
              {notifictionDetails &&
                format(parseISO(notifictionDetails?.created_at), 'd MMM yyyy HH:mm', { locale: ka })}
            </Typography>
            <Typography type='h5' className='text-2sm md:text-md font-medium text-raisin-100'>
              {notifictionDetails?.data?.text}
            </Typography>
          </div>
        </div>
        <div className='pl-20'>
          <Typography type='body' className=' text-sm md:text-2sm font-normal text-raisin-100'>
            თუ სტუმრობისას პრობლემა შეგექმნებათ, საშუალება გექნებათ, სთხოვოთ მასპინძელს მისი მოგვარება, თანხის
            ნაწილობრივ დაბრუნება ან ჯავშნის გაუქმება თანხის სრულად დაბრუნებით. მოთხოვნის გადაგზავნა აუცილებელია
            პრობლემის აღმოჩენიდან 24 საათის განმავლობაში, რის შემდეგაც მასპინძელს გამოხმაურებისთვის 1 საათი ექნება. თუ
            მასპინძელი უარყოფს მოთხოვნას, ან არ გამოგეხმაურებათ, დახმარებისთვის შეძლებთ Airbnb‑ს მიმართოთ. გადადით
            სტუმრობებზე და აირჩიეთ სტუმრობა, რომლის გაუქმებაც გსურთ დაწკაპუნებით აირჩიეთ სტუმრობის სხვა გეგმები, შემდეგ
            კი — დეტალურად დაწკაპუნებით აირჩიეთ შეცვლა ან გაუქმება დაწკაპუნებით აირჩიეთ ჯავშნის გაუქმება თუ სტუმრობისას
            პრობლემა შეგექმნებათ, საშუალება გექნებათ, სთხოვოთ მასპინძელს მისი მოგვარება, თანხის ნაწილობრივ დაბრუნება ან
            ჯავშნის გაუქმება თანხის სრულად დაბრუნებით. მოთხოვნის გადაგზავნა აუცილებელია პრობლემის აღმოჩენიდან 24 საათის
            განმავლობაში, რის შემდეგაც მასპინძელს გამოხმაურებისთვის 1 საათი ექნება. თუ მასპინძელი უარყოფს მოთხოვნას, ან
            არ გამოგეხმაურებათ, დახმარებისთვის შეძლებთ Airbnb‑ს მიმართოთ. გადადით სტუმრობებზე და აირჩიეთ სტუმრობა,
            რომლის გაუქმებაც გსურთ დაწკაპუნებით აირჩიეთ სტუმრობის სხვა გეგმები, შემდეგ კი — დეტალურად დაწკაპუნებით
            აირჩიეთ შეცვლა ან გაუქმება დაწკაპუნებით აირჩიეთ ჯავშნის გაუქმება
          </Typography>
          <button className='mt-10 flex px-8 h-14 bg-green-100 text-white text-sm md:text-2sm rounded-xl items-center justify-center'>
            ჯავშნის ნახვა
          </button>
        </div>
      </div>
    </div>
  )
}

export default Details
