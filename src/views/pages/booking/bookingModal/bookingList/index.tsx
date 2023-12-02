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
      <div className='flex items-center my-4'>
        <Image src='/icons/start.svg' alt='' height={24} width={24} className='flex mr-[16px]' />
        <Typography type='body' className='text-[24px] font-normal'>
          წაყვანა
        </Typography>
      </div>
      <RadioGroup value={field.value} onChange={field.onChange}>
        <div className='w-full'>
          {addresses.map((cityData: any) => (
            <div key={cityData.city} className='w-full'>
              {cityData.addresses.map((address: any) => (
                <RadioGroup.Option key={address.address} value={address.address} className='w-full'>
                  {({ checked }) => (
                    <div className='my-2'>
                      <div className={`rounded-3xl py-3 pl-10 pr-6 ${checked ? 'bg-green-10' : 'bg-raisin-5'}`}>
                        <div className='flex justify-between items-center'>
                          <RadioGroup.Label className='flex items-center' style={{ margin: '0px' }}>
                            <Circle checked={checked}>
                              {checked && <Image src='/icons/check.svg' alt='' height={12} width={16} />}
                            </Circle>
                            <Typography type='subtitle' className='ml-3'>
                              {address.address}
                            </Typography>
                          </RadioGroup.Label>
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

      <Divider className='my-[40px]' />
      <div className='flex items-center mb-[16px]'>
        <Image src='/icons/stop.svg' alt='' height={24} width={24} className='flex mr-[16px]' />
        <Typography type='body' className='text-[24px] font-normal'>
          დაბრუნება
        </Typography>
      </div>
      <RadioGroup value={field.value} onChange={field.onChange}>
        <div className='w-full'>
          {addresses.map((cityData: any) => (
            <div key={cityData.city} className='w-full'>
              {cityData.addresses.map((address: any) => (
                <RadioGroup.Option key={address.address} value={address.address} className='w-full'>
                  {({ checked }) => (
                    <div className='my-2'>
                      <div className={`rounded-3xl py-3 pl-10 pr-6 ${checked ? 'bg-green-10' : 'bg-raisin-5'}`}>
                        <div className='flex justify-between items-center'>
                          <RadioGroup.Label className='flex items-center' style={{ margin: '0px' }}>
                            <Circle checked={checked}>
                              {checked && <Image src='/icons/check.svg' alt='' height={12} width={16} />}
                            </Circle>
                            <Typography type='subtitle' className='ml-3'>
                              {address.address}
                            </Typography>
                          </RadioGroup.Label>
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
    </div>
  )
}

export default BookingList
