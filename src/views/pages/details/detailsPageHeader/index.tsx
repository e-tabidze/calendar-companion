import { ActionsWrapper, DetailsHeader } from './styles'
import dynamic from 'next/dynamic'

const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
const DetailsPageHeader = () => {
  return (
    <DetailsHeader>
      <ul className='hidden md:flex items-center'>
          <li>
              <a className='text-sm flex'>მთავარი</a>
          </li>
          <li>
              <Icon svgPath='breadcrumb' width={5} height={8} className='flex mx-4'/>
          </li>
          <li>
              <a className='text-sm flex'>თბილისი</a>
          </li>
          <li>
              <Icon svgPath='breadcrumb' width={5} height={8} className='flex mx-4'/>
          </li>
          <li className='text-md uppercase text-raisin-30'>
              <span className='text-sm flex'>Audi 80 2023</span>
          </li>
      </ul>
        <button className='flex items-center bg-transparent text-sm'>
            <Icon svgPath='back' width={5} height={8} className='flex mr-4'/>
            დაბრუნება
        </button>
      <ActionsWrapper>
        <Icon svgPath='printer' width={24} height={24} className='cursor-pointer' />
        <Icon svgPath='share' width={24} height={24} className='cursor-pointer' />
        <Icon svgPath='favIcon' width={24} height={24} className="cursor-pointer" />
      </ActionsWrapper>
    </DetailsHeader>
  )
}

export default DetailsPageHeader
