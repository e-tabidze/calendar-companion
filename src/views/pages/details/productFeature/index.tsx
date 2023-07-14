import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'

interface Props {
  icon: string
  feature: string
}

const ProductFeature = ({ icon, feature }: Props) => {
  return (
    <div className='flex items-center gap-4'>
      <Image src={icon} alt='feature' className='w-5 h-5' />
      <Typography type='subtitle'>{feature}</Typography>
    </div>
  )
}
export default ProductFeature
