import Image from 'next/image'

const PremiumSection = () => {
  return (
    <div>
      <div className='section-premium'>
        <h3>Companyon Premium Plans</h3>
        <h4 className='mb-md'>Companyon gives you unlimited employee accounts and unlimited meetings</h4>
        <div className='section-premium-packets flex'>
          <div className='packet-free'>
            <p className='font-sm mb-25'>
              <span className='font-bg'>$0</span>
              /month
            </p>
            <span className='font-bg mb-25'>Free</span>
            <p className='font-sm mb-25'>For professionals just getting started</p>
            <p className='font-sm packet-benefits mb-10'>
              <Image src="/images/check-circle.svg" width={21} height={20} alt='checkCircleIcon' />
              Workspace
            </p>
            <p className='font-sm packet-benefits mb-10'>
              <Image src="/images/check-circle.svg" width={21} height={20} alt='checkCircleIcon' />
              Ai meeting details
            </p>
            <p className='font-sm packet-benefits mb-10'>
              <Image src="/images/check-circle.svg" width={21} height={20} alt='checkCircleIcon' />3 month meeting storage
            </p>
            <p className='font-sm packet-benefits mb-10'>
              <Image src="/images/check-circle.svg" width={21} height={20} alt='checkCircleIcon' />1 month audio storage
            </p>
            <p className='font-sm packet-benefits mb-25'>
              <Image src="/images/check-circle.svg" width={21} height={20} alt='checkCircleIcon' />5 hours/mo of transcription
            </p>
            <button className='packets-btn'>Choose plan</button>
          </div>
          <div className='packet-pro'>
            <p className='font-sm mb-25 font-white'>
              <span className='font-bg font-white'>$25</span>
              /month
            </p>
            <span className='font-bg mb-25 font-white'>Pro</span>
            <p className='font-sm mb-25 font-white'>For professionals and small teams</p>
            <p className='font-sm packet-benefits mb-10 font-white'>
              <Image src="/images/check-circle-pro.svg" width={20} height={20} alt='checkCirclePro' />
              Up to 5 Workspaces
            </p>
            <p className='font-sm packet-benefits mb-10 font-white'>
              <Image src="/images/check-circle-pro.svg" width={20} height={20} alt='checkCirclePro' />
              25 hours/mo of transcriptionon
            </p>
            <p className='font-sm packet-benefits mb-10 font-white'>
              <Image src="/images/check-circle-pro.svg" width={20} height={20} alt='checkCirclePro' />
              Ai meeting details
            </p>
            <p className='font-sm packet-benefits mb-10 font-white'>
              <Image src="/images/check-circle-pro.svg" width={20} height={20} alt='checkCirclePro' />6 month meeting storage
            </p>
            <p className='font-sm packet-benefits mb-25 font-white'>
              <Image src="/images/check-circle-pro.svg" width={20} height={20} alt='checkCirclePro' />6 month video and audio
            </p>
            <button className='packets-btn packets-pro-btn'>Choose plan</button>
          </div>
          <div className='packet-bussiness'>
            <p className='font-sm mb-25'>
              <span className='font-bg'>$35</span>
              /month
            </p>
            <span className='font-bg mb-25'>Bussiness</span>
            <p className='font-sm mb-25'>For bigger teams and businesses</p>
            <p className='font-sm packet-benefits mb-10'>
              <Image src="/images/check-circle.svg" width={21} height={20} alt='checkCircleIcon' />
              Unlimited Workspaces
            </p>
            <p className='font-sm packet-benefits mb-10'>
              <Image src="/images/check-circle.svg" width={21} height={20} alt='checkCircleIcon' />
              100 hours/mo of transcription
            </p>
            <p className='font-sm packet-benefits mb-10'>
              <Image src="/images/check-circle.svg" width={21} height={20} alt='checkCircleIcon' />
              Ai meeting details
            </p>
            <p className='font-sm packet-benefits mb-10'>
              <Image src="/images/check-circle.svg" width={21} height={20} alt='checkCircleIcon' />1 year meeting storage
            </p>
            <p className='font-sm packet-benefits mb-25'>
              <Image src="/images/check-circle.svg" width={21} height={20} alt='checkCircleIcon' />1 year video and audio storage
            </p>
            <button className='packets-btn'>Choose plan</button>
          </div>
        </div>
        <h3>Enterprice</h3>
        <h4 className='mb-25 section-premium-bottom'>
          Get unlimited hours of video recording, transcription and storage with the custom offer Tailored specifically
          for you and your business needs
        </h4>
        <a href='mailto:hello@companyon.ai?subject=Get%20In%20Touch' className='btn'>
          Get in touch
        </a>
      </div>
    </div>
  )
}

export default PremiumSection
