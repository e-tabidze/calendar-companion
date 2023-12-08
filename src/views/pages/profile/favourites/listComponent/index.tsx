import Image from 'next/image'
import useFavourites from 'src/hooks/useFavourites'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { IconButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import { Details, DetailsWrapper, InnerDetailsContainer, PreviousPrice, PriceContainer } from './styles'

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
  const { width } = useWindowDimensions()

  const { toggleUserFavourites } = useFavourites(productId)

  const handleFavorites = async () => {
    try {
      toggleUserFavourites.mutate()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex flex-col sm:flex-row gap-6 w-full sm:my-5 border border-raisin-10 my-2 sm:my-none rounded-2xl sm:rounded-none p-4 sm:p-none sm:border-none'>
        <div className=''>
          <Image
            src='/images/car.png'
            width={width > 640 ? 230 : 350}
            height={width > 640 ? 150 : 256}
            alt=''
            className='rounded-2xl w-full h-auto sm:w-[250px] sm:h-[150px] object-cover'
          />
        </div>
        <div className='relative w-full sm:h-[140px] sm:m-auto flex flex-col justify-between'>
          <div className=''>
            <Typography type='h4' weight='normal' color='dark'>
              {manufacturer} {model} {year}
            </Typography>
            <div className='flex gap-2 items-center mt-1'>
              <Image src='/icons/star.svg' alt='' height={16} width={16} />
              <Typography type='subtitle'>{city}</Typography>
              <div className='h-[5px] w-px bg-raisin-10' />
              <Typography type='body' color='light'>
                {year}
              </Typography>
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
                  <Image src='/icons/views.svg' alt='' width={20} height={20} /> <span></span>
                </Details>
                <Details>
                  <Image src='/icons/briefcase.svg' alt='' width={20} height={20} /> <span></span>
                </Details>
              </DetailsWrapper>
            </InnerDetailsContainer>
          </div>
          <IconButton
            icon='/icons/favIconActive.svg'
            height={13}
            width={14}
            className='absolute right-0 top-0 bg-red-10 w-8 !h-8 justify-center'
            onClick={handleFavorites}
            type='button'
          />
        </div>
      </div>
      {width > 640 && <Divider />}
    </>
  )
}

export default ListComponent
