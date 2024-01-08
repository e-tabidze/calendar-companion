import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import dynamic from 'next/dynamic'

const Image = dynamic(() => import('src/views/components/image'), { ssr: true })
import { isMobile } from 'react-device-detect'

SwiperCore.use([Navigation])

export const CardSlider = ({ id, photos, slidesPerView = 4 }) => {
  const { t } = useTranslation()

  const remainingSlidesCount = photos.length - slidesPerView


  if (isMobile) {
    return (
      <Fragment>
        {!!photos.length && (
          <div className="flex md:h-full md:pl-[16px] container">
            <Swiper
              cssMode={true}
              freeMode={true}
              slidesPerView={'auto'}
              spaceBetween={12}
              className=""
            >
              {photos.slice(0, slidesPerView).map(({ thumbs }, idx) => (
                <SwiperSlide
                  key={idx}
                  className="w-auto first:pl-[12px] last:pr-[12px]"
                >
                  <div className="">
                    <figure className="border-radius-14 max-w-[290px] max-h-[228px] h overflow-hidden align-items-center mb-0 relative">
                      <img className="border-radius-14" src={thumbs} alt="" />
                      {!!remainingSlidesCount && idx === slidesPerView - 1 && (
                        <div className="absolute top-0 flex flex-col items-center justify-center rgba-gray-800-80 h-full w-full">
                          <span className={'mb-16px'}>
                          <Image src='/images/logo-rent.svg' alt='logo' className='cursor-pointer'/>
                          </span>
                          <div className="flex items-end">
                            <span className="flex text-bold text-[32px] leading-none text-white-100">
                              + {remainingSlidesCount}
                            </span>
                            <span className="flex font-base text-[16px] line-height-1 text-white-100 opacity-70 ml-[4px] mb-[2px]">
                              {t('l_slider_photo')}
                            </span>
                          </div>
                        </div>
                      )}
                    </figure>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        
      </Fragment>
    )
  }

  return (
    <Fragment>
      {photos.length && (
        <div className="list-item__thumbnail flex-shrink-0 md:w-[180px] mb-12px mb-m-0 px-m-0">
          <div className="list-item__thumbnail__container">
            <div className="list-item__thumbnail__items aspect-w-4 aspect-h-3 w-100">
              <div className="items">
                {photos.slice(0, slidesPerView).map(({ thumbs }, index) => (
                  <div key={index} className="items__page">
                    <div className="items__image-wrapper">
                      <img className="items__image" src={thumbs} alt="" />
                      {!!remainingSlidesCount && index === slidesPerView - 1 && (
                        <div className="relative flex flex-col items-center justify-center rgba-gray-800-80 h-full">
                          <span className={'mb-16px'}>
                            <icons.Photo />
                          </span>
                          <div className="flex items-end">
                            <span className="flex text-bold text-[32px] leading-none text-white-100">
                              + {remainingSlidesCount}
                            </span>
                            <span className="flex font-base text-[16px] line-height-1 text-white-100 opacity-70 ml-[4px] mb-[2px]">
                              {t('l_slider_photo')}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="items__button" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}
