import { useRef, useState } from 'react'

// ** Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Virtual, Navigation, Pagination, Mousewheel, Keyboard, Thumbs, FreeMode, Controller } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { CategoryCardSlider, ProductCardSlider, ProductDetailsSlider } from 'src/@core/configs/swiper'
import Icon from "src/views/app/Icon";

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

const Carousel = ({ itemsArray, type, onClick, singleSlide = false, thumbs = false }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>()
  const prevRef = useRef<HTMLImageElement>(null)
  const nextRef = useRef<HTMLImageElement>(null)
  const swiperRef = useRef<any>(null)

  const handleBreakpoints = () => {
    if (singleSlide === false) {
      if (type === 'categories') return CategoryCardSlider
      if (type === 'products') return ProductCardSlider
      if (type === 'productDetails') return ProductDetailsSlider
    }
  }

  const slideRefs = useRef<Array<HTMLDivElement | null>>([])

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: type === 'productDetails' || 'products' ? 0.1 : 1
  //   }

  //   const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         // @ts-ignore
  //         entry.target.style.opacity = '1'
  //       } else {
  //         // @ts-ignore
  //         entry.target.style.opacity = '0.3'
  //       }
  //     })
  //   }

  //   const observer = new IntersectionObserver(handleIntersection, options)

  //   slideRefs.current.forEach(ref => {
  //     if (ref) {
  //       observer.observe(ref)
  //     }
  //   })

  //   return () => {
  //     observer.disconnect()
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [itemsArray])

  return (
    <>
      <Swiper
        watchSlidesProgress
        ref={swiperRef}

        // @ts-ignore
        breakpoints={handleBreakpoints()}

        // breakpoints={{
        //   320: {
        //     slidesPerView: 'auto'
        //   }
        // }}
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

        // centeredSlides={type === 'productDetails'}
        // loop={loop}
        thumbs={{ swiper: thumbsSwiper }}
      >
        <div className='cursor-pointer shadow-sm absolute top-1/2 -translate-y-1/2 left-[20px] md:left-[8px] w-[46px] h-[46px] md:w-[56px] md:h-[56px] bg-white rounded-[16px] flex items-center justify-center rotate-180 z-50' ref={prevRef}>
          <Icon svgPath='caret-right' width={20} height={20} className="fill-transparent" />
        </div>
        {itemsArray?.map((item, index) => (
          <SwiperSlide key={index}>
            <div ref={element => (slideRefs.current[index] = element)}>{item}</div>
          </SwiperSlide>
        ))}
        <div className='cursor-pointer shadow-sm absolute top-1/2 -translate-y-1/2 right-[20px] md:right-[8px] w-[46px] h-[46px] md:w-[56px] md:h-[56px] bg-white rounded-[16px] flex items-center justify-center z-10' ref={nextRef}>
          <Icon svgPath='caret-right' width={20} height={20} className="fill-transparent" />
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
              <SwiperSlide key={index} className={`${type === 'productDetails' && 'h-full'}`}>
                <div ref={element => (slideRefs.current[index] = element)}>{item}</div>
              </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  )
}

export default Carousel
