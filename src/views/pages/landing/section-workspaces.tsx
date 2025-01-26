'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'


export const Workspaces = () => {
  const data = [
    {
      title: 'Workspaces',
      text: 'A collaborative hub awaits! Forge workspaces for you and your team to achieve shared goals. From viewing calendars and meetings to seamlessly sharing information, stay informed about what others are contributing.',
    },
    {
      title: 'Calendar',
      text: 'Make it faster! Plan, arrange, and tailor your meetings. Share the agenda and files with all attendees beforehand to optimize time and enhance collaboration.',
    },
    {
      title: 'Bot',
      text: 'Capture the vibes! Record and transcribe your meetings in various languages with just a click.',
    },
    {
      title: 'Meeting',
      text: 'Maximize the value! Elevate your meeting experience with an AI-generated summary. Receive a comprehensive overview, complete with action items and highlighted key topics.',
    },
    {
      title: 'Insights',
      text: 'Improve processes! Dive into meeting insights to improve and streamline your online gatherings.',
    },
    {
      title: 'Meeting note',
      text: 'Share your thoughts! Facilitate collaboration with others by utilizing the notes section. Ensure that your input is both heard and visible to everyone involved.',
    },
    {
      title: 'Files',
      text: 'Leave email attachments in the past! Share files, images, and pertinent documentation directly through the meetings page.',
    },
    {
      title: 'Share',
      text: 'Eliminate follow-ups and extra tasks! Share meeting details seamlessly with everyone involved, bypassing the need for emails, texts, and additional calls.',
    },
    {
      title: 'Notes',
      text: 'Take notes, write down your thoughts and without wasting time.',
    },
  ]


  return (
    <div className="workspaces-section align-center mb-lg flex">
      <div className="workspace-img-container">
      </div>
    </div>
  )
}
