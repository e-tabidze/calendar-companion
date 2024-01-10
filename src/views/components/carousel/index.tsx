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
import Icon from "src/views/app/Icon";

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

  const [reachedLimit, setReachedLimit] = useState(false)

  // const shouldShowArrow = (reachedLimit: boolean, imageList: string[]): boolean => {
  //   return reachedLimit || imageList.length <= 1
  // }



  const data = type === 'card' ? itemsArray.slice(0, 4) : itemsArray

  return (

    <div className={`${type==='card' ? 'group':''} relative`}
         onMouseLeave={() => {
        if (type==='card') {
          swiper.slideTo(0, 100)
        }
    }}
    >


      <Swiper
        className={`${(type === 'products') || (type ==='categories') ? 'main-swiper' : ''} ${type === 'productDetails' ? 'details-swiper':''}`}
        watchSlidesProgress
        ref={swiperRef}
        breakpoints={handleBreakpoints()}
        modules={[Navigation, Pagination, EffectFade]}
        navigation= {type === 'card' ? false : true}
        effect = {type === 'card' ? 'fade' : '' }
        pagination={type === 'card' ? pagination : (type === 'productDetails' || type === 'gallery') && {type:'fraction'}}
        centeredSlides={type==='productDetails'}
        loop={type==='productDetails'}
        onInit={swiper => {
          setSwiper(swiper)
        }}
        onSlideChange={() => {
          if (type==='card') {

            if (swiper.activeIndex + 1 && itemsArray.length > 4) {
              setReachedLimit(true)
            } else {
              setReachedLimit(false)
            }
          }

          // if (swiper.activeIndex > 0) {
          //   setIsStart(false)
          // } else {
          //   setIsStart(true)
          // }
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
        {data?.slice(0, 4).map((item, index) => (

          <SwiperSlide key={index} onClick={onClick} className='relative'>
            {item}
            {/* additional images overlay */}
            {type === 'card' &&
            <div
                className={`${reachedLimit ? 'flex' : 'hidden'} rounded-tl-3xl rounded-tl-3xl rounded-tr-3xl absolute left-0 top-0 h-full w-full bg-black/50 z-[111] cursor-pointer`}>
              <div className='flex flex-1 flex-col items-center justify-center'>
                <Icon svgPath='camera' width={64} height={64}/>
                <span className='mt-2 text-sm text-white'>{`+${itemsArray.length - 4} ფოტო`}</span>
              </div>
            </div>
            }

          </SwiperSlide>
        ))}


        {type === 'card' &&
            <>
              {/* overlay */}
              <div className='pointer-events-none absolute left-0 top-0 z-10 block h-full w-full bg-card-overlay'></div>

              {/* hidden pillars */}
              <div className='absolute left-0 top-0 z-[1] hidden h-full w-full cursor-pointer md:flex'>
                {data?.map((_, index) => {
                  return (
                      <div
                          key={index}
                          className='left-0 top-0 z-10 h-full flex-1 flex'
                          onMouseEnter={() => {
                            setTimeout(() => {
                              swiper.slideTo(index, 150);

                            }, 100); // Adjust the delay time (in milliseconds) as needed
                          }}
                      ></div>
                  )
                })}
              </div>
            </>

        }
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
