import { useRouter } from 'next/router'
import useFavourites from 'src/hooks/useFavourites'
import useProfile from 'src/hooks/useProfile'
import Icon from 'src/views/app/Icon'
import Carousel from '../carousel'

const Image = dynamic(() => import('src/views/components/image'), { ssr: true })

import dynamic from 'next/dynamic'

import Typography from '../typography'

import {
  Details,
  DetailsContainer,
  DetailsWrapper,
  InnerDetailsContainer,
  PriceContainer,
  ProductCardContainer
} from './styles'
import {isMobile} from "react-device-detect";

interface Props {
  swiperCard?: boolean
  productId: number
  manufacturer: string
  model: string
  prodYear: number
  priceGel: number
  luggageNumbers: number
  bookFrom?: string | undefined
  bookTo?: string | undefined
  seats: string | number
  images: string[]
  city: string
}

const ProductCard: React.FC<Props> = ({
  swiperCard,
  productId,
  manufacturer,
  model,
  prodYear,
  priceGel,
  luggageNumbers,
  bookFrom,
  bookTo,
  seats,
  images,
  city
}) => {
  const router = useRouter()

  const { isAuthenticated, activeCompanyId } = useProfile()

  const { toggleUserFavourites, userFavourites, toggleFavouritesLoading } = useFavourites(productId)

  const handleCardClick = () => {
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const formattedToday = today.toISOString().split('T')[0]
    const formattedTomorrow = tomorrow.toISOString().split('T')[0]

    const queryString = `?book_from=${bookFrom || formattedToday}&book_to=${bookTo || formattedTomorrow}`

    router.push(`/details/${productId}${queryString}`)
  }

  const isProductInFavorites = userFavourites?.some((fav: any) => fav.product_id === productId)

  const handleFavorites = async (e: any) => {
    e.stopPropagation()
    e.nativeEvent.preventDefault()
    try {
      toggleUserFavourites.mutate()
    } catch (error) {
      console.log(error, 'error')
    }
  }

  return (
    <ProductCardContainer onClick={handleCardClick}>
      <div className={`overflow-hidden aspect-w-16 aspect-h-9 cursor-pointer ${swiperCard ? 'w-full' : 'sticky'} `}>
        <div className='w-full h-6'>
          {isMobile && !router?.asPath?.startsWith('/search') ?
                <div className='aspect-w-16 aspect-h-9 rounded-tl-3xl rounded-tr-3xl overflow-hidden'>
                  <Image
                      src={images[0] || ''}
                      alt={`${manufacturer} ${model} ${prodYear}`}
                      height={'100%'}
                      width={'10%'}
                      className='object-cover'
                  />
                </div>
               :
          <Carousel
              itemsArray={images?.map((imgUrl, index) => (
                  <div className='aspect-w-16 aspect-h-9 rounded-tl-3xl rounded-tr-3xl overflow-hidden' key={index}>
                    <Image
                        src={imgUrl || ''}
                        alt={`${manufacturer} ${model} ${prodYear}`}
                        height={'100%'}
                        width={'10%'}
                        className='object-cover'
                    />
                  </div>
              ))}
              type='card'
              key={Math.random()}
          />
          }
        </div>
      </div>

      {activeCompanyId === undefined && isAuthenticated && (
        <div
          className={`absolute cursor-pointer z-[10] top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full ${
            isProductInFavorites ? 'bg-orange-20 hover:bg-orange-30' : ' bg-raisin-20 hover:bg-raisin-60'
          }`}
        >
          {toggleFavouritesLoading ? (
            <>...</>
          ) : (
            <Icon
              svgPath={isProductInFavorites ? 'favIconActive' : 'favIconOutline'}
              className='cursor-pointer'
              width={isProductInFavorites ? 14 : 16}
              height={isProductInFavorites ? 14 : 17}
              onClick={e => handleFavorites(e)}
            />
          )}
        </div>
      )}
      <DetailsContainer>
        <Typography type='h5' className='flex items-center'>
          <span className='overflow-hidden text-ellipsis whitespace-nowrap inline-block'>
            {manufacturer} {model} {prodYear}
          </span>
        </Typography>
        <Typography type='body' color='light'>
          {city}
        </Typography>
        <InnerDetailsContainer>
          <PriceContainer>
            {priceGel} ₾{/*<PreviousPrice>47₾</PreviousPrice>*/}
            <Typography type='body' className='text-sm'>დღე</Typography>
          </PriceContainer>
          <DetailsWrapper className='flex-col xl:flex-row pl-4 xl:pl-0 border-l-1 border-raisin-10 xl:border-none'>
            <Details>
              <Icon svgPath='views' width={20} height={20} className='fill-transparent' /> <span>{seats}</span>
            </Details>
            <Details>
              <Icon svgPath='briefcase' width={20} height={20} className='fill-transparent' />
              <span>{luggageNumbers}</span>
            </Details>
          </DetailsWrapper>
        </InnerDetailsContainer>
      </DetailsContainer>
    </ProductCardContainer>
  )
}

export default ProductCard
