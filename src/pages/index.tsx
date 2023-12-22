import { dehydrate } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
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

const PageMeta = dynamic(() => import('src/@core/meta/PageMeta'), { ssr: true })

// ** Tailwind Styled
import tw from 'tailwind-styled-components'
import { queryClient } from './_app'

const pageMeta = {
  title: 'Rent.myauto.ge | მანქანის ქირაობის პლატფორმა',
  desc: '',
  img: ''
}

// ** Styled Components
const MainPageBox = tw.div<TailwindDiv>`flex w-full items-center flex-col`

const MainPage = () => {
  const { popularProducts, lastSeenProducts } = useMain()

  console.log(lastSeenProducts, 'lastSeenProducts')

  const { categoriesFilter } = useFilters()

  return (
    <DefaultLayout>
      {/* <AuthModal open={authModal} close={() => setAuthModal(false)} handleCancel={() => setAuthModal(false)} /> */}
      <PageMeta meta={pageMeta} />

      <MainPageBox>
        <LargeContainer>
          <Hero />
        </LargeContainer>
        {/* <button onClick={() => setAuthModal(true)}>AUTHMODAL OPEN</button> */}
        <ContentContainer>
          <Typography type='h3' className='text-3md md:text-2lg mt-12'>
            აირჩიე სასურველი კატეგორია
          </Typography>
        </ContentContainer>
        <ContentContainer className='px-0 md:px-5 lg:px-8 mb-12'>
          <Carousel
            itemsArray={categoriesFilter
              ?.filter((product: any) => product?.count_products > 0)
              ?.map((product: any) => (
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
          <Typography type='h3' className='text-3md md:text-2lg mt-12'>
            პოპულარული ავტომობილები
          </Typography>
        </ContentContainer>
        <ContentContainer className='px-0 md:px-5 lg:px-8'>
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
                images={product?.images?.split(',')}
              />
            ))}
            type='products'
          />
        </ContentContainer>
        <ContentContainer>
          <Typography type='h3' className='text-3md md:text-2lg mt-12'>
            ბოლოს ნანახი
          </Typography>
        </ContentContainer>
        <ContentContainer className='px-0 md:px-5 lg:px-8'>
          <Carousel
            itemsArray={lastSeenProducts?.map((product: any) => (
              <ProductCard
                key={product?.product?.id}
                swiperCard={true}
                productId={product?.product?.id}
                manufacturer={product?.product?.manufacturer?.title}
                model={product?.product?.manufacturer_model?.title}
                prodYear={product?.product?.prod_year}
                priceGel={product?.product?.price_gel}
                luggageNumbers={product?.product?.luggage_numbers}
                seats={product?.product?.seat_type?.title}
                images={product?.product?.images?.split(',')}
              />
            ))}
            type='products'
          />
        </ContentContainer>
        <ResponsiveContainer className='mt-16 md:mt-20'>
          <Cities />
        </ResponsiveContainer>
      </MainPageBox>
    </DefaultLayout>
  )
}

export default MainPage

export async function getStaticProps({ locale }: { locale: string }) {
  const [translations] = await Promise.all([serverSideTranslations(locale)])

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...translations
    }
  }
}
