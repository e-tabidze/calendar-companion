import Image from 'next/image'


export const MeetingsRedefined = () => {
  return (
    <div className="Meetings-redefined mb-lg">
      <div className="flex">
        <div className="img-vertival-container">
          <Image
            className="img-vertical"
            alt="meetingsImgVertical"
            src=""
          />
        </div>
        <div className="meeting-redefined-paragraph">
          <h4>Meetings redefined</h4>
          <p>
            The Meetings page is your teams dedicated space to delve into
            details, access information, and express thoughts on specific
            aspects or meeting subjects. It is the go-to place to guarantee that
            every team member is up-to-date and well-informed.
          </p>
        </div>
      </div>
      <div className="img-horizontal-container">
      </div>
    </div>
  )
}
