import { TailwindDiv } from 'src/interfaces/tailwind'
import DefaultLayout from 'src/layouts/DefaultLayout'
import { LargeContainer, ContentContainer, ResponsiveContainer, FullContainer } from 'src/styled/styles'
import Carousel from 'src/views/components/carousel'
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

const productArray = [
  <ProductCard
    key={1}
    swiperCard={true}
    productId={0}
    manufacturer={''}
    model={''}
    prodYear={0}
    priceGel={0}
    countProductFavs={0}
  />,
  <ProductCard
    key={2}
    swiperCard={true}
    productId={0}
    manufacturer={''}
    model={''}
    prodYear={0}
    priceGel={0}
    countProductFavs={0}
  />,
  <ProductCard
    key={3}
    swiperCard={true}
    productId={0}
    manufacturer={''}
    model={''}
    prodYear={0}
    priceGel={0}
    countProductFavs={0}
  />,
  <ProductCard
    key={4}
    swiperCard={true}
    productId={0}
    manufacturer={''}
    model={''}
    prodYear={0}
    priceGel={0}
    countProductFavs={0}
  />,
  <ProductCard
    key={5}
    swiperCard={true}
    productId={0}
    manufacturer={''}
    model={''}
    prodYear={0}
    priceGel={0}
    countProductFavs={0}
  />,
  <ProductCard
    key={6}
    swiperCard={true}
    productId={0}
    manufacturer={''}
    model={''}
    prodYear={0}
    priceGel={0}
    countProductFavs={0}
  />,
  <ProductCard
    key={7}
    swiperCard={true}
    productId={0}
    manufacturer={''}
    model={''}
    prodYear={0}
    priceGel={0}
    countProductFavs={0}
  />,
  <ProductCard
    key={8}
    swiperCard={true}
    productId={0}
    manufacturer={''}
    model={''}
    prodYear={0}
    priceGel={0}
    countProductFavs={0}
  />,
  <ProductCard
    key={9}
    swiperCard={true}
    productId={0}
    manufacturer={''}
    model={''}
    prodYear={0}
    priceGel={0}
    countProductFavs={0}
  />,
  <ProductCard
    key={10}
    swiperCard={true}
    productId={0}
    manufacturer={''}
    model={''}
    prodYear={0}
    priceGel={0}
    countProductFavs={0}
  />
]

// const categories = categoryArray.map((item, key) => <CategoryCard category={item.type} key={key} />)

const MainPage = () => {
  const { latestProducts } = useMain()

  console.log(latestProducts, 'latestProducts')

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
            ბოლოს დამატებული
          </Typography>
          <Typography type='subtitle' color='light' className='mb-12'>
            ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის ყურადღება მიიზიდოს
          </Typography>
        </ContentContainer>
        <FullContainer>
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
                countProductFavs={product?.count_user_favourites}
              />
            ))}
            type='products'
          />
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
