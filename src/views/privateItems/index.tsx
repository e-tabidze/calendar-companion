import Image from 'next/image'

const PrivateItems = () => {
  return (
    <div className='private-items'>
      <h3 className='mb-25'>
        Do your best works with the Companyon by your side
        <span> Built for teams and individuals!</span>
      </h3>
      <div className='flex gap-16 mb-16 top-items'>
        <div className='private-items-box flex1'>
          <Image className='mb-25' src="/images/frame-1.svg" alt='frame1' height={100} width={100} />
          <h5 className='mb-10'>Add Calendars</h5>
          <p>
            Customize your view by showing or hiding various calendars to match your needs and workflow, making
            navigation a breeze.
          </p>
        </div>
        <div className='private-items-box flex2'>
          <Image className='mb-25' src="/images/frame-2.svg" alt='frame2' height={100} width={100} />
          <h5 className='mb-10'>View what your team is up to</h5>
          <p>
            Managing different teams and accounts? No problem! Integrate all your Gmail accounts seamlessly and use them
            simultaneously without any hassle.
          </p>
        </div>
      </div>
      <div className='flex gap-16 bottom-items'>
        <div className='private-items-box flex1'>
          <Image className='mb-25' src="/images/frame-3.svg" alt='frame3' height={100} width={100} />
          <h5 className='mb-10'>Automate Processes</h5>
          <p>
            Centralize your meetings and information gathering in one place. No need for extra work or additional tasks.
          </p>
        </div>
        <div className='private-items-box flex1'>
          <Image className='mb-25' src="/images/frame-4.svg" alt='frame4' height={100} width={100} />
          <h5 className='mb-10'>Use different accounts</h5>
          <p>
            Keep a pulse on your teams activities and workflow to schedule meetings that align seamlessly with ongoing
            tasks and priorities.
          </p>
        </div>
        <div className='private-items-box flex1'>
          <div className='empty-div mb-25'></div>
          <h5 className='mb-10'>See older meetings</h5>
          <p>
            Effortlessly revisit past meetings to jog your memory and monitor progress over time. All the information
            will be there.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivateItems
