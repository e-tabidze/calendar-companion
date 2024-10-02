'use client'
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

const Slider = () => {
  return (
    <div className='carousel-container'>
      <Carousel infiniteLoop autoPlay showArrows={false} showStatus={false} showThumbs={false}>
        <div>
          <Image src='/images/s1.svg' alt='companyon' width={300} height={300} />
        </div>
        <div>
          <Image src='/images/s2.svg' alt='companyon' width={300} height={300} />
        </div>
        <div>
          <Image src='/images/s3.svg' alt='companyon' width={300} height={300} />
        </div>
      </Carousel>
    </div>
  )
}

export default Slider
