/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/naming-convention */
'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'


import { Slider } from './slider'

export const MeetCompanyon = () => {
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoader(true)
    }, 1500)
  }, [])
  return (
    <div>
      <div className="meet-companyon">
        <h2 className="main-title relative">
          Meet your AI-driven Companyon
          <div className="topstars-container align-center absolute flex">
          </div>
          <Image
            className="bottomstars-img absolute"
            alt="bottomstars-img"
          />
        </h2>
        <p>
          Companyon is designed to streamline organizational and collaborative
          tasks, making the management of online meetings a breeze. Schedule,
          organize, record, transcribe, summarize, and easily share your
          meetings, all in one place.
        </p>
        <a href='https://app.companyon.ai/auth/login' className="btn">JOIN US FOR FREE</a>
      </div>
      {loader && <Slider />}
      <div className="section-title">
        <p className="main-title mb-lg">
          <span className="brand-color">Unlock</span> more value from your
          online meetings.
        </p>
      </div>
    </div>
  )
}
