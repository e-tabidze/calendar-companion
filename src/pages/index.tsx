import { dehydrate } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'
import useFilters from 'src/hooks/useFilters'
import { TailwindDiv } from 'src/interfaces/tailwind'
import DefaultLayout from 'src/layouts/DefaultLayout'
import { LargeContainer, ContentContainer, ResponsiveContainer } from 'src/styled/styles'
import Divider from 'src/views/components/divider'
import useMain from 'src/views/pages/main/useMain'

const PageMeta = dynamic(() => import('src/@core/meta/PageMeta'), { ssr: true })

const ProductCard = dynamic(() => import('src/views/components/productCard'), { ssr: true })
const CategoryItem = dynamic(() => import('src/views/components/categoryItem'), { ssr: true })
const Carousel = dynamic(() => import('src/views/components/carousel'), { ssr: true })
const Hero = dynamic(() => import('src/views/pages/main/hero'), { ssr: true })
const Cities = dynamic(() => import('src/views/pages/main/cities'), { ssr: true })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: true })

// ** Tailwind Styled
import tw from 'tailwind-styled-components'
import { queryClient } from './_app'

const pageMeta = {
  title: 'Rent.myauto.ge | მანქანის ქირაობის პლატფორმა',
  desc: '',
  img: ''
}

// ** Styled Components
const MainPageBox = tw.div<TailwindDiv>`flex w-full items-center flex-col overflow-hidden`

const MainPage = () => {
  const { popularProducts, lastSeenProducts } = useMain()

  const { categoriesFilter } = useFilters()

  const { t } = useTranslation()

  return (
    <DefaultLayout>
      <PageMeta meta={pageMeta} />

      <MainPageBox>
        <LargeContainer className='xl:px-0'>
          <Hero />
        </LargeContainer>
        {categoriesFilter?.filter((product: any) => product?.count_products > 0) && (
          <ContentContainer>
            <Typography type='h3' className='text-3md md:text-2lg mt-12 mb-8'>
              აირჩიე სასურველი კატეგორია
              {t('easiest_way_to_your_new_home')}
            </Typography>
          </ContentContainer>
        )}
        <ContentContainer className='px-0 md:px-5 lg:px-8 mb-12'>
          <Carousel
            itemsArray={categoriesFilter
              ?.sort(
                (a: { count_products: number }, b: { count_products: number }) => b.count_products - a.count_products
              )
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
        {popularProducts?.length > 0 && (
          <ContentContainer>
            <Typography type='h3' className='text-3md md:text-2lg mt-12 mb-8'>
              პოპულარული ავტომობილები
              {t('home_page_popular_products.test_text')}
            </Typography>
          </ContentContainer>
        )}
        <ContentContainer className='px-0 md:px-5 lg:px-8'>
          <Carousel
            itemsArray={popularProducts?.map((product: any) => (
              <ProductCard
                key={product?.id}
                productId={product?.id}
                manufacturer={product?.manufacturer?.title}
                model={product?.manufacturer_model?.title}
                prodYear={product?.prod_year}
                priceGel={product?.price_gel}
                luggageNumbers={product?.luggage_numbers}
                seats={product?.seat_type?.title}
                images={product?.images?.split(',')}
                city={product?.start_city}
                isProductInFavorites={product.is_favourite}
              />
            ))}
            type='products'
          />
        </ContentContainer>
        {lastSeenProducts?.length > 0 && (
          <ContentContainer>
            <Typography type='h3' className='text-3md md:text-2lg mt-12 mb-8'>
              ბოლოს ნანახი
            </Typography>
          </ContentContainer>
        )}

        <ContentContainer className='px-0 md:px-5 lg:px-8'>
          <Carousel
            itemsArray={lastSeenProducts?.map((product: any) => (
              <ProductCard
                key={product?.product?.id}
                productId={product?.product?.id}
                manufacturer={product?.product?.manufacturer?.title}
                model={product?.product?.manufacturer_model?.title}
                prodYear={product?.product?.prod_year}
                priceGel={product?.product?.price_gel}
                luggageNumbers={product?.product?.luggage_numbers}
                seats={product?.product?.seat_type?.title}
                images={product?.product?.images?.split(',')}
                city={product?.product?.start_city}
                isProductInFavorites={product?.product?.is_favourite}
              />
            ))}
            type='products'
          />
        </ContentContainer>
        <ResponsiveContainer className='mt-16 md:mt-24'>
          <Cities />
        </ResponsiveContainer>
      </MainPageBox>
    </DefaultLayout>
  )
}

export default MainPage

export async function getServerSideProps({ locale }: { locale: string }) {
  const [translations] = await Promise.all([serverSideTranslations(locale)])

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...translations
    }
  }
}
