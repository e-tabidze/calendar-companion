import { TailwindDiv } from 'src/interfaces/tailwind'
import DefaultLayout from 'src/layouts/DefaultLayout'
import { LargeContainer, ContentContainer, ResponsiveContainer, FullContainer } from 'src/styled/styles'
import Carousel from 'src/views/components/carousel'
import Divider from 'src/views/components/divider'
import ProductCard from 'src/views/components/productCard'
import Typography from 'src/views/components/typography'
import Cities from 'src/views/pages/main/cities'
import Hero from 'src/views/pages/main/hero'
import Cookie from 'src/helpers/Cookie'

// ** Tailwind Styled
import tw from 'tailwind-styled-components'

// ** Styled Components
const MainPageBox = tw.div<TailwindDiv>`flex w-full items-center flex-col`

const productArray = [
  <ProductCard key={1} swiperCard={true} />,
  <ProductCard key={2} swiperCard={true} />,
  <ProductCard key={3} swiperCard={true} />,
  <ProductCard key={4} swiperCard={true} />,
  <ProductCard key={5} swiperCard={true} />,
  <ProductCard key={6} swiperCard={true} />,
  <ProductCard key={7} swiperCard={true} />,
  <ProductCard key={8} swiperCard={true} />,
  <ProductCard key={9} swiperCard={true} />,
  <ProductCard key={10} swiperCard={true} />
]

// const categories = categoryArray.map((item, key) => <CategoryCard category={item.type} key={key} />)

const MainPage = () => {
  // await dispatch(({ AccessToken: Cookie.get('AccessToken') }))

  console.log({ AccessToken: Cookie.get('AccessToken') }, 'accesstoken')

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
        <LargeContainer>{/* <Carousel itemsArray={categories} type='categories' /> */}</LargeContainer>
        <LargeContainer>
          <Divider />
        </LargeContainer>
        <ContentContainer>
          <Typography type='h3' className='mt-12'>
            ბოლოს ნანახი
          </Typography>
          <Typography type='subtitle' color='light' className='mb-12'>
            ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის ყურადღება მიიზიდოს
          </Typography>
        </ContentContainer>
        <FullContainer>
          <Carousel itemsArray={productArray} type='products' />
        </FullContainer>
        <ContentContainer>
          <Typography type='h3' className='mt-12'>
            პოპულარული მანქანები
          </Typography>
          <Typography type='subtitle' color='light' className='mb-12'>
            ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის ყურადღება მიიზიდოს
          </Typography>
        </ContentContainer>
        <FullContainer>
          <Carousel itemsArray={productArray} type='products' />
        </FullContainer>
        <ResponsiveContainer className='mt-20'>
          <Cities />
        </ResponsiveContainer>
      </MainPageBox>
    </DefaultLayout>
  )
}

export default MainPage
