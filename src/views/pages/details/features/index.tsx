import Typography from 'src/views/components/typography'
import ProductFeature from '../productFeature'

interface Props {
  id: string
  singleProductDetails: any
}

const Features: React.FC<Props> = ({ id, singleProductDetails }) => {
  return (
    <div className='my-8' id={id}>
      <Typography type='h3' className="text-3md md:text-2lg">მახასიათებლები</Typography>
      <div className='mt-8 mb-11 grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <ProductFeature feature={`${singleProductDetails?.door_type?.title} კარი`} icon='briefcase' />
        <ProductFeature
          feature={`წამყვანი თვლები - ${singleProductDetails?.drive_tires?.title}`}
          icon='briefcase'
        />
        <ProductFeature feature={singleProductDetails?.fuel_type?.title} icon='briefcase' />
        <ProductFeature feature={`${singleProductDetails?.luggage_numbers || 0} ჩემოდანი`} icon='briefcase' />
        <ProductFeature
          feature={`გარბენი - ${singleProductDetails?.car_run} ${singleProductDetails?.measure}`}
          icon='briefcase'
        />
        <ProductFeature feature={`${singleProductDetails?.seat_type?.title} მგზავრი`} icon='briefcase' />
        <ProductFeature feature={singleProductDetails?.transmission_type?.title} icon='briefcase' />
      </div>
      <div className='mt-8 mb-11 grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {singleProductDetails?.product_additional_information?.map(
          (feature: { additional_information: { title: string }; icon: string; id: string | number }) => (
            <ProductFeature
              feature={feature?.additional_information?.title}
              icon='briefcase'
              key={feature.id}
            />
          )
        )}
      </div>
    </div>
  )
}

export default Features
