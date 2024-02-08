import { ActionsWrapper, DetailsHeader } from './styles'
import dynamic from 'next/dynamic'
import useFavourites from 'src/hooks/useFavourites'
import Link from 'next/link'
import ShareOptionsPopover from '../shareOptionsPopover'

const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })

interface Props {
  city: string
  manufacturer: string
  model: string
  prodYear: number
  productId: string
  isProductInFavorites: boolean
}

const DetailsPageHeader: React.FC<Props> = ({
  city,
  manufacturer,
  model,
  prodYear,
  productId,
  isProductInFavorites
}) => {
  const { toggleUserFavourites } = useFavourites(productId)

  const handleFavorites = async (e: any) => {
    e.stopPropagation()
    e.nativeEvent.preventDefault()
    try {
      toggleUserFavourites.mutate()
    } catch (error) {
      console.log(error, 'error')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <DetailsHeader>
      <ul className='hidden md:flex items-center'>
        <li>
          <Link href='/' className='text-sm flex'>
            მთავარი
          </Link>
        </li>
        <li>
          <Icon svgPath='breadcrumb' width={5} height={8} className='flex mx-4' />
        </li>
        <li>
          <Link href={`/search/?page=1&location=${city}&sort_by=id&order_by=desc`} className='text-sm flex'>
            {city}
          </Link>
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
        <div className='hover:bg-raisin-10 rounded-full w-10 h-10 flex items-center justify-center'>
          <Icon svgPath='printer' width={24} height={24} className='cursor-pointer' onClick={handlePrint} />
        </div>
        <ShareOptionsPopover />
        <div className='hover:bg-raisin-10 rounded-full w-10 h-10 flex items-center justify-center'>
          <Icon
            svgPath={isProductInFavorites ? 'favIconDetails' : 'favIcon'}
            width={24}
            height={24}
            className='cursor-pointer'
            onClick={e => handleFavorites(e)}
          />
        </div>
      </ActionsWrapper>
    </DetailsHeader>
  )
}

export default DetailsPageHeader
