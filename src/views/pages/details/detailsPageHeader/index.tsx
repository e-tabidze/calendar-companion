import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'
import { format, parseISO } from 'date-fns'
import { IconButton } from 'src/views/components/button'
import { useRouter } from 'next/router'

interface Props {
  eventDetails: any
}
const DetailsPageHeader: React.FC<Props> = ({ eventDetails }) => {
  console.log(eventDetails?.event_title, 'eventDetails')

  const router = useRouter()

  return (
    <div className='flex items-center justify-between mx-8 mb-4 mt-3'>
      <div className='flex items-center gap-8'>
        <IconButton
          icon='arrowLeft'
          height={12}
          width={12}
          className='bg-grey-20 p-2 hover:bg-grey-60'
          onClick={() => router.back()}
        />

        <div>
          {eventDetails.event_data && (
            <Typography type='subtitle' color='light' className='text-[13px] text-grey-90'>
              {format(parseISO(eventDetails.event_data.start.dateTime), 'MMM d, hh:mmaaa')} -{' '}
              {format(parseISO(eventDetails.event_data.end.dateTime), 'MMM d, hh:mmaaa')}{' '}
              {eventDetails?.event_data?.recurrence ? '·' : ''} {eventDetails?.event_data?.recurrence}
            </Typography>
          )}
          <Typography type='subtitle' className='text-left text-raisin-110 text-md'>
            {eventDetails?.event_title}
          </Typography>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <div className='flex -space-x-2'>
          {eventDetails?.event_data?.attendees?.map((attendee: any) => (
            <div
              key={attendee?.email}
              className='w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex justify-center items-center'
            >
              {attendee?.email?.charAt(0) || ''}
            </div>
          ))}
        </div>

        <button className='flex items-center justify-center text-white rounded-full py-1 text-2sm bg-primary-100 min-w-10 px-4 font-normal gap-3'>
          Share Meeting
          <Icon svgPath='shareMeeting' width={16} height={16} />
        </button>

        <Icon svgPath='settings' width={24} height={24} />
      </div>
    </div>
  )
}

export default DetailsPageHeader
