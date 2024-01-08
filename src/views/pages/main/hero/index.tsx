import Filters from 'src/views/pages/main/filters'
import Typography from 'src/views/components/typography'
import { HeroContainer, Copy } from './styles'
import Image from 'src/views/components/image'
import { isMobile } from 'react-device-detect'
import {useEffect, useState} from "react";


const Hero = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  useEffect(() => {
    setIsMobileDevice(isMobile)
  }, [])

  return (
    <HeroContainer>
        <Image
            src={isMobileDevice ?'/images/banner-mob.png' : '/images/banner.png'}
            alt=''
            height={'100%'}
            width={'100%'}
            className='object-cover absolute w-full h-full top-0 left-0 rounded-2xl'
          />
      <Copy>
        <div className='lg:w-11/12 relative'>
          <Typography
            type='h1'
            className='mt-[120px] md:mt-0 text-white font-bold text-3md md:text-2xl lg:text-[42px] xl:text-[54px]'
          >
            ავტომობილის დაქირავება მარტივად
          </Typography>
          <Typography type='body' className='text-white text-md mt-3 hidden md:block'>
            შეარჩიეთ სასურველი ავტომობილი ონლაინ და გაიმარტივეთ ქირაობის პროცესი. ისარგებლეთ დამატებითი სერვისებით და
            შეიქმენით მაქსიმალური კომფორტი.
          </Typography>
        </div>
        <Filters />
      </Copy>
    </HeroContainer>
  )
}

export default Hero
