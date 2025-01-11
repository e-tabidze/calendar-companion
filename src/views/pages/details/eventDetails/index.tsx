import React from 'react'
import { MoreHorizontal } from 'lucide-react'
import Icon from 'src/views/app/Icon'

interface EventDetailsProps {
  eventDetails: any
  meetingJson: any
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventDetails }) => {
  return (
    <div className='flex gap-4 mt-16'>
      <div className='relative z-10'>
        <div className='absolute h-full w-px bg-raisin-10 left-[9px] -top-4 z-10' />
        <Icon svgPath='action2' width={18} height={18} className='hidden lg:inline-block z-20 relative' />
      </div>
      <div className=''>
        <div className='flex items-center gap-3 mb-2'>
          <img src='/api/placeholder/32/32' className='w-8 h-8 rounded-full' />
          <div>
            <span className='font-medium'>{eventDetails.event_data.creator.email}</span>
            <span className='text-gray-600 ml-2'>Edited an agenda</span>
            <span className='text-gray-500 ml-2'>21 aug · 16:33am</span>
          </div>
        </div>

        <div className='mt-4'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-xl font-semibold'>Meeting agenda</h3>
            <button>
              <MoreHorizontal className='w-5 h-5 text-gray-400' />
            </button>
          </div>
          <div contentEditable>
            <div className='text-[#FF5A1F]'>📍 It consists of 15 items and 33 sub-items</div>
            <p className='mt-4 text-gray-600'>
              {eventDetails.event_data.description ||
                'Suspendisse quis erat non ligula sollicitudin pulvinar ac ac velit. Fusce quam enim, tristique vel sem vitae, finibus pulvinar velit.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
