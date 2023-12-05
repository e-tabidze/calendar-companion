import useFilters from 'src/hooks/useFilters'
import { TailwindDiv } from 'src/interfaces/tailwind'
import DefaultLayout from 'src/layouts/DefaultLayout'
import { LargeContainer, ContentContainer, ResponsiveContainer } from 'src/styled/styles'
import Carousel from 'src/views/components/carousel'
import CategoryItem from 'src/views/components/categoryItem'
import Divider from 'src/views/components/divider'
import ProductCard from 'src/views/components/productCard'
import Typography from 'src/views/components/typography'
import Cities from 'src/views/pages/main/cities'
import Hero from 'src/views/pages/main/hero'
import useMain from 'src/views/pages/main/useMain'

// ** Tailwind Styled
import tw from 'tailwind-styled-components'

// ** Styled Components
const MainPageBox = tw.div<TailwindDiv>`flex w-full items-center flex-col`

const MainPage = () => {
  const { latestProducts, popularProducts } = useMain()

  const { categoriesFilter } = useFilters()

  return (
    <DefaultLayout>
      <MainPageBox>
        <LargeContainer>
          <Hero />
        </LargeContainer>

        <ContentContainer>
          <Typography type='h3' className='mt-12'>
            მოძებნე კატეგორიების მიხედვით
          </Typography>
          <Typography type='subtitle' color='light' className='mb-12'>
            იპოვეთ თქვენთვის სასურველი ავტომობილი კონკრეტული საჭიროებისთვის ერთ სივრცეში
          </Typography>
        </ContentContainer>
        <ContentContainer className='mb-12'>
          <Carousel
            itemsArray={categoriesFilter?.map((product: any) => (
              <CategoryItem
                  svgPath={product?.icon}
                  title={product?.title}
                  count={product?.count_products}
                  id={product?.id}
                  key={product?.id}
              />
            ))}
            type='categories'
          />
        </ContentContainer>
        <LargeContainer>
          <Divider />
        </LargeContainer>
        <ContentContainer>
          <Typography type='h3' className='mt-12'>
            ბოლოს დამატებული
          </Typography>
          <Typography type='subtitle' color='light' className='mb-12'>
            ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის ყურადღება მიიზიდოს
          </Typography>
        </ContentContainer>
        <ContentContainer className="md:rounded-3xl overflow-hidden px-0 md:px-5 lg:px-8">
          <Carousel
            itemsArray={latestProducts?.map((product: any) => (
              <ProductCard
                key={product?.id}
                swiperCard={true}
                productId={product?.id}
                manufacturer={product?.manufacturer?.title}
                model={product?.manufacturer_model?.title}
                prodYear={product?.prod_year}
                priceGel={product?.price_gel}
                luggageNumbers={product?.luggage_numbers}
                seats={product?.seat_type?.title}
              />
            ))}
            type='products'
          />
        </ContentContainer>
        <ContentContainer>
          <Typography type='h3' className='mt-12'>
            პოპულარული მანქანები
          </Typography>
          <Typography type='subtitle' color='light' className='mb-12'>
            ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის ყურადღება მიიზიდოს
          </Typography>
        </ContentContainer>
        <ContentContainer className="md:rounded-3xl overflow-hidden px-0 md:px-5 lg:px-8">
          <Carousel
            itemsArray={popularProducts?.map((product: any) => (
              <ProductCard
                key={product?.id}
                swiperCard={true}
                productId={product?.id}
                manufacturer={product?.manufacturer?.title}
                model={product?.manufacturer_model?.title}
                prodYear={product?.prod_year}
                priceGel={product?.price_gel}
                luggageNumbers={product?.luggage_numbers}
                seats={product?.seat_type?.title}
              />
            ))}
            type='products'
          />
        </ContentContainer>
        <ResponsiveContainer className='mt-20'>
          <Cities />
        </ResponsiveContainer>
      </MainPageBox>
    </DefaultLayout>
  )
}

export default MainPage
