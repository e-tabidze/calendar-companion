'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const Workspaces = () => {
  const imgs = [
    '/images/w1.png',
    '/images/w2.png',
    '/images/w3.png',
    '/images/w4.png',
    '/images/w5.png',
    '/images/w6.png',
    '/images/w7.png',
    '/images/w8.png',
    '/images/w9.png'
  ]
  const data = [
    {
      title: 'Workspaces',
      text: 'A collaborative hub awaits! Forge workspaces for you and your team to achieve shared goals. From viewing calendars and meetings to seamlessly sharing information, stay informed about what others are contributing.'
    },
    {
      title: 'Calendar',
      text: 'Make it faster! Plan, arrange, and tailor your meetings. Share the agenda and files with all attendees beforehand to optimize time and enhance collaboration.'
    },
    {
      title: 'Bot',
      text: 'Capture the vibes! Record and transcribe your meetings in various languages with just a click.'
    },
    {
      title: 'Meeting',
      text: 'Maximize the value! Elevate your meeting experience with an AI-generated summary. Receive a comprehensive overview, complete with action items and highlighted key topics.'
    },
    {
      title: 'Insights',
      text: 'Improve processes! Dive into meeting insights to improve and streamline your online gatherings.'
    },
    {
      title: 'Meeting note',
      text: 'Share your thoughts! Facilitate collaboration with others by utilizing the notes section. Ensure that your input is both heard and visible to everyone involved.'
    },
    {
      title: 'Files',
      text: 'Leave email attachments in the past! Share files, images, and pertinent documentation directly through the meetings page.'
    },
    {
      title: 'Share',
      text: 'Eliminate follow-ups and extra tasks! Share meeting details seamlessly with everyone involved, bypassing the need for emails, texts, and additional calls.'
    },
    {
      title: 'Notes',
      text: 'Take notes, write down your thoughts and without wasting time.'
    }
  ]

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [visibleDivIndex, setVisibleDivIndex] = useState<number>(0)

  const divHeight = 240 // Height of each div

  const handleScroll = () => {
    const container = containerRef.current
    if (container) {
      const scrollTop = container.scrollTop
      const index = Math.floor(scrollTop / divHeight)
      setVisibleDivIndex(index)
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div className='workspaces-section align-center mb-lg flex'>
      <div ref={containerRef} style={{ height: '260px', overflow: 'auto' }}>
        {data.map(item => (
          <div style={{ height: '260px' }} key={item.title}>
            <h3 className='brand-color'>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <div className='workspace-img-container'>
        <Image src={imgs[visibleDivIndex]} alt='workspace-img' width={100} height={100} />
      </div>
    </div>
  )
}

export default Workspaces
