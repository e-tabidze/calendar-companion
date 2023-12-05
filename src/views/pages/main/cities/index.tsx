import { useRouter } from 'next/router'
import { DefaultButton } from 'src/views/components/button'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import useSearchLocations from '../filters/locationDropdown/useSearchLocations'
import BenefitsCard from './benefitsCard'
import CityCard from './cityCard'
import {
  BenefitsContainer,
  CitiesContainer,
  CitiesInnerContainer,
  CitiesListContainer,
  CitiesWrapper,
  Container,
  Divider,
  ViewAllCitiesContainer
} from './styles'

const Cities = () => {
  const { cities } = useSearchLocations()

  const router = useRouter()

  return (
    <CitiesContainer>
      <CitiesInnerContainer>
        <CitiesListContainer>
          <ViewAllCitiesContainer>
            <Image src='/icons/location.svg' className='hidden sm:inline-flex' alt='img' />
            <Container>
              <Typography type='h3' className='text-[20px] lg:text-[30px] mb-8'>
                ავტომობილები ტოპ ქალაქების მიხედვით
              </Typography>
              <DefaultButton
                text='ყველას ნახვა'
                className='hidden lg:inline-flex'
                onClick={() => router?.push('/search')}
              />
            </Container>
          </ViewAllCitiesContainer>
          <CitiesWrapper>
            {cities
              ?.sort((a: { products: number }, b: { products: number }) => b?.products - a?.products)
              ?.slice(0, 4)
              ?.map((city: any) => (
                <CityCard
                  key={city?.city}
                  src='/images/city.png'
                  city={city.city}
                  numberOfCars={city?.products}
                  onClick={() => router?.push(`/search/?location=${city.city}`)}
                />
              ))}
          </CitiesWrapper>
          <DefaultButton text={'ყველა ნახვა'} className='inline-flex lg:hidden' />
        </CitiesListContainer>
        <Divider />
        <BenefitsContainer>
          <BenefitsCard
            src='/icons/timeStart.svg'
            title='უსაფრთხოება'
            bodyText='ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის ყურადღება მიიზიდოს და დიზაინის აღქმაში ხელი შეუშალოს. Lorem Ipsum-ის გამოყენებით ვღებულობთ იმაზე'
          />
          <BenefitsCard
            src='/icons/timeStart.svg'
            title='უსაფრთხოება'
            bodyText='ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის ყურადღება მიიზიდოს და დიზაინის აღქმაში ხელი შეუშალოს. Lorem Ipsum-ის გამოყენებით ვღებულობთ იმაზე'
          />
          <BenefitsCard
            src='/icons/timeStart.svg'
            title='უსაფრთხოება'
            bodyText='ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის ყურადღება მიიზიდოს და დიზაინის აღქმაში ხელი შეუშალოს. Lorem Ipsum-ის გამოყენებით ვღებულობთ იმაზე'
          />
        </BenefitsContainer>
      </CitiesInnerContainer>
    </CitiesContainer>
  )
}

export default Cities
