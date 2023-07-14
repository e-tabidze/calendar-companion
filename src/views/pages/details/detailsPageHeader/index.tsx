import Image from 'src/views/components/image'
import { ActionsWrapper, DetailsHeader } from './styles'

const DetailsPageHeader = () => {
  return (
    <DetailsHeader>
      <div>breadcrumbs</div>
      <ActionsWrapper>
        <Image src='/icons/printer.svg' className='h-4 w-4' alt='' />
        <Image src='/icons/share.svg' className='h-4 w-4' alt='' />
        <Image src='/icons/favIconOutlineDark.svg' className='h-4 w-4' alt='' />
      </ActionsWrapper>
    </DetailsHeader>
  )
}

export default DetailsPageHeader
