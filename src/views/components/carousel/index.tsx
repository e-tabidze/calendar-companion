import { useEffect, useRef, useState } from 'react'

// ** Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Virtual, Navigation, Pagination, Mousewheel, Keyboard, Thumbs, FreeMode } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { IconButton } from '../button'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { CategoryCardSlider, ProductCardSlider, ProductDetailsSlider } from 'src/@core/configs/swiper'

interface Props {
  itemsArray: any[]
  type: 'products' | 'categories' | 'productDetails'
  loop?: boolean
  onClick?: () => void
  singleSlide?: boolean
  thumbs?: boolean
  pagination?: boolean
}

SwiperCore.use([Navigation, Pagination, Virtual, Mousewheel, Keyboard, Thumbs, FreeMode])

const Carousel = ({
  itemsArray,
  type,
  loop = false,
  onClick,
  singleSlide = false,
  thumbs = false,
}: Props) => {
  const { width } = useWindowDimensions()
  const [activeIndex, setActiveIndex] = useState(0)
  const prevRef = useRef<HTMLImageElement>(null)
  const nextRef = useRef<HTMLImageElement>(null)
  const [thumbsSwiper, setThumbsSwiper] = useState<any>()

  useEffect(() => {
    if (activeIndex === 0) prevRef.current?.classList.add('hidden')
    else {
      prevRef.current?.classList.remove('hidden')
    }
  }, [activeIndex])

  const handleSetSlider = (e: any) => {
    setActiveIndex(e.activeIndex)
  }

  const handleActiveSlides = (index: number) => {
    if (type === 'products') {
      if (width < 530) return `${activeIndex - 1 === index || activeIndex + 1 === index ? 'opacity-30' : ''}`
      if (width > 529 && width < 1024)
        return `${activeIndex - 1 === index || activeIndex + 2 === index ? 'opacity-30' : ''}`
      if (width > 1023) return `${activeIndex - 1 === index || activeIndex + 3 === index ? 'opacity-30' : ''}`
    }
    if (type === 'categories') {
      if (width < 640) return `${activeIndex - 1 === index || activeIndex + 2 === index ? 'opacity-30' : ''}`
      if (width > 639 && width < 768)
        return `${activeIndex - 1 === index || activeIndex + 3 === index ? 'opacity-30' : ''}`
      if (width > 767 && width < 1024)
        return `${activeIndex - 1 === index || activeIndex + 4 === index ? 'opacity-30' : ''}`
      if (width > 1023 && width < 1280)
        return `${activeIndex - 1 === index || activeIndex + 5 === index ? 'opacity-30' : ''}`
      if (width > 1280) return `${activeIndex - 1 === index || activeIndex + 6 === index ? 'opacity-30' : ''}`
    }
    if (type === 'productDetails')
      return `${activeIndex - 1 === index || activeIndex + 1 === index ? 'opacity-30' : ''}`
  }

  const handleBreakpoints = () => {
    if (singleSlide === false) {
      if (type === 'categories') return CategoryCardSlider
      if (type === 'products') return ProductCardSlider
      if (type === 'productDetails') return ProductDetailsSlider
    }
  }

  return (
    <>
      <Swiper
        className='w-full relative flex justify-between'
        breakpoints={handleBreakpoints()}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current
        }}
        onBeforeInit={(swiper: any) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        onActiveIndexChange={handleSetSlider}
        keyboard={true}
        centeredSlides={type === 'productDetails'}
        loop={loop}
        thumbs={{ swiper: thumbsSwiper }}

        // pagination={{
        //   type: 'custom',
        //   renderCustom: function (swiper, current, total) {
        //     return pagination ? `<span class="custom-pagination">${current + '/' + (total - 1) + '-დან'}</span>` : null
        //   }
        // }}
      >
        <div className='absolute inset-y-0 left-16 mobile:left-2 flex items-center rotate-180 z-50' ref={prevRef}>
          <IconButton
            icon='/icons/chevronRight.svg'
            width={width > 779 ? 14 : 12}
            height={width > 779 ? 14 : 12}
            bg='white'
          />
        </div>
        {itemsArray.map((item, index) => (
          <SwiperSlide key={index} className={`w-fit ${handleActiveSlides(index)}`} onClick={onClick}>
            {item}
          </SwiperSlide>
        ))}
        <div className='absolute inset-y-0 right-16 mobile:right-2 flex items-center z-10' ref={nextRef}>
          <IconButton
            icon='/icons/chevronRight.svg'
            width={width > 779 ? 14 : 12}
            height={width > 779 ? 14 : 12}
            bg='white'
          />
        </div>
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
          className='mySwiper'
        >
          {itemsArray.map((item, index) => (
            <SwiperSlide key={index} className='mt-12' onClick={onClick}>
              {item}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  )
}

export default Carousel
