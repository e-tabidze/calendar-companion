import useFavourites from 'src/hooks/useFavourites'
import { IconButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'
import { Details, DetailsWrapper, InnerDetailsContainer, PreviousPrice, PriceContainer } from './styles'
import Icon from 'src/views/app/Icon'
import Image from 'src/views/components/image'
import Carousel from 'src/views/components/carousel'
import Link from 'next/link'
import {useTranslation} from "next-i18next";
import { dynamicTranslateCities } from 'src/utils/translationUtils'

interface Props {
  productId: string | number
  manufacturer: string
  year: number
  model: string
  city: string
  price: number
  isDeleted: boolean
  images: string[]
  id: string
  luggage: number
  seatTypes: string
}

const ListComponent: React.FC<Props> = ({
  productId,
  manufacturer,
  model,
  year,
  city,
  price,
  isDeleted,
  images,
  id,
  luggage,
  seatTypes
}) => {
  const { toggleUserFavourites } = useFavourites(productId)

  const handleFavorites = async () => {
    try {
      toggleUserFavourites.mutate()
    } catch (error) {
      console.log(error, 'error')
    }
  }
const {t} = useTranslation()

  return (
    <div className='w-full sm:border-b-1 sm:border-raisin-10 my-3 sm:my-2 last:border-none'>
      <div className='w-full sm:gap-6 flex flex-col sm:flex-row sm:my-5 border border-raisin-10 sm:border-none overflow-hidden rounded-xl sm:rounded-0'>
        <div className='relative'>
          <div className='w-full sm:w-[150px] lg:w-[200px] xl:w-[250px]'>
            <Carousel
              itemsArray={images?.map((imgUrl, index) => (
                <div className='aspect-w-16 aspect-h-9 sm:rounded-lg overflow-hidden' key={index}>
                  <Image
                    src={imgUrl || ''}
                    alt={`${manufacturer} ${model} ${year}`}
                    height={'100%'}
                    width={'100%'}
                    className='object-cover'
                    onError={(ev: any) => {
                      ev.target.src = `/icons/avatar.svg`
                    }}
                  />
                </div>
              ))}
              type='card'
            />
          </div>
          <IconButton
            icon='favIconActive'
            height={20}
            width={20}
            className='flex sm:hidden absolute right-5 z-[1] top-5 bg-red-10 w-8 !h-8 justify-center'
            onClick={handleFavorites}
            type='button'
          />
        </div>
        <div className='relative w-full flex flex-col justify-between p-6 sm:p-0 my-3'>
          <div className=''>
            <Link href={`/details/${id}`}>
              <Typography type='h4' weight='normal' color='dark' className='text-md md:text-3md'>
                {manufacturer} {model} {year}
              </Typography>
            </Link>
            <div className='flex gap-2 items-center mt-1'>
              <Typography type='subtitle' className='text-black/50'>
                {dynamicTranslateCities(city, t)}
              </Typography>
              <div className='h-[5px] w-px bg-raisin-10' />
            </div>
          </div>
          <div className='flex justify-between w-full mt-3 sm:mt-none items-center'>
            <div className='flex items-center gap-6'>
              <Typography type='h4' weight='medium' color='dark'>
                <PriceContainer className='text-[20px]'>{price} ₾ /{t('day')} </PriceContainer>
              </Typography>
              {isDeleted && (
                <Typography type='subtitle'>
                  <PreviousPrice>{t('product_removed')}</PreviousPrice>
                </Typography>
              )}
            </div>
            <InnerDetailsContainer>
              <DetailsWrapper>
                <Details>
                  <Icon svgPath='views' width={20} height={20} className='fill-transparent' /> <span>{seatTypes}</span>
                </Details>
                <Details>
                  <Icon svgPath='briefcase' width={20} height={20} className='fill-transparent' /> <span>{luggage}</span>
                </Details>
              </DetailsWrapper>
            </InnerDetailsContainer>
          </div>
          <IconButton
            icon='favIconActive'
            height={20}
            width={20}
            className='hidden sm:flex absolute right-0 top-0 bg-red-10 w-8 !h-8 justify-center'
            onClick={handleFavorites}
            type='button'
          />
        </div>
      </div>
    </div>
  )
}

export default ListComponent
