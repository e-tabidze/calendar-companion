import { useController } from 'react-hook-form'
import { RadioGroup } from '@headlessui/react'
import tw from 'tailwind-styled-components'
import { ReactComponentElement, useState } from 'react'
import Image from 'next/image'
import Typography from '../../../components/typography'
import SelectField from '../../../components/selectField'
import BookingModal from '../bookingModal'

interface Option {
  label: string
  value: string | number
  children?: ReactComponentElement<any>
  info: string
}

interface Props {
  name: string
  options: Option[]
  control?: any
  color: string
  horizontal?: boolean
}

const BookingRadio: React.FC<Props> = ({ name, options, control, color, horizontal }) => {
  const { field } = useController({
    name,
    control
  })

  const Circle = tw.div<{
    checked: boolean
  }>`w-8 h-8 flex items-center justify-center rounded-full border border-raisin-1300  outline-none ${props =>
    props.checked ? `${color} border-0` : ''}`

  return (
    <RadioGroup value={field.value} onChange={field.onChange}>
      <div className={`${horizontal ? 'flex gap-2 w-full' : ''}`}>
        {options.map((option: Option) => (
          <RadioGroup.Option key={option.value} value={option.value} className='w-full'>
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
                      <span className='text-2sm md:md ml-[20px]'>{option.label}</span>
                    </RadioGroup.Label>
                    {option.info && (
                      <RadioGroup.Description className='text-raisin-130' as='span'>
                        {option.info}
                      </RadioGroup.Description>
                    )}
                  </div>
                  {checked && option.children && <div className='mt-6'> {option.children} </div>}
                </div>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}

export default BookingRadio
