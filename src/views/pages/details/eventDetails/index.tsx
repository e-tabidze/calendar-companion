import React from 'react'
import { MoreHorizontal } from 'lucide-react'
import Icon from 'src/views/app/Icon'

interface EventDetailsProps {
  eventDetails: any
  meetingJson: any
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventDetails }) => {

  return (
    <div>
      
      <div className='max-w-6xl mx-auto'>
        <div className='relative pl-8 border-l-2 border-gray-100'>
          <div className='relative'>
            <Icon svgPath='action2' width={20} height={20} className='absolute -left-[2.2rem]' />

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
              <p className='mt-4 text-gray-600' >
                {eventDetails.event_data.description ||
                  'Suspendisse quis erat non ligula sollicitudin pulvinar ac ac velit. Fusce quam enim, tristique vel sem vitae, finibus pulvinar velit.'}
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
