import { useRouter } from 'next/router'
import { DefaultButton } from 'src/views/components/button'
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
import Icon from 'src/views/app/Icon'

const Cities = () => {
  const { cities } = useSearchLocations()

  const router = useRouter()

  return (
    <CitiesContainer>
      <CitiesInnerContainer>
        <CitiesListContainer>
          <ViewAllCitiesContainer>
            <Icon svgPath='location' width={40} height={40} className='shrink-0 hidden sm:inline-flex mt-1' />
            <Container>
              <Typography type='h3' className='text-3md xl:text-[24px] 2xl:text-[30px] mb-8'>
                ავტომობილები ყველაზე აქტიურ ქალაქებში
              </Typography>
              <DefaultButton
                text='ყველას ნახვა'
                className='hidden lg:inline-flex'
                onClick={() => router?.push('/search/?page=1&free_delivery=false&sort_by=id&order_by=asc')}
              />
            </Container>
          </ViewAllCitiesContainer>
          <CitiesWrapper>
            {cities
              ?.filter((city: any) => city?.products > 0)
              ?.sort((a: { products: number }, b: { products: number }) => b?.products - a?.products)
              ?.slice(0, 4)
              ?.map((city: any) => (
                <CityCard
                  key={city?.city}
                  src='/images/city.png'
                  city={city.city}
                  numberOfCars={city?.products}
                  onClick={() =>
                    router?.push(`/search/?location=${city.city}&page=1&free_delivery=false&sort_by=id&order_by=asc`)
                  }
                />
              ))}
          </CitiesWrapper>
          <DefaultButton
            text='ყველა ნახვა'
            className='inline-flex lg:hidden'
            onClick={() => router?.push('/search/?page=1&free_delivery=false&sort_by=id&order_by=asc')}
          />
        </CitiesListContainer>
        <Divider />
        <BenefitsContainer>
          <BenefitsCard
            icon='timeStart'
            width={64}
            height={64}
            title='უსაფრთხოება'
            bodyText='ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის ყურადღება მიიზიდოს და დიზაინის აღქმაში ხელი შეუშალოს. Lorem Ipsum-ის გამოყენებით ვღებულობთ იმაზე'
          />
          <BenefitsCard
            icon='timeStart'
            width={64}
            height={64}
            title='უსაფრთხოება'
            bodyText='ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის ყურადღება მიიზიდოს და დიზაინის აღქმაში ხელი შეუშალოს. Lorem Ipsum-ის გამოყენებით ვღებულობთ იმაზე'
          />
          <BenefitsCard
            icon='timeStart'
            width={64}
            height={64}
            title='უსაფრთხოება'
            bodyText='ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის ყურადღება მიიზიდოს და დიზაინის აღქმაში ხელი შეუშალოს. Lorem Ipsum-ის გამოყენებით ვღებულობთ იმაზე'
          />
        </BenefitsContainer>
      </CitiesInnerContainer>
    </CitiesContainer>
  )
}

export default Cities
