import React from 'react'
import InteractiveDoc from '../interactiveDoc'

interface Props {
  eventDetails: any
}

const EventDetails: React.FC<Props> = ({ eventDetails }) => {
  return (
    <div className='flex gap-4 mt-16'>
      <div className='relative z-10'>
        <div className='absolute h-full w-px bg-gray-200 left-[9px] -top-4 z-10' />
        <div className='relative z-20'>
          <img src='/api/placeholder/18/18' alt='' className='hidden lg:inline-block' />
        </div>
      </div>

      <div className='flex-1 ml-4'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex justify-center items-center'>
            {eventDetails.event_data?.creator.email?.charAt(0) || ''}
          </div>
          <div>
            <span className='font-medium'>{eventDetails?.event_data?.creator?.email}</span>
            <span className='text-gray-600 ml-2'>Edited an agenda</span>
            <span className='text-gray-500 ml-2'>21 aug · 16:33am</span>
          </div>
        </div>

        <div className='mt-4'>
          <InteractiveDoc />
        </div>
      </div>
    </div>
  )
}

export default EventDetails
