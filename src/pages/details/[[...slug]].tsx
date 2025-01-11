import { useRouter } from 'next/router'
import Divider from 'src/views/components/divider'
import DetailsPageHeader from 'src/views/pages/details/detailsPageHeader'
import EventDetails from 'src/views/pages/details/eventDetails'
import EventOverview from 'src/views/pages/details/eventOverview'
import MeetingNotes from 'src/views/pages/details/meetingNotes'
import useDetails from 'src/views/pages/details/useDetails'

const Details = () => {
  const router = useRouter()

  const { slug } = router.query

  const { eventDetails, isEventDataLoading, isEventDataError, meetingJson } = useDetails(slug ? slug[0] : '')

  if (isEventDataLoading) {
    return <div>Loading...</div>
  }

  if (isEventDataError || !eventDetails) {
    return <div>Error loading event details</div>
  }

  return (
    <div>
      <DetailsPageHeader eventDetails={eventDetails} />
      <Divider />
      <div className='max-w-6xl mx-auto'>
        <EventOverview eventDetails={eventDetails} />
        <EventDetails eventDetails={eventDetails} meetingJson={meetingJson} />
        <MeetingNotes transcript={meetingJson?.transcript} mp4={meetingJson?.mp4} eventDetails={eventDetails} />
      </div>
    </div>
  )
}

export default Details
