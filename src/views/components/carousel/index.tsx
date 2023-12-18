import { useRef, useState } from 'react'

// ** Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Virtual, Navigation, Pagination, Mousewheel, Keyboard, Thumbs, FreeMode, Controller } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

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
  type: 'products' | 'categories' | 'productDetails' | 'card' |'gallery'
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

  return (
    <div className='relative'>
      <Swiper
        className={`${type === 'card'? 'arrows-sm' : 'arrows-lg'}`}
        watchSlidesProgress
        ref={swiperRef}
        breakpoints={handleBreakpoints()}
        modules={[Navigation]}
        navigation={true}

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
        centeredSlides={type==='productDetails'}
        loop={type==='productDetails'}
        controller={{ control: [] }}
        keyboard={true}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {itemsArray?.map((item, index) => (
          <SwiperSlide key={index} onClick={onClick}>
            {item}
          </SwiperSlide>
        ))}
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
          className='gallery-thumbs mt-6'
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
