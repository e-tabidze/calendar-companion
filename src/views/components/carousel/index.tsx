import { useRef, useState } from 'react'

// ** Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Virtual, Navigation, Pagination, Mousewheel, Keyboard, Thumbs, FreeMode, Controller } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { CategoryCardSlider, ProductCardSlider, ProductDetailsSlider, CardSlider } from 'src/@core/configs/swiper'
import Icon from 'src/views/app/Icon'

interface Props {
  itemsArray: any[]
  type: 'products' | 'categories' | 'productDetails' | 'card'
  loop?: boolean
  onClick?: () => void
  singleSlide?: boolean
  thumbs?: boolean
  pagination?: boolean
  detailSwiper?: boolean
}

SwiperCore.use([Navigation, Pagination, Virtual, Mousewheel, Keyboard, Thumbs, FreeMode, Controller])

const Carousel = ({ detailSwiper, itemsArray, type, onClick, thumbs = false }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>()
  const prevRef = useRef<HTMLImageElement>(null)
  const nextRef = useRef<HTMLImageElement>(null)
  const swiperRef = useRef<any>(null)

  const handleBreakpoints = () => {
    if (type === 'categories') return CategoryCardSlider
    if (type === 'products') return ProductCardSlider
    if (type === 'productDetails') return ProductDetailsSlider
    if (type === 'card') return CardSlider
  }

  const slideRefs = useRef<Array<HTMLDivElement | null>>([])

  return (
    <div className='relative'>
      <Swiper
        watchSlidesProgress
        ref={swiperRef}

        // @ts-ignore
        breakpoints={handleBreakpoints()}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current
        }}
        
        // onSwiper={swiper => handleSlideChange(swiper)}
        onBeforeInit={(swiper: any) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        mousewheel={{
          forceToAxis: true
        }}
        controller={{ control: [] }}
        keyboard={true}
        centeredSlides={type === 'productDetails'}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {itemsArray?.map((item, index) => (
          <SwiperSlide key={index}>
            <div ref={element => (slideRefs.current[index] = element)}>{item}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`${
          detailSwiper ? 'left-5' : 'left-4 md:left-0 lg:left-[-28px]'
        } cursor-pointer shadow-sm absolute top-1/2 -translate-y-1/2 w-[46px] h-[46px] lg:w-[56px] md:h-[56px] bg-white rounded-2xl flex items-center justify-center rotate-180 z-10`}
        ref={prevRef}
      >
        <Icon svgPath='caret-right' width={20} height={20} className='fill-transparent' />
      </div>
      <div
        className={`${
          detailSwiper ? 'right-5' : 'right-4 md:right-0 lg:right-[-28px]'
        } cursor-pointer shadow-sm absolute top-1/2 -translate-y-1/2 w-[46px] h-[46px] lg:w-[56px] md:h-[56px] bg-white rounded-2xl flex items-center justify-center z-10`}
        ref={nextRef}
      >
        <Icon svgPath='caret-right' width={20} height={20} className='fill-transparent' />
      </div>

      {thumbs && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={8}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='mySwiper'
        >
          {itemsArray.map((item, index) => (
            <SwiperSlide key={index} className={`${type === 'productDetails' && 'h-full'}`}>
              <div ref={element => (slideRefs.current[index] = element)} className='ANB' onClick={onClick}>
                {item}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default Carousel
