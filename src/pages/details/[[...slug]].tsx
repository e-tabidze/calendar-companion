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
        <MeetingNotes transcript={meetingJson?.transcript} mp4={"https://s3.eu-west-3.amazonaws.com/meeting-baas-video/7fe13b74-3cb0-444c-a440-5fd021c6d795.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARHQBNK4AXVQ77Y37%2F20241231%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20241231T093937Z&X-Amz-Expires=3600&X-Amz-Signature=0e3d6c52683f13c42f11b029b46946345df29e59ee1aed2191e80969491e4513&X-Amz-SignedHeaders=host"} eventDetails={eventDetails} />

      </div>
    </div>
  )
}

export default Details
