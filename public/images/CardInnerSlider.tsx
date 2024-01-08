import { useRef, useState } from 'react'

import { isMobile } from 'react-device-detect'
import { Swiper, SwiperSlide } from 'swiper/react'

// import Image from 'next/image'

import { ChevronLeftIcon, TablerCameraIcon } from '@myhome/assets'
import { cardImageConstructor } from 'src/helpers/image-constructor'
import { EffectFade, Navigation, Pagination } from 'swiper/modules'

import { Overlay } from '@myhome/components/overlay/Overlay'

import { HideCard } from '../ads-card/HideCard'
import { SeenLabel } from '../ads-card/SeenLabel'
import { shouldShowArrow, shouldShowMoreImagesOverlay } from '../helpers'
import { BuildStatus } from '../index'
import { InnerSliderProps } from '../interface'
import { AddToFavorites } from './AddToFavorites'
import { LabelContainer } from './LabelContainer'
import { InnerSliderIconStyled } from './styles'

export const CardInnerSlider: React.FC<InnerSliderProps> = props => {
  const { slidesLimit, type, vipType, isVisited, badges, imagesInfo, tooltipPosition, disableAddToFavorites } = props

  const imageList =
    imagesInfo === undefined ? [] : cardImageConstructor(props.id, imagesInfo, type as 'project' | 'ads')

  // Ads
  const id = type === 'ads' && props.id

  const totalSlides = imageList.length

  const [swiper, setSwiper] = useState<any>(null)
  const [reachedLimit, setReachedLimit] = useState(false)
  const [isStart, setIsStart] = useState(true)

  const pagination = {
    clickable: true,
    clickableClass: 'flex justify-center items-center gap-2 !bottom-3 !z-[30] px-4',
    bulletClass: `bullet rounded-2xl w-2 h-2 lg:w-1/5 lg:h-1 flex border-0 bg-white opacity-0 group-hover:opacity-90 transition-all duration-200`,
    bulletActiveClass: `!lg:w-1/5 !lg:h-1 !bg-primary-90`,

    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '"></span>'
    }
  }

  //   INIT BUTTONS
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <div
      className='relative z-10 h-full w-full'
      onMouseLeave={() => {
          swiper.slideTo(0, 100)
      }}
    >
      <Swiper
        slidesPerView={1}
        effect='fade'
        onSlideChange={() => {
          if (shouldShowMoreImagesOverlay(slidesLimit, swiper, imageList)) {
            setReachedLimit(true)
          } else {
            setReachedLimit(false)
          }

          if (swiper.activeIndex > 0) {
            setIsStart(false)
          } else {
            setIsStart(true)
          }
        }}
        onInit={swiper => {
          setSwiper(swiper)
        }}
        className='relative h-full'
        pagination={pagination}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current
        }}
        modules={[Navigation, Pagination, EffectFade]}
      >
        {imageList.slice(0, slidesLimit).map((item, index) => {
          return (
            <SwiperSlide key={index} className='relative z-10'>
              {/* <Image
                src={item}
                alt='building'
                fill
                quality={50}
                loading='lazy'
                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw'
                className='rounded-t-xl border-l border-r border-transparent object-cover'
              /> */}
              
              <img
                src={item}
                alt='building'
                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw'
                className='rounded-t-xl border-l border-r border-transparent object-cover h-full w-full'
              />


              {/* additional images overlay */}
              <Overlay className={`${reachedLimit ? 'flex' : 'hidden'} z-20 cursor-pointer`}>
                <div className='flex flex-1 flex-col items-center justify-center'>
                  <TablerCameraIcon className='h16 w-16 fill-white' />
                  <span className='mt-2 text-sm text-white'>{`+${totalSlides - slidesLimit} ფოტო`}</span>
                </div>
              </Overlay>
            </SwiperSlide>
          )
        })}

        {/* Label Container */}
        {/* TODO: remove any */}
        <div className={`absolute right-0 top-0 z-10 h-10 w-full ${!reachedLimit ? 'opacity-100' : 'opacity-0'}`}>
          {type === 'project' && (
            <div className='mx-4 mt-4 flex items-center justify-between'>
              <BuildStatus type={props.buildStatus} />
            </div>
          )}

          <div className='flex justify-between'>
            {type === 'ads' && <LabelContainer vipType={vipType} badges={badges} className='ml-3 mt-3 flex gap-1.5' />}
          </div>
        </div>

        {/* navigation buttons */}
        <div className='pointer-events-none absolute left-0 top-0 z-10 block h-full w-full marker:xl:hidden'>
          {/* PREV BUTTON */}
          <div className='flex lg:hidden h-full items-center justify-between px-3'>
            <div
              className={`pointer-events-auto flex h-14 w-14 cursor-pointer items-center transition-opacity duration-300 md:h-auto md:w-auto ${
                isStart ? 'opacity-0' : 'opacity-100'
              }`}
              ref={prevRef}
            >
              <InnerSliderIconStyled
                className='rotate-180'
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <ChevronLeftIcon className='h-[11px] w-[7px] fill-white' />
              </InnerSliderIconStyled>
            </div>
            {/* NEXT BUTTON */}
            <div
              className={`pointer-events-auto flex h-14 w-14 cursor-pointer items-center justify-end transition-opacity duration-300 md:h-auto md:w-auto ${
                shouldShowArrow(reachedLimit, imageList) ? 'opacity-0' : 'opacity-100'
              }`}
              ref={nextRef}
            >
              <InnerSliderIconStyled
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <ChevronLeftIcon className='h-[11px] w-[7px] fill-white' />
              </InnerSliderIconStyled>
            </div>
          </div>
        </div>

        {/* overlay */}
        <div className='pointer-events-none absolute left-0 top-0 z-10 block h-full w-full bg-card-overlay'></div>

        {/* hidden pillars */}
        <div className='absolute left-0 top-0 z-[1] hidden h-full w-full cursor-pointer md:flex'>
          {imageList.map((_, index) => {
            return (
              <div
                key={index}
                className={`left-0 top-0 z-10 h-full flex-1 ${index > 3 ? 'hidden' : 'flex'}`}
                onMouseEnter={() => {
                  swiper.slideTo(index, 150)
                }}
              ></div>
            )
          })}
        </div>

        {/* favorite heart */}
        <div className='absolute right-0 top-0 z-10 h-12 w-3/4'>
          <div className='flex items-center justify-end gap-2'>
            {type === 'ads' && id && props.onHideCard && !props.disableHide && (
              <HideCard
                iconType='duo'
                wrapperClassName='mt-3.5 opacity-100 md:opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                iconClassName='fill-white w-7 h-7'
                tooltipPosition={tooltipPosition}
                onHideCard={props.onHideCard}
                cardId={+props.id}
              />
            )}
            {type === 'ads' && id && !disableAddToFavorites && (
              <AddToFavorites
                cardId={id}
                className='mr-3 mt-3.5'
                positionStrategy={props.positionStrategy}
                tooltipPosition={tooltipPosition}
                iconActiveClassName={props.iconActiveClassName}
                iconClassName={props.iconClassName}
              />
            )}
          </div>
        </div>

        {/* Card seen state */}
        {type === 'ads' && isVisited && <SeenLabel />}
      </Swiper>
    </div>
  )
}
