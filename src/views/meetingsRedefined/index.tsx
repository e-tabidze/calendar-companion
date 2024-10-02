import Image from 'next/image'

const MeetingsRedefined = () => {
  return (
    <div className='Meetings-redefined mb-lg'>
      <div className='flex'>
        <div className='img-vertival-container'>
          <Image
            className='img-vertical'
            src='/images/meetings-redefined-vertical.png'
            alt='meetingsImgVertical'
            width={300}
            height={300}
          />
        </div>
        <div className='meeting-redefined-paragraph'>
          <h4>Meetings redefined</h4>
          <p>
            The Meetings page is your teams dedicated space to delve into details, access information, and express
            thoughts on specific aspects or meeting subjects. It is the go-to place to guarantee that every team member
            is up-to-date and well-informed.
          </p>
        </div>
      </div>
      <div className='img-horizontal-container'>
        <Image src='/images/meetings-redefined-horizontal.svg' alt='meetingsImgHorizontal' width={100} height={100} />
      </div>
    </div>
  )
}

export default MeetingsRedefined
