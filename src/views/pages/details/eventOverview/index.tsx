import Icon from 'src/views/app/Icon'
import { format, parseISO } from 'date-fns'
import Typography from 'src/views/components/typography'
import { formatTimeDifferenceHours } from 'src/utils/timeFormatter'

interface Props {
  eventDetails: any
}

const EventOverview: React.FC<Props> = ({ eventDetails }) => {
  console.log(eventDetails, 'eventDetails')

  return (
    <div className='flex gap-4'>
      <Icon svgPath='action1' width={20} height={20} className='hidden lg:inline-block' />
      <div className='flex-1'>
        <div className='mb-8'>
          <div className='flex flex-col lg:flex-row lg:items-center gap-3 mb-2'>
            <div className='flex items-center gap-4'>
              <Icon svgPath='action1' width={20} height={20} className='inline-block lg:hidden' />
              <div className='w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex justify-center items-center'>
                {eventDetails.event_data.creator.email?.charAt(0) || ''}
              </div>
            </div>
            <Typography type='subtitle' color='light' className='text-[13px'>
              {eventDetails.event_data.creator.email}
            </Typography>
            <Typography type='subtitle' color='light' className='text-[13px] text-grey-90'>
              Created a meeting {format(parseISO(eventDetails.event_data.created), 'MMM d · hh:mmaaa')}
            </Typography>
          </div>

          <div className='mt-6 bg-gray-50 rounded-lg'>
            <div className='p-6'>
              <div className='border-l-[3px] rounded-sm border-primary-100 pl-4'>
                <Typography type='subtitle' color='light'>
                  {formatTimeDifferenceHours(
                    eventDetails.event_data.start.dateTime,
                    `${eventDetails.event_data.start.dateTime?.split('T')[1]}`
                  )}
                </Typography>

                <Typography type='h4' color='dark' className='font-medium'>
                  {eventDetails.event_data.summary}
                </Typography>
              </div>
            </div>

            <div className='h-px bg-grey-90 opacity-30' />

            <div className='flex flex-col lg:flex-row gap-4 p-6'>
              <div className='flex gap-4 bg-white p-4 min-h-[85px] rounded-lg w-full lg:w-5/12'>
                <Icon svgPath='videoLarge' width={44} height={44} />
                <div>
                  <Typography type='subtitle' color='light' className='text-[13px] text-grey-90'>
                    {format(parseISO(eventDetails.event_data.start.dateTime), 'MMM d, hh:mmaaa')} -{' '}
                    {format(parseISO(eventDetails.event_data.end.dateTime), 'MMM d, hh:mmaaa')}{' '}
                    {eventDetails?.event_data?.recurrence ? '·' : ''} {eventDetails?.event_data?.recurrence}
                  </Typography>
                  <a
                    href={eventDetails.event_data.hangoutLink}
                    className='text-primary-100 hover:underline'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {eventDetails.event_data.hangoutLink}
                  </a>
                </div>
              </div>

              <div className='bg-white p-4 min-h-[85px] rounded-lg w-full lg:w-4/12'>
                <Typography type='subtitle' color='light'>
                  Participants
                </Typography>
                <div className='flex -space-x-2'>
                  {eventDetails?.event_data?.attendees.map((attendee: any) => (
                    <div
                      key={attendee?.email}
                      className='w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex justify-center items-center'
                    >
                      {attendee?.email?.charAt(0) || ''}
                    </div>
                  ))}
                </div>
              </div>

              <div className='bg-white p-4 min-h-[85px] rounded-lg flex-grow'>
                <Typography type='subtitle' color='light'>
                  Companion
                </Typography>
                <div className='flex gap-4 mt-2'>
                  <div className='relative inline-flex items-center'>
                    <div
                      className={`h-[14px] w-[25px] ${
                        eventDetails?.bot_id ? 'bg-green-90' : 'bg-raisin-30'
                      } rounded-full transition-colors duration-300 relative flex items-center opacity-60`}
                    >
                      <div
                        className={`absolute top-[2.5px] left-[2px] h-[9px] w-[9px] bg-white rounded-full shadow-md transition-transform duration-300 transform ${
                          eventDetails?.bot_id ? 'translate-x-[12px]' : 'translate-x-0'
                        }`}
                      ></div>
                    </div>
                  </div>
                  <Typography type='subtitle'>
                    {eventDetails?.bot_id ? 'Was connected' : 'Was not connected'}
                  </Typography>
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
