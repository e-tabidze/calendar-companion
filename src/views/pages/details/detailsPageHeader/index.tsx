import Icon from 'src/views/app/Icon'
import { ActionsWrapper, DetailsHeader } from './styles'

const DetailsPageHeader = () => {
  return (
    <DetailsHeader>
      <div>breadcrumbs</div>
      <ActionsWrapper>
        <Icon svgPath='printer.svg' width={20} height={20} />
        <Icon svgPath='share.svg' width={20} height={20} />
        <Icon svgPath='favIconOutlinedDark.svg' width={20} height={20} />
      </ActionsWrapper>
    </DetailsHeader>
  )
}

export default DetailsPageHeader
