// import Review from '../../../components/review'
import dynamic from 'next/dynamic'
import {useTranslation} from "next-i18next";

const Image = dynamic(() => import('../../../components/image'), { ssr: true })
const Typography = dynamic(() => import('../../../components/typography'), { ssr: false })
interface Props {
  name: string
  entityProductsCount: number
  logoUrl: string
}

const EntityInformationCard: React.FC<Props> = ({ name, entityProductsCount, logoUrl }) => {
    const {t} = useTranslation()

  return (
    <div className='my-12 gap-6 md:gap-8 flex items-center'>
      <div className='relative shadow-sm w-16 h-16 rounded-xl z-0 overflow-hidden'>
        <Image src={logoUrl} className='w-full h-full object-cover' alt='' />
        {/*<Review className='absolute py-1 px-2 -bottom-4' review={4.89} size='normal' />*/}
      </div>
      <div>
        <Typography type='h5' weight='normal'>
          {name}
        </Typography>
        <Typography type='body' color='light'>
          {entityProductsCount} {t('ads')}
        </Typography>
      </div>
    </div>
  )
}

export default EntityInformationCard
