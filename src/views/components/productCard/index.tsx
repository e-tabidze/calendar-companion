import { useRouter } from 'next/router'
import Image from '../image'
import Typography from '../typography'
import {
  Details,
  DetailsContainer,
  DetailsWrapper,
  FavIconWrapper,
  InnerDetailsContainer,
  PreviousPrice,
  PriceContainer,
  ProductCardContainer,
  ReviewContainer
} from './styles'

const ProductCard = () => {
  const router = useRouter()

  return (
    <ProductCardContainer onClick={() => router.push('/details')}>
      <Image
        src='/images/car.png'
        alt=''
        className='rounded-tl-3xl rounded-tr-3xl w-full h-auto cursor-pointer desktop:h-60'
      />
      <FavIconWrapper>
        <Image src='/icons/favIconOutline.svg' alt='' />
      </FavIconWrapper>
      <DetailsContainer>
        <Typography type='h5'>hyunday elantra 2011</Typography>
        <ReviewContainer>
          <Image src='/icons/star.svg' alt='' />
          <Typography type='body' color='light'>
            4.89
          </Typography>
          <Typography type='body' color='light' className='text-sm text-[#1B1C1E] opacity-50'>
            (63 შეფასება)
          </Typography>
        </ReviewContainer>
        <InnerDetailsContainer>
          <PriceContainer>
            27₾ <PreviousPrice>47₾</PreviousPrice>
          </PriceContainer>
          <DetailsWrapper>
            <Details>
              <Image src='/icons/views.svg' className='h-5 w-5' alt='' /> <span>5</span>
            </Details>
            <Details>
              <Image src='/icons/briefcase.svg' className='h-5 w-5' alt='' /> <span>2</span>
            </Details>
          </DetailsWrapper>
        </InnerDetailsContainer>
      </DetailsContainer>
    </ProductCardContainer>
  )
}

export default ProductCard
