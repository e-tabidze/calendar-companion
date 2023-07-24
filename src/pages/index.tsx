// ** Interfaces
import { TailwindDiv } from 'src/interfaces/tailwind'
import DefaultLayout from 'src/layouts/DefaultLayout'
import { LargeContainer, ContentContainer, MaxWidthContainer, ResponsiveContainer } from 'src/styled/styles'
import Carousel from 'src/views/components/carousel'
import CategoryCard from 'src/views/components/categoryCard'
import Divider from 'src/views/components/divider'
import ProductCard from 'src/views/components/productCard'
import Typography from 'src/views/components/typography'
import ActionCard from 'src/views/pages/main/actionCard'
import Cities from 'src/views/pages/main/cities'
import Hero from 'src/views/pages/main/hero'

// ** Tailwind Styled
import tw from 'tailwind-styled-components'

// ** Styled Components
const MainPageBox = tw.div<TailwindDiv>`flex w-full items-center flex-col`
const ActionCardsWrapper = tw.div<TailwindDiv>`flex gap-6 flex-col -mt-16 tablet:flex-row tablet:mt-16`

const productArray = [
  <ProductCard key={1} />,
  <ProductCard key={2} />,
  <ProductCard key={3} />,
  <ProductCard key={4} />,
  <ProductCard key={5} />,
  <ProductCard key={6} />,
  <ProductCard key={7} />,
  <ProductCard key={8} />,
  <ProductCard key={9} />,
  <ProductCard key={10} />
]

const categoryArray = [
  {
    id: 1,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 2,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 3,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 4,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 5,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 6,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 7,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 8,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 8,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 8,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 8,
    type: 'ეკონომიური',
    available: 231
  },
  {
    id: 8,
    type: 'ეკონომიური',
    available: 231
  }
]

const categories = categoryArray.map((item, key) => <CategoryCard category={item.type} key={key} />)
const MainPage = () => (
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
        <Carousel itemsArray={categories} type='categories' />
      </ContentContainer>
      <MaxWidthContainer>
        <Divider />
      </MaxWidthContainer>
      <ContentContainer>
        <Typography type='h3' className='mt-12'>
          ბოლოს ნანახი
        </Typography>
        <Typography type='subtitle' color='light' className='mb-12'>
          ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის ყურადღება მიიზიდოს
        </Typography>
        <Carousel itemsArray={productArray} type='products' />
      </ContentContainer>
      <ContentContainer>
        <Typography type='h3' className='mt-12'>
          პოპულარული მანქანები
        </Typography>
        <Typography type='subtitle' color='light' className='mb-12'>
          ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის ყურადღება მიიზიდოს
        </Typography>
        <Carousel itemsArray={productArray} type='products' />
      </ContentContainer>
      <ResponsiveContainer className='mt-20'>
        <Cities />
      </ResponsiveContainer>
      <ContentContainer className='z-10'>
        <ActionCardsWrapper>
          <ActionCard
            title='იქირავე'
            body='ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის ყურადღება მიიზიდოს'
            actioBtnLabel='მოძებნე'
            actonBtnClick={() => console.log('click')}
            image='/images/rent.png'
          />
          <ActionCard
            title='გააქირავე'
            body='ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის ყურადღება მიიზიდოს'
            actioBtnLabel='დაამატე'
            actonBtnClick={() => console.log('click')}
            image='/images/rent2.png'
          />
        </ActionCardsWrapper>
      </ContentContainer>
    </MainPageBox>
  </DefaultLayout>
)

export default MainPage
