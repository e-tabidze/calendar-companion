import { useRouter } from 'next/router'
import { DefaultButton } from 'src/views/components/button'
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
import Icon from 'src/views/app/Icon'
import { useTranslation } from 'next-i18next'
import useFilters from 'src/hooks/useFilters'

const Cities = () => {
  const { t } = useTranslation()
  const { cities } = useFilters()

  const router = useRouter()

  return (
    <CitiesContainer>
      <CitiesInnerContainer>
        <CitiesListContainer>
          <ViewAllCitiesContainer>
            <Icon svgPath='location' width={40} height={40} className='shrink-0 hidden sm:inline-flex mt-1' />
            <Container>
              <Typography type='h3' className='text-3md xl:text-[24px] 2xl:text-[30px] mb-8'>
                {t('vehicles_in_most_active_cities')}
              </Typography>
              <DefaultButton
                text={t('view_all')}
                className='hidden lg:inline-flex border-[#D4D4D7] hover:border-raisin-100 transition duration-300 ease-in-out'
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
                  src={city?.image ? `/images/cities/${city?.image}` : '/images/cities/default.png'}
                  city={city.city}
                  numberOfCars={city?.products}
                  onClick={() =>
                    router?.push(`/search/?location=${city.city}&page=1&free_delivery=false&sort_by=id&order_by=asc`)
                  }
                />
              ))}
          </CitiesWrapper>
          <DefaultButton
            text={t('view_all')}
            className='inline-flex lg:hidden border-[#D4D4D7] hover:border-raisin-100 transition duration-300 ease-in-out'
            onClick={() => router?.push('/search/?page=1&free_delivery=false&sort_by=id&order_by=asc')}
          />
        </CitiesListContainer>
        <Divider />
        <BenefitsContainer>
          <BenefitsCard icon='speed' width={64} height={64} title={t('fast')} bodyText={t('fast_desc')} />
          <BenefitsCard icon='comfort' width={64} height={64} title={t('comfort')} bodyText={t('comfort_desc')} />
          <BenefitsCard icon='safe' width={64} height={64} title={t('safe')} bodyText={t('safe_desc')} />
        </BenefitsContainer>
      </CitiesInnerContainer>
    </CitiesContainer>
  )
}

export default Cities
