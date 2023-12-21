import { ActionsWrapper, DetailsHeader } from './styles'
import dynamic from 'next/dynamic'

const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
const DetailsPageHeader = () => {
  return (
    <DetailsHeader>
      <div>breadcrumbs</div>
      <ActionsWrapper>
        <Icon svgPath='printer' width={24} height={24} className='cursor-pointer' />
        <Icon svgPath='share' width={24} height={24} className='cursor-pointer' />
        <Icon svgPath='favIconOutlinedDark' width={24} height={24} className="cursor-pointer fill-black" />
      </ActionsWrapper>
    </DetailsHeader>
  )
}

export default DetailsPageHeader
