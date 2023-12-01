import { useRouter } from 'next/router'
import useFavourites from 'src/hooks/useFavourites'
import useProfile from 'src/hooks/useProfile'
import Icon from 'src/views/app/Icon'
import Image from '../image'
import Typography from '../typography'
import {
  Details,
  DetailsContainer,
  DetailsWrapper,
  InnerDetailsContainer,
  PreviousPrice,
  PriceContainer,
  ProductCardContainer,
  ReviewContainer
} from './styles'

interface Props {
  swiperCard?: boolean
  productId: number
  manufacturer: string
  model: string
  prodYear: number
  priceGel: number
  countProductFavs: number
  bookFrom?: string | undefined,
  bookTo?: string | undefined
}

const ProductCard: React.FC<Props> = ({ swiperCard, productId, manufacturer, model, prodYear, priceGel, countProductFavs, bookFrom, bookTo }) => {
  const router = useRouter()

  const { isAuthenticated } = useProfile()

  const { toggleUserFavourites, userFavourites, toggleFavouritesLoading } = useFavourites(productId)

  const handleCardClick = () => router.push(`/details/${productId}?book_from=${bookFrom}&book_to=${bookTo}`)

  const isProductInFavorites = userFavourites?.some((fav: any) => fav.product_id === productId)

  console.log(isProductInFavorites, 'isProductInFavorites')

  const handleFavorites = async () => {
    try {
      toggleUserFavourites.mutate()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProductCardContainer onClick={handleCardClick}>
      <div
        className={`overflow-hidden aspect-w-16 aspect-h-9 cursor-pointer ${
          swiperCard ? 'md:w-[320px] xl:w-[400px]' : 'sticky'
        } `}
      >
        <Image src='/images/car.png' alt='' className='rounded-tl-3xl rounded-tr-3xl object-cover' />
      </div>

      {isAuthenticated && (
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
              onClick={e => {
                e.stopPropagation()
                e.nativeEvent.preventDefault()
                handleFavorites()
              }}
            />
          )}
        </div>
      )}
      <DetailsContainer>
        <Typography type='h5'>
          {manufacturer} {model} {prodYear}
        </Typography>
        <ReviewContainer>
          <Icon svgPath='star' width={20} height={20} />
          <Typography type='body' color='light'>
            4.89
          </Typography>
          <Typography type='body' color='light' className='text-sm text-[#1B1C1E] opacity-50'>
            (63 შეფასება)
          </Typography>
        </ReviewContainer>
        <InnerDetailsContainer>
          <PriceContainer>
            {priceGel} ₾ <PreviousPrice>47₾</PreviousPrice>
          </PriceContainer>
          <DetailsWrapper>
            <Details>
              <Icon svgPath='views' width={20} height={20} /> <span>{countProductFavs}</span>
            </Details>
            <Details>
              <Icon svgPath='briefcase' width={20} height={20} /> <span>2</span>
            </Details>
          </DetailsWrapper>
        </InnerDetailsContainer>
      </DetailsContainer>
    </ProductCardContainer>
  )
}

export default ProductCard
