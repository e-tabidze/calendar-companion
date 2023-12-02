import Image from 'next/image'
import Typography from '../../../../components/typography'
import Divider from '../../../../components/divider'
import tw from 'tailwind-styled-components'
import { RadioGroup } from '@headlessui/react'
import { useController } from 'react-hook-form'

interface Props {
  addresses: any
  name: string
  control: any
}

const BookingList: React.FC<Props> = ({ addresses, name, control }) => {
  const Circle = tw.div<{
    checked: boolean
  }>`w-8 h-8 flex items-center justify-center rounded-full border-[2px] border-raisin-100  outline-none ${props =>
    props.checked ? `bg-green-100 border-0` : ''}`

  const { field } = useController({
    name,
    control
  })

  return (
    <div className='px-4 sm:px-10'>
      <div className='flex items-center mb-[16px]'>
        <Image src='/icons/start.svg' alt='' height={24} width={24} className='flex mr-[16px]' />
        <Typography type='body' className='text-[24px] font-normal'>
          წაყვანა
        </Typography>
      </div>
      <div className='bg-green-10 flex items-center rounded-[16px] pl-[40px] pr-[8px] py-[8px] mb-[4px]'>
        <RadioGroup value={field.value} onChange={field.onChange}>
          <div className='w-full'>
            {addresses.map((cityData: any) => (
              <div key={cityData.city} className='w-full'>
                {cityData.addresses.map((address: any) => (
                  <RadioGroup.Option key={address.address} value={address.address} className='w-full'>
                    {({ checked }) => (
                      <div className='my-2'>
                        <div
                          className={`rounded-xl border py-[32px] pl-[40px] pr-[24px] ${
                            checked ? ' border-green-100 bg-green-10' : 'border-raisin-10'
                          }`}
                        >
                          <div className='flex justify-between items-center'>
                            <RadioGroup.Label className='flex items-center' style={{ margin: '0px' }}>
                              <Circle checked={checked}>
                                {checked && <Image src='/icons/check.svg' alt='' height={12} width={16} />}
                              </Circle>
                              <Typography type='subtitle'>{cityData.city}</Typography>
                            </RadioGroup.Label>
                          </div>

                          <div className='mt-4'>
                            <Typography type='subtitle'>{address.address}</Typography>
                          </div>
                        </div>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            ))}
          </div>
        </RadioGroup>

        {/* <div className='w-2/12'>
          <div className='flex items-center bg-white border border-raisin-10 rounded-[8px] px-[8px] h-[40px]'>
            <Image src='/icons/booking-time.svg' alt='' height={24} width={24} className='mr-[12px]' />
            13:00
          </div> */}
        {/*<SelectField*/}
        {/*    control={control}*/}
        {/*    valueKey='id'*/}
        {/*    labelKey='time'*/}
        {/*    name='time'*/}
        {/*    options={times}*/}
        {/*    placeholder='დრო'*/}
        {/*    className="bg-transparent border-green-100"*/}
        {/*/>*/}
        {/* </div> */}
      </div>
      {/* <div className='hover:bg-raisin-5 flex items-center rounded-[16px] pl-[40px] pr-[8px] py-[8px] mb-[4px]'>
        <div className='w-4/12 flex items-center'>
          <span className='border border-black flex items-center justify-center w-[32px] h-[32px] rounded-full mr-[16px]'></span>
          <span className='text-[12px] text-black/40'>თბილისი</span>
        </div>
        <div className='w-6/12'>
          <Typography type='body' className='text-[16px]'>
            იაკობ ცურტაველის #223
          </Typography>
        </div>
      </div> */}
      {/* <div className='hover:bg-raisin-5 flex items-center rounded-[16px] pl-[40px] pr-[8px] py-[8px] mb-[4px]'>
        <div className='w-4/12 flex items-center'>
          <span className='border border-black flex items-center justify-center w-[32px] h-[32px] rounded-full mr-[16px]'></span>
          <span className='text-[12px] text-black/40'>თბილისი</span>
        </div>
        <div className='w-6/12'>
          <Typography type='body' className='text-[16px]'>
            იაკობ ცურტაველის #223
          </Typography>
        </div>
      </div> */}
      <Divider className='my-[40px]' />
      {/* <div className='flex items-center mb-[16px]'>
        <Image src='/icons/stop.svg' alt='' height={24} width={24} className='flex mr-[16px]' />
        <Typography type='body' className='text-[24px] font-normal'>
          დაბრუნება
        </Typography>
      </div> */}
      <div className='bg-green-10 flex items-center rounded-[16px] pl-[40px] pr-[8px] py-[8px] mb-[4px]'>
        <div className='w-4/12 flex items-center'>
          <span className='bg-green-100 flex items-center justify-center w-[32px] h-[32px] rounded-full mr-[16px]'>
            <Image src='/icons/check.svg' alt='' height={12} width={16} />
          </span>
          <span className='text-[12px] text-black/40'>თბილისი</span>
        </div>
        <div className='w-6/12'>
          <Typography type='body' className='text-[16px]'>
            იაკობ ცურტაველის #223
          </Typography>
        </div>
        <div className='w-2/12'>
          <div className='flex items-center justify-center bg-white border border-raisin-10 rounded-[8px] px-[8px] h-[40px]'>
            <Image src='/icons/booking-time.svg' alt='' height={24} width={24} className='mr-[12px]' />
            13:00
          </div>
          {/*<SelectField*/}
          {/*    control={control}*/}
          {/*    valueKey='id'*/}
          {/*    labelKey='time'*/}
          {/*    name='time'*/}
          {/*    options={times}*/}
          {/*    placeholder='დრო'*/}
          {/*    className="bg-transparent border-green-100"*/}
          {/*/>*/}
        </div>
      </div>
      <div className='hover:bg-raisin-5 flex items-center rounded-[16px] pl-[40px] pr-[8px] py-[8px] mb-[4px]'>
        <div className='w-4/12 flex items-center'>
          <span className='border border-black flex items-center justify-center w-[32px] h-[32px] rounded-full mr-[16px]'></span>
          <span className='text-[12px] text-black/40'>თბილისი</span>
        </div>
        <div className='w-6/12'>
          <Typography type='body' className='text-[16px]'>
            იაკობ ცურტაველის #223
          </Typography>
        </div>
      </div>
      <div className='hover:bg-raisin-5 flex items-center rounded-[16px] pl-[40px] pr-[8px] py-[8px] mb-[4px]'>
        <div className='w-4/12 flex items-center'>
          <span className='border border-black flex items-center justify-center w-[32px] h-[32px] rounded-full mr-[16px]'></span>
          <span className='text-[12px] text-black/40'>თბილისი</span>
        </div>
        <div className='w-6/12'>
          <Typography type='body' className='text-[16px]'>
            იაკობ ცურტაველის #223
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default BookingList
