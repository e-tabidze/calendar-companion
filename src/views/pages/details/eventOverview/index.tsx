import Icon from 'src/views/app/Icon'
import { format, parseISO } from 'date-fns'
import Typography from 'src/views/components/typography'
import { formatTimeDifference } from 'src/utils/timeFormatter'

interface Props {
  eventDetails: any
}

const EventOverview: React.FC<Props> = ({ eventDetails }) => {
  console.log(eventDetails, 'eventDetails')

  return (
    <div className='flex gap-4'>
      <Icon svgPath='action1' width={20} height={20} />
      <div className='flex-1'>
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-2  '>
            <div className='w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex justify-center items-center'>
              {eventDetails.event_data.creator.email?.charAt(0) || ''}
            </div>
            <Typography type='subtitle' color='light' className='text-[13px'>
              {eventDetails.event_data.creator.email}
            </Typography>
            <Typography type='subtitle' color='light' className='text-[13px] text-grey-90'>
              Created a meeting
            </Typography>
            <Typography type='subtitle' color='light' className='text-[13px] text-grey-90'>
              {format(parseISO(eventDetails.event_data.created), 'MMM d · hh:mmaaa')}
            </Typography>
          </div>

          {/* Meeting Card */}
          <div className='mt-4 bg-gray-50 rounded-lg p-6'>
            <div className='mb-4'>
              <span className='text-gray-600'>In 1h and 15 minutes</span>
              {formatTimeDifference(new Date("2024-12-24T19:30:00+04:00"), 20)}
              <h2 className='text-xl font-semibold'>{eventDetails.event_data.summary}</h2>
            </div>

            <div className='bg-white rounded-lg p-4 mb-4'>
              <div className='flex items-center gap-3 mb-4'>
                {/* <Video className='w-5 h-5 text-blue-500' /> */}
                <a
                  href={eventDetails.event_data.hangoutLink}
                  className='text-blue-500 hover:underline'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {eventDetails.event_data.hangoutLink}
                </a>
                {/* <MoreHorizontal className='w-5 h-5 text-gray-400 ml-auto' /> */}
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <span className='text-gray-600'>Participants</span>
                  <div className='flex items-center mt-1'>
                    <div className='flex -space-x-2'>
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className='w-8 h-8 rounded-full bg-gray-200 border-2 border-white' />
                      ))}
                    </div>
                    <span className='ml-2 text-gray-600'>and 3 others</span>
                    <button className='ml-2 p-1 hover:bg-gray-100 rounded'>{/* <Plus className='w-4 h-4' /> */}</button>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-gray-600'>Companion</span>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 rounded-full bg-green-400' />
                    <span className='text-sm text-gray-600'>Was Connected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventOverview
