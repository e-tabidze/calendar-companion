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
    <div
      className='relative'
      onMouseLeave={() => {
        if (type === 'card') {
          swiper.slideTo(0, 100)
        }
      }}
    >
      <Swiper
        className={`${type === 'card' ? 'arrows-sm' : 'arrows-lg'} ${
          type === 'products' || type === 'categories' ? 'main-swiper' : ''
        }`}
        watchSlidesProgress
        ref={swiperRef}
        breakpoints={handleBreakpoints()}
        modules={[Navigation, Pagination]}
        navigation={true}
        pagination={type === 'card' && pagination}
        onInit={swiper => {
          setSwiper(swiper)
        }}
        mousewheel={{
          forceToAxis: true
        }}
        controller={{ control: [] }}
        keyboard={type === 'categories' || type === "products"}
        thumbs={{ swiper: thumbsSwiper }}
        speed={1000}
      >
        {itemsArray?.map((item, index) => (
          <SwiperSlide key={index} onClick={onClick} className='group relative'>
            {item}
          </SwiperSlide>
        ))}

        {/* hidden pillars */}
        {type === 'card' && (
          <div className='absolute left-0 top-0 z-[1] hidden h-full w-full cursor-pointer md:flex'>
            {itemsArray?.map((_, index) => {
              return (
                <div
                  key={index}
                  className='left-0 top-0 z-10 h-full flex-1 flex'
                  onMouseEnter={() => {
                    swiper.slideTo(index, 150)
                  }}
                ></div>
              )
            })}
          </div>
        )}
      </Swiper>

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
