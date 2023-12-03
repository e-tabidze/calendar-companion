import Typography from 'src/views/components/typography'
import ProductFeature from '../productFeature'

interface Props {
  id: string
  singleProductDetails: any
}

const Features: React.FC<Props> = ({ id, singleProductDetails }) => {
  return (
    <div className='my-8' id={id}>
      <Typography type='h3'>მახასიათებლები</Typography>
      <div className='mt-8 mb-11 grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <ProductFeature feature={`${singleProductDetails?.door_type?.title} კარი`} icon='printer' />
        <ProductFeature
          feature={`წამყვანი თვლები - ${singleProductDetails?.drive_tires?.title}`}
          icon='printer'
        />
        <ProductFeature feature={singleProductDetails?.fuel_type?.title} icon='printer' />
        <ProductFeature feature={`${singleProductDetails?.luggage_numbers || 0} ჩემოდანი`} icon='printer' />
        <ProductFeature
          feature={`გარბენი - ${singleProductDetails?.car_run} ${singleProductDetails?.measure}`}
          icon='printer'
        />
        <ProductFeature feature={`${singleProductDetails?.seat_type?.title} მგზავრი`} icon='printer' />
        <ProductFeature feature={singleProductDetails?.transmission_type?.title} icon='printer' />
      </div>
      <div className='mt-8 mb-11 grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {singleProductDetails?.product_additional_information?.map(
          (feature: { additional_information: { title: string }; icon: string; id: string | number }) => (
            <ProductFeature
              feature={feature?.additional_information?.title}
              icon='printer'
              key={feature.id}
            />
          )
        )}
      </div>
    </div>
  )
}

export default Features
