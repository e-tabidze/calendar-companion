import { useRef, useState } from 'react'

// ** Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectFade, Virtual, Navigation, Pagination, Mousewheel, Keyboard, Thumbs, FreeMode, Controller } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

import {
  CategoryCardSlider,
  ProductCardSlider,
  ProductDetailsSlider,
  CardSlider,
  GallerySlider
} from 'src/@core/configs/swiper'

// import Icon from 'src/views/app/Icon'

interface Props {
  itemsArray: any[]
  type: 'products' | 'categories' | 'productDetails' | 'card' | 'gallery'
  loop?: boolean
  onClick?: () => void
  thumbs?: boolean
  pagination?: boolean
}

SwiperCore.use([Navigation, Pagination, Virtual, Mousewheel, Keyboard, Thumbs, FreeMode, Controller])

const Carousel = ({ itemsArray, type, onClick, thumbs = false }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>()

  // const prevRef = useRef<HTMLImageElement>(null)
  // const nextRef = useRef<HTMLImageElement>(null)
  const swiperRef = useRef<any>(null)

  const handleBreakpoints = () => {
    if (type === 'categories') return CategoryCardSlider
    if (type === 'products') return ProductCardSlider
    if (type === 'productDetails') return ProductDetailsSlider
    if (type === 'card') return CardSlider
    if (type === 'gallery') return GallerySlider
  }
  const [swiper, setSwiper] = useState<any>(null)

  const pagination = {
    clickable: true,

    // clickableClass: `flex justify-center items-center gap-2 !bottom-3 !z-[30] px-4`,
    bulletClass: `bullet rounded-2xl w-2 h-2 lg:w-1/5 lg:h-1 flex border-0 bg-white opacity-0 group-hover:opacity-90 transition-all duration-200`,
    bulletActiveClass: `!lg:w-1/5 !lg:h-1 !bg-orange-100`,

    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '"></span>'
    }
  }

  return (
    <div className='relative'
         onMouseLeave={() => {
      if (type==='card') {
        swiper.slideTo(0, 100)
      }
    }}
    >
      <Swiper
        className={`${type === 'card' ? 'arrows-sm' : 'arrows-lg'} ${(type === 'products') || (type ==='categories') ? 'main-swiper' : ''}`}
        watchSlidesProgress
        ref={swiperRef}
        breakpoints={handleBreakpoints()}
        modules={[Navigation, Pagination, EffectFade]}
        navigation={true}
        effect = {type === 'card' ? 'fade' : '' }
        pagination = {type === 'card' && pagination}
        onInit={swiper => {
          setSwiper(swiper)
        }}

        // navigation={{
        //   prevEl: prevRef.current,
        //   nextEl: nextRef.current
        // }}
        // onSwiper={(swiper: any) => {
        //   swiper.params.navigation.prevEl = prevRef.current
        //   swiper.params.navigation.nextEl = nextRef.current
        // }}

        mousewheel={{
          forceToAxis: true
        }}
        controller={{ control: [] }}
        keyboard={true}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {itemsArray?.map((item, index) => (
          <SwiperSlide key={index} onClick={onClick} className='group relative'>
            {item}
          </SwiperSlide>
        ))}
        {/* hidden pillars */}
        {type === 'card' &&
        <div className='absolute left-0 top-0 z-[1] hidden h-full w-full cursor-pointer md:flex'>
          {itemsArray?.map((_, index) => {
            return (
              <div
              key={index}
              className='left-0 top-0 z-10 h-full flex-1 flex'
              onMouseEnter={() => {
                setTimeout(() => {
                  swiper.slideTo(index, 150);
                }, 500); // Adjust the delay time (in milliseconds) as needed
              }}
            ></div>
            )
          })}
        </div>
        }

      </Swiper>

      {/*<div*/}
      {/*  onClick={(e: any) => {*/}
      {/*    e.stopPropagation()*/}
      {/*    e.preventDefault()*/}
      {/*  }}*/}
      {/*  className={`*/}
      {/*   ${*/}
      {/*     type === 'categories' || type === 'products'*/}
      {/*       ? 'w-[46px] h-[46px] lg:w-14 md:h-14 left-4 md:left-0 lg:left-[-28px]'*/}
      {/*       : ''*/}
      {/*   }*/}
      {/*   */}
      {/*  ${type === 'productDetails' ? 'w-[46px] h-[46px] lg:w-14 md:h-14 left-5' : ''}*/}
      {/*  ${type === 'card' ? 'hidden md:flex w-6 h-6 left-4' : ''}*/}
      {/*  cursor-pointer shadow-sm absolute inset-y-0 top-1/2 -translate-y-1/2 bg-white rounded-2xl flex items-center justify-center z-10`}*/}
      {/*  ref={prevRef}*/}
      {/*>*/}
      {/*  {type === 'card' ? (*/}
      {/*    <Icon svgPath='caret-l' width={7} height={9} className='fill-transparent' />*/}
      {/*  ) : (*/}
      {/*    <Icon svgPath='caret-left' width={26} height={26} className='fill-transparent' />*/}
      {/*  )}*/}
      {/*</div>*/}
      {/*<div*/}
      {/*  onClick={(e: any) => {*/}
      {/*    e.stopPropagation()*/}
      {/*    e.preventDefault()*/}
      {/*  }}*/}
      {/*  className={`*/}
      {/*     ${*/}
      {/*       type === 'categories' || type === 'products'*/}
      {/*         ? 'w-[46px] h-[46px] lg:w-14 md:h-14 right-4 md:right-0 lg:right-[-28px]'*/}
      {/*         : ''*/}
      {/*     }*/}
      {/*   */}
      {/*  ${type === 'productDetails' ? 'w-[46px] h-[46px] lg:w-14 md:h-14 right-5' : ''}*/}
      {/*  ${type === 'card' ? 'hidden md:flex w-6 h-6 right-4' : ''}*/}
      {/*  cursor-pointer shadow-sm absolute inset-y-0 top-1/2 -translate-y-1/2  bg-white rounded-2xl flex items-center justify-center z-10`}*/}
      {/*  ref={nextRef}*/}
      {/*>*/}
      {/*  {type === 'card' ? (*/}
      {/*    <Icon svgPath='caret-r' width={7} height={9} className='fill-transparent' />*/}
      {/*  ) : (*/}
      {/*    <Icon svgPath='caret-right' width={26} height={26} className='fill-transparent' />*/}
      {/*  )}*/}
      {/*</div>*/}

      {thumbs && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={8}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='gallery-thumbs mt-6 md:!flex !hidden'
        >
          {itemsArray.map((item, index) => (
            <SwiperSlide key={index} className={`${type === 'productDetails' && 'h-full'}`}>
              {item}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default Carousel
