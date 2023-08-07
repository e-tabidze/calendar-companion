import { useEffect, useRef, useState } from 'react'

// ** Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Virtual, Navigation, Pagination, Mousewheel, Keyboard, Thumbs, FreeMode, Controller } from 'swiper'

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

SwiperCore.use([Navigation, Pagination, Virtual, Mousewheel, Keyboard, Thumbs, FreeMode, Controller])

const Carousel = ({
  itemsArray,
  type,
  loop = false,
  onClick,
  singleSlide = false,
  thumbs = false,
  pagination
}: Props) => {
  const { width } = useWindowDimensions()
  const [activeIndices, setActiveIndices] = useState([])
  const [thumbsSwiper, setThumbsSwiper] = useState<any>()
  const prevRef = useRef<HTMLImageElement>(null)
  const nextRef = useRef<HTMLImageElement>(null)
  const swiperRef = useRef(null)

  const handleSlideChange = (swiper: any) => {
    const activeSlides = swiper.realIndex + 1
    console.log('Number of active slides:', activeSlides)
  }

  // useEffect(() => {
  //   if (activeIndex === 0) prevRef.current?.classList.add('hidden')
  //   else {
  //     prevRef.current?.classList.remove('hidden')
  //   }
  // }, [activeIndex])

  // const handleSetSlider = (e: any) => {
  //   setActiveIndex(e.activeIndex)
  // }

  // const handleSlideChange = () => {
  //   const slides = document.querySelectorAll('.swiper-slide')

  //   slides.forEach(slide => {
  //     const slideRect = slide.getBoundingClientRect()
  //     const isVisible = slideRect.right <= window.innerWidth
  //     console.log(isVisible, 'isVisible <===')

  //     if (isVisible) {
  //       slide.classList.remove('hidden')
  //     } else {
  //       slide.classList.add('hidden')
  //     }
  //   })
  // }

  // const handleActiveSlides = (index: number) => {
  //   if (type === 'products') {
  //     if (width < 530) return `${activeIndex - 1 === index || activeIndex + 1 === index ? 'opacity-30' : ''}`
  //     if (width > 529 && width < 1024)
  //       return `${activeIndex - 1 === index || activeIndex + 2 === index ? 'opacity-30' : ''}`
  //     if (width > 1023) return `${activeIndex - 1 === index || activeIndex + 3 === index ? 'opacity-30' : ''}`
  //   }
  //   if (type === 'categories') {
  //     if (width < 640) return `${activeIndex - 1 === index || activeIndex + 2 === index ? 'opacity-30' : ''}`
  //     if (width > 639 && width < 768)
  //       return `${activeIndex - 1 === index || activeIndex + 3 === index ? 'opacity-30' : ''}`
  //     if (width > 767 && width < 1024)
  //       return `${activeIndex - 1 === index || activeIndex + 4 === index ? 'opacity-30' : ''}`
  //     if (width > 1023 && width < 1280)
  //       return `${activeIndex - 1 === index || activeIndex + 5 === index ? 'opacity-30' : ''}`
  //     if (width > 1280) return `${activeIndex - 1 === index || activeIndex + 6 === index ? 'opacity-30' : ''}`
  //   }
  //   if (type === 'productDetails')
  //     return `${activeIndex - 1 === index || activeIndex + 1 === index ? 'opacity-30' : ''}`
  // }

  const breakpoints = {
    320: {
      slidesPerView: 'auto'
      // spaceBetween: 20
    },
    // 480: {
    //   slidesPerView: 'auto'
    //   // spaceBetween: 30
    // },
    // 640: {
    //   slidesPerView: 'auto'
    //   // spaceBetween: 40
    // }
  }

  const handleBreakpoints = () => {
    if (singleSlide === false) {
      if (type === 'categories') return CategoryCardSlider
      if (type === 'products') return ProductCardSlider
      if (type === 'productDetails') return ProductDetailsSlider
    }
  }

  console.log(activeIndices, 'actives')


  return (
    <>
      <Swiper
        className='w-full relative flex justify-between !overflow-visible'
        watchSlidesProgress
        // breakpoints={handleBreakpoints()}
        // breakpoints={{
        //   320: {
        //     slidesPerView: 'auto',
        //     spaceBetween: 20
        //   }
        // }}
        breakpoints={breakpoints}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current
        }}
        // onSlideChange={handleSlideChange}
        onSwiper={swiper => handleSlideChange(swiper)}
        onBeforeInit={(swiper: any) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        mousewheel={{
          forceToAxis: true
        }}
        controller={{ control: [] }}
        // onActiveIndexChange={handleSetSlider}
        keyboard={true}
        centeredSlides={type === 'productDetails'}
        loop={loop}
        thumbs={{ swiper: thumbsSwiper }}
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
          // <SwiperSlide key={index} className={`w-fit ${handleActiveSlides(index)}`} onClick={onClick}>
          //   {item}
          // </SwiperSlide>
          <SwiperSlide key={index} className="!w-fit">
            {({ isVisible }) => <div className={`${isVisible} ? '' : 'opacity-30' mx-4`}>{item}</div>}
          </SwiperSlide>
          // <SwiperSlide key={index}>
          //   {/* <div className={activeIndices.includes(index) ? '' : 'opacity-30'}>{item}</div> */}
          // </SwiperSlide>
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
            <SwiperSlide key={index} className='mt-12 snap-start' onClick={onClick}>
              {item}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  )
}

export default Carousel
