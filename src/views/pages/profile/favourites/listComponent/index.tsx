import useFavourites from 'src/hooks/useFavourites'
import { IconButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'
import { Details, DetailsWrapper, InnerDetailsContainer, PreviousPrice, PriceContainer } from './styles'
import Icon from "src/views/app/Icon";
import Image from 'src/views/components/image'

interface Props {
  productId: string | number
  manufacturer: string
  year: number
  model: string
  city: string
  price: number
  isDeleted: boolean
}

const ListComponent: React.FC<Props> = ({ productId, manufacturer, model, year, city, price, isDeleted }) => {

  const { toggleUserFavourites } = useFavourites(productId)

  const handleFavorites = async () => {
    try {
      toggleUserFavourites.mutate()
    } catch (error) {
      console.log(error)
    }
  }

  return (

      <div className='flex flex-col sm:flex-row gap-6 w-full sm:my-5 border border-raisin-10 my-2 sm:my-none rounded-2xl sm:rounded-none sm:border-none last:border-none'>
        <div className='aspect-w-4 aspect-h-3'>
          <Image
            src='/images/car.png'
            width={'100%'}
            height={'100%'}
            alt=''
            className='rounded-2xl object-cover'
          />
        </div>
        <div className='relative w-full sm:h-[140px] sm:m-auto flex flex-col justify-between'>
          <div className=''>
            <Typography type='h4' weight='normal' color='dark' className='text-md md:text-3md'>
              {manufacturer} {model} {year}
            </Typography>
            <div className='flex gap-2 items-center mt-1'>
              {/*<Icon svgPath='star' width={16} height={16}/>*/}
              <Typography type='subtitle' className='text-black/50'>{city}</Typography>
              <div className='h-[5px] w-px bg-raisin-10' />
            </div>
          </div>
          <div className='flex justify-between w-full mt-3 sm:mt-none'>
            <div className='flex items-center gap-6'>
              <Typography type='h4' weight='medium' color='dark'>
                <PriceContainer>{price} ₾ / დღე</PriceContainer>
              </Typography>
              {isDeleted && (
                <Typography type='subtitle'>
                  <PreviousPrice>პროდუქტი წაშლილია</PreviousPrice>
                </Typography>
              )}
            </div>
            <InnerDetailsContainer>
              <DetailsWrapper>
                <Details>
                  <Icon svgPath='views' width={20} height={20} className='fill-transparent' /> <span></span>
                </Details>
                <Details>
                  <Icon svgPath='briefcase' width={20} height={20} className='fill-transparent' /> <span></span>
                </Details>
              </DetailsWrapper>
            </InnerDetailsContainer>
          </div>
          <IconButton
            icon='favIconActive'
            height={13}
            width={14}
            className='absolute right-0 top-0 bg-red-10 w-8 !h-8 justify-center'
            onClick={handleFavorites}
            type='button'
          />
        </div>
      </div>
  )
}

export default ListComponent
