import { useRouter } from 'next/router'
import useFavourites from 'src/hooks/useFavourites'
import useProfile from 'src/hooks/useProfile'
import Icon from 'src/views/app/Icon'
import Carousel from '../carousel'
import { dynamicTranslateCities } from 'src/utils/translationUtils'

const Image = dynamic(() => import('src/views/components/image'), { ssr: true })

import dynamic from 'next/dynamic'

import Typography from '../typography'

import {
  Details,
  DetailsContainer,
  DetailsWrapper,
  InnerDetailsContainer,
  PreviousPrice,
  PriceContainer,
  ProductCardContainer
} from './styles'
import { isMobile } from 'react-device-detect'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import useCurrency from 'src/hooks/useCurrency'
import { removeExtraDecimalDigits } from 'src/utils/priceFormat'
import { Discount } from 'src/types/Product'
import { selectedDiscountPlan } from 'src/utils/discountPlan'

interface Props {
  productId: number
  manufacturer: string
  model: string
  prodYear: number
  priceGel: number
  priceUsd: number
  luggageNumbers: number
  bookFrom?: string | undefined
  bookTo?: string | undefined
  seats: string | number
  images: string[]
  city: string
  isProductInFavorites: boolean
  days?: number
  discounts?: Discount[]
}

const ProductCard: React.FC<Props> = ({
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
  city,
  isProductInFavorites: productFav,
  priceUsd,
  days,
  discounts
}) => {
  const router = useRouter()

  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [isProductInFavorites, setIsProductInFavorites] = useState(productFav)

  const { currency } = useCurrency()

  useEffect(() => {
    setIsMobileDevice(isMobile)
  }, [])

  const { isAuthenticated, activeCompanyId } = useProfile()

  const { toggleUserFavourites } = useFavourites(productId)

  const { t } = useTranslation()

  const handleCardClick = () => {
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const formattedToday = today.toISOString().split('T')[0]
    const formattedTomorrow = tomorrow.toISOString().split('T')[0]

    const queryString = `?book_from=${bookFrom || formattedToday}&book_to=${bookTo || formattedTomorrow}`

    router.push(`/details/${productId}${queryString}`)
  }

  const handleFavorites = async (e: any) => {
    e.stopPropagation()
    e.nativeEvent.preventDefault()

    setIsProductInFavorites(!productFav)

    try {
      await toggleUserFavourites.mutateAsync()
    } catch (error) {
      console.log(error, 'error')
    }
  }

  console.log(days, 'days')

  const discointPercent = discounts && days ? selectedDiscountPlan(discounts, days) : 0

  console.log(discointPercent, 'discointPercent', productId, 'productId')

  return (
    <ProductCardContainer onClick={handleCardClick}>
      <div className='overflow-hidden cursor-pointer w-full'>
        {isMobileDevice && !router?.asPath?.startsWith('/search') ? (
          <div className='aspect-w-16 aspect-h-9 rounded-tl-3xl rounded-tr-3xl overflow-hidden'>
            <Image
              src={images[0] || ''}
              alt={`${manufacturer} ${model} ${prodYear}`}
              height='100%'
              width='100%'
              className='object-cover'
            />
          </div>
        ) : (
          <Carousel
            itemsArray={images?.map((imgUrl, index) => (
              <div className='aspect-w-16 aspect-h-9 rounded-tl-3xl rounded-tr-3xl overflow-hidden' key={index}>
                <Image
                  src={imgUrl || ''}
                  alt={`${manufacturer} ${model} ${prodYear}`}
                  height='100%'
                  width='100%'
                  className='object-cover'
                />
              </div>
            ))}
            type='card'
            key={Math.random()}
          />
        )}
      </div>

      {activeCompanyId === undefined && isAuthenticated && (
        <div
          className={`absolute cursor-pointer z-[10] top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-raisin-20 ${
            isProductInFavorites ? '' : 'hover:bg-raisin-40'
          }`}
        >
          <Icon
            svgPath={isProductInFavorites ? 'favIconActive' : 'favIconOutline'}
            className='cursor-pointer'
            width={20}
            height={20}
            onClick={e => handleFavorites(e)}
          />
        </div>
      )}
      <DetailsContainer>
        <Typography type='h5' className='flex items-center'>
          <span className='overflow-hidden text-ellipsis whitespace-nowrap inline-block'>
            {manufacturer} {model} {prodYear}
          </span>
        </Typography>
        <Typography type='body' color='light'>
          {dynamicTranslateCities(city, t)}
        </Typography>
        <InnerDetailsContainer>
          <PriceContainer>
            {currency === 'GEL'
              ? removeExtraDecimalDigits(priceGel - (priceGel / 100) * discointPercent)
              : removeExtraDecimalDigits(priceUsd - (priceUsd / 100) * discointPercent)}{' '}
            {currency === 'GEL' ? '₾' : '$'}
            {discointPercent > 0 && (
              <PreviousPrice>
                {currency === 'GEL' ? removeExtraDecimalDigits(priceGel) : removeExtraDecimalDigits(priceUsd)}{' '}
                {currency === 'GEL' ? '₾' : '$'}
              </PreviousPrice>
            )}
            <Typography type='body' className='text-sm'>
              {t('day')}
            </Typography>
          </PriceContainer>
          <DetailsWrapper className='flex-col sm:flex-row pl-4 sm:pl-0 border-l-1 border-raisin-10 sm:border-none'>
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
