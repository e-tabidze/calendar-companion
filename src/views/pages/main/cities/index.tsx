import { DefaultButton } from 'src/views/components/button'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
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
  return (
    <CitiesContainer>
      <CitiesInnerContainer>
        <CitiesListContainer>
          <ViewAllCitiesContainer>
            <Image src='/icons/location.svg' className='hidden sm:inline-flex' alt='img'/>
            <Container>
              <Typography type='h3' className='text-[20px] lg:text-[30px] mb-8'>
                ავტომობილები ტოპ ქალაქების მიხედვით
              </Typography>
              <DefaultButton text={'ყველა ნახვა'} className="hidden lg:inline-flex" />
            </Container>
          </ViewAllCitiesContainer>
          <CitiesWrapper>
            <CityCard src='/images/city.png' city='თბილისი' numberOfCars={345} />
            <CityCard src='/images/city.png' city='თბილისი' numberOfCars={345} />
            <CityCard src='/images/city.png' city='თბილისი' numberOfCars={345} />
            <CityCard src='/images/city.png' city='თბილისი' numberOfCars={345} />
          </CitiesWrapper>
          <DefaultButton text={'ყველა ნახვა'} className="inline-flex lg:hidden" />
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
