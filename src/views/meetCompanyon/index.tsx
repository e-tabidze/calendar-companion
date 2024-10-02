import { useEffect, useState } from 'react'
import Image from 'next/image'
import Slider from '../slider'

 const MeetCompanyon = () => {
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoader(true)
    }, 1500)
  }, [])
  return (
    <div>
      <div className='meet-companyon'>
        <h2 className='main-title relative'>
          Meet your AI-driven Companyon
          <div className='topstars-container align-center absolute flex'>
            <Image src='/images/topstars.svg' alt='topstars-img' width={27} height={28} />
          </div>
          <Image className='bottomstars-img absolute' src='/images/bottomstars.svg' alt='bottomstars-img' width={33} height={29} />
        </h2>
        <p>
          Companyon is designed to streamline organizational and collaborative tasks, making the management of online
          meetings a breeze. Schedule, organize, record, transcribe, summarize, and easily share your meetings, all in
          one place.
        </p>
        <a href='https://app.companyon.ai/auth/login' className='btn'>
          JOIN US FOR FREE
        </a>
      </div>
      {loader && <Slider />}
      <div className='section-title'>
        <p className='main-title mb-lg'>
          <span className='brand-color'>Unlock</span> more value from your online meetings.
        </p>
      </div>
    </div>
  )
}

export default MeetCompanyon