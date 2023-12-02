import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'

interface Props {
  icon: string
  feature: string
  description?: string
  price?: string
}

const ProductFeature: React.FC<Props> = ({ icon, feature, description, price }) => {
  return (
    <div className='flex items-center gap-4'>
      <Icon svgPath={icon} width={20} height={20} />
      <div className='flex justify-between w-full lg:w-1/2'>
        <div>
          <Typography type='subtitle'>{feature}</Typography>
          <Typography type='body' color='light'>
            {description}
          </Typography>
        </div>
        <Typography type='subtitle'> {price} </Typography>
      </div>
    </div>
  )
}
export default ProductFeature
