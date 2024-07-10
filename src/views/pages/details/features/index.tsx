import ProductFeature from '../productFeature'
import dynamic from 'next/dynamic'
import {useTranslation} from "next-i18next";
import {dynamicTranslateAdditionalParameters, dynamicTranslateTag} from "src/utils/translationUtils";

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
        <ProductFeature feature={`${t('drive_wheels') + ' — ' + dynamicTranslateTag(singleProductDetails?.drive_tires?.title, t)}`} icon='feature' />
        <ProductFeature feature={dynamicTranslateTag(singleProductDetails?.fuel_type?.title,t)} icon='feature' />
        <ProductFeature feature={`${t('suitcase') + ' – ' + singleProductDetails?.luggage_numbers || 0 + t('suitcase')}`} icon='feature' />
        <ProductFeature
          feature={`${t('run') + ' — ' + singleProductDetails?.car_run} ${t(singleProductDetails?.measure)}`}
          icon='feature'
        />
        <ProductFeature feature={`${t('passenger') + ' – ' + singleProductDetails?.seat_type?.title}`} icon='feature' />
        <ProductFeature feature={dynamicTranslateTag(singleProductDetails?.transmission_type?.title,t)} icon='feature' />
          {singleProductDetails?.product_additional_information?.map(
              (feature: { additional_information: { title: string }; icon: string; id: string | number }) => (
                  <ProductFeature feature={dynamicTranslateAdditionalParameters(feature?.additional_information?.title, t)} icon='feature' key={feature.id} />
              )
          )}
      </div>
    </div>
  )
}

export default Features
