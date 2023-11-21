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
        <ProductFeature feature={`${singleProductDetails?.door_type?.title} კარი`} icon='/icons/printer.svg' />
        <ProductFeature
          feature={`წამყვანი თვლები - ${singleProductDetails?.drive_tires?.title}`}
          icon='/icons/printer.svg'
        />
        <ProductFeature feature={singleProductDetails?.fuel_type?.title} icon='/icons/printer.svg' />
        <ProductFeature feature={`${singleProductDetails?.luggage_numbers || 0} ჩემოდანი`} icon='/icons/printer.svg' />
        <ProductFeature
          feature={`გარბენი - ${singleProductDetails?.car_run} ${singleProductDetails?.measure}`}
          icon='/icons/printer.svg'
        />
        <ProductFeature feature={`${singleProductDetails?.seat_type?.title} მგზავრი`} icon='/icons/printer.svg' />
        <ProductFeature feature={singleProductDetails?.transmission_type?.title} icon='/icons/printer.svg' />
      </div>
    </div>
  )
}

export default Features
