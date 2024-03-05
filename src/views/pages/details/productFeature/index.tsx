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
    <div className='flex items-center justify-between gap-2'>
      <Icon svgPath={icon} width={24} height={24} />
      <div className='flex justify-between w-full'>
        <div className='flex w-1/2'>
          <Typography type='subtitle'>{feature}</Typography>
          <Typography type='body' color='light'>
            {description}
          </Typography>
        </div>
        <div className='w-1/2'>
        <Typography type='subtitle'> {price} </Typography>
        </div>
        
      </div>
    </div>
  )
}
export default ProductFeature
