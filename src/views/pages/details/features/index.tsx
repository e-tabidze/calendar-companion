import ProductFeature from '../productFeature'
import dynamic from 'next/dynamic'
import {useTranslation} from "next-i18next";

const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })

interface Props {
  id?: string
  singleProductDetails: any
}

const Features: React.FC<Props> = ({ id, singleProductDetails }) => {
    const {t} = useTranslation()

  return (
    <div className='mb-8' id={id}>
      <Typography type='h3' className='text-3md md:text-2lg'>
          {t('features')}
      </Typography>
      <div className='mt-8 mb-11 grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <ProductFeature feature={`${singleProductDetails?.door_type?.title + ' ' + t('door')}`} icon='feature' />
        <ProductFeature feature={`${t('drive_wheels') + ' - ' + singleProductDetails?.drive_tires?.title}`} icon='feature' />
        <ProductFeature feature={singleProductDetails?.fuel_type?.title} icon='feature' />
        <ProductFeature feature={`${singleProductDetails?.luggage_numbers || 0 + t('suitcase')}`} icon='feature' />
        <ProductFeature
          feature={`${t('run') + ' - ' + singleProductDetails?.car_run} ${singleProductDetails?.measure}`}
          icon='feature'
        />
        <ProductFeature feature={`${singleProductDetails?.seat_type?.title + ' ' + t('passenger')}`} icon='feature' />
        <ProductFeature feature={singleProductDetails?.transmission_type?.title} icon='feature' />
          {singleProductDetails?.product_additional_information?.map(
              (feature: { additional_information: { title: string }; icon: string; id: string | number }) => (
                  <ProductFeature feature={feature?.additional_information?.title} icon='feature' key={feature.id} />
              )
          )}
      </div>
    </div>
  )
}

export default Features
