import { useRouter } from 'next/router'
import EventDetails from 'src/views/pages/details/eventDetails'
import MeetingNotes from 'src/views/pages/details/meetingNotes'
import useDetails from 'src/views/pages/details/useDetails'

const Details = () => {
  const router = useRouter()

  const { slug } = router.query

  const { eventDetails, isEventDataLoading, isEventDataError, meetingJson } = useDetails(
    slug ? slug[0] : ''
  )


  // console.log(eventDetails, 'eventData')


  if (isEventDataLoading) {
    return <div>Loading...</div>
  }

  if (isEventDataError || !eventDetails) {
    return <div>Error loading event details</div>
  }

  return (
    <div>
      <EventDetails eventDetails={eventDetails} meetingJson={meetingJson} />
      <MeetingNotes transcript={meetingJson?.transcript} mp4={meetingJson?.mp4}/>
    </div>
  )
}

export default Details

