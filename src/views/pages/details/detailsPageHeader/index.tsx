import { ActionsWrapper, DetailsHeader } from './styles'
import dynamic from 'next/dynamic'
import useFavourites from 'src/hooks/useFavourites'
import Link from 'next/link'

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

  const handleShare = (e: any) => {
    e.stopPropagation()
    if (typeof window !== 'undefined') {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
      window.open(url, '_blank', 'width=600,height=400')
    }
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
        <Icon svgPath='printer' width={24} height={24} className='cursor-pointer' onClick={handlePrint} />
        <Icon svgPath='share' width={24} height={24} className='cursor-pointer' onClick={handleShare} />
        <Icon
          svgPath={isProductInFavorites ? 'favIconActive' : 'favIcon'}
          width={24}
          height={24}
          className='cursor-pointer'
          onClick={e => handleFavorites(e)}
        />
      </ActionsWrapper>
    </DetailsHeader>
  )
}

export default DetailsPageHeader
