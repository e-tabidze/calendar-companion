import Typography from 'src/views/components/typography'
import { BenefitsCardContainer } from './styles'
import Icon from "src/views/app/Icon";

interface Props {
  icon: string
  title: string
  bodyText: string
  width: number
  height: number
}

const BenefitsCard = ({ icon, width, height, title, bodyText }: Props) => {
  return (
    <BenefitsCardContainer>
        <Icon svgPath={icon} width={width} height={height}/>
      <Typography type='h5' weight='medium' className='text-md lg:text-[22px] text-green-100'>
        {title}
      </Typography>
      <Typography type='body' color='light' className='text-sm text-center'>
        {bodyText}
      </Typography>
    </BenefitsCardContainer>
  )
}

export default BenefitsCard
