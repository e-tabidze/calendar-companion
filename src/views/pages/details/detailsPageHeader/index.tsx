import { ActionsWrapper, DetailsHeader } from './styles'
import dynamic from 'next/dynamic'

const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })

interface Props {
  city: string
  manufacturer: string
  model: string
  prodYear: number
}

const DetailsPageHeader: React.FC<Props> = ({ city, manufacturer, model, prodYear }) => {
  return (
    <DetailsHeader>
      <ul className='hidden md:flex items-center'>
        <li>
          <a className='text-sm flex'>მთავარი</a>
        </li>
        <li>
          <Icon svgPath='breadcrumb' width={5} height={8} className='flex mx-4' />
        </li>
        <li>
          <a className='text-sm flex'>{city}</a>
        </li>
        <li>
          <Icon svgPath='breadcrumb' width={5} height={8} className='flex mx-4' />
        </li>
        <li className='text-md uppercase text-raisin-30'>
          <span className='text-sm flex'>
            {manufacturer} {model} {prodYear}
          </span>
        </li>
      </ul>
      <ActionsWrapper>
        <Icon svgPath='printer' width={24} height={24} className='cursor-pointer' />
        <Icon svgPath='share' width={24} height={24} className='cursor-pointer' />
        <Icon svgPath='favIcon' width={24} height={24} className='cursor-pointer' />
      </ActionsWrapper>
    </DetailsHeader>
  )
}

export default DetailsPageHeader
