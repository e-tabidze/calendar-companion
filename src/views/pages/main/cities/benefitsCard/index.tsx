import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import { BenefitsCardContainer } from './styles'

interface Props {
  src: string
  title: string
  bodyText: string
}

const BenefitsCard = ({ src, title, bodyText }: Props) => {
  return (
    <BenefitsCardContainer>
      <Image src={src} alt='img'/>
      <Typography type='h5' weight='medium' className='text-green-100'>
        {title}
      </Typography>
      <Typography type='body' color='light' className='text-center'>
        {bodyText}
      </Typography>
    </BenefitsCardContainer>
  )
}

export default BenefitsCard
