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
}

interface Props {
  name: string
  options: Option[]
  control?: any
  color: string
  horizontal?: boolean
}

const times = [
  { id: 0, time: '13:00' },
  { id: 1, time: '14:00' }
]

const BookingRadio: React.FC<Props> = ({ name, options, control, color, horizontal }) => {
  const { field } = useController({
    name,
    control
  })

  const Circle = tw.div<{
    checked: boolean
  }>`w-8 h-8 flex items-center justify-center rounded-full border border-raisin-1300  outline-none ${props =>
    props.checked ? `${color} border-0` : ''}`

  const [openEditModal, setOpenEditModal] = useState(false)
  const toggleEditModal = () => setOpenEditModal(!openEditModal)

  return (
    <RadioGroup value={field.value} onChange={field.onChange}>
      <div className={`${horizontal ? 'flex gap-2 w-full' : ''}`}>
        {options.map((option: any) => (
          <RadioGroup.Option key={option.value} value={option.value} className='w-full'>
            {({ checked }) => (
              <div className='my-2'>
                <div
                
                  //   className={`'flex justify-between items-center w-full
                  //   ${checked ? 'border border-orange-100 py-4 px-4 w-full rounded-xl' : ''}
                  //   ${horizontal && 'border border-raisin-10 py-4 w-full px-4 rounded-xl'}
                  //  `}
                  className={`rounded-xl border py-[32px] pl-[40px] pr-[24px] ${
                    checked ? ' border-green-100 bg-green-10' : 'border-raisin-10'
                  } 
               `}
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
                  {checked && (
                    <>
                      {/*TODO წაყვანა*/}
                      <div className='pl-[52px] mt-[16px]'>
                        <div className='flex items-center'>
                          <div className='w-2/12 flex items-start'>
                            <Image src='/icons/start.svg' alt='' height={24} width={24} />

                            <div className='flex flex-col ml-[12px]'>
                              <span className='text-[12px]'>წაყვანა</span>
                              <span className='text-[12px] text-black/60'>15 ივნ</span>
                            </div>
                          </div>
                          <div className='w-6/12'>
                            <Typography type='body' className='text-[14px] ml-[40px]'>
                              თბილისი, იაკობ წურტაველის 72
                            </Typography>
                          </div>
                          <div className='w-4/12 flex justify-between'>
                            <SelectField
                              control={control}
                              valueKey='id'
                              labelKey='time'
                              name='time'
                              options={times}
                              placeholder='დრო'
                              className='bg-transparent border-green-100'
                            />
                            <button
                              onClick={toggleEditModal}
                              className='ml-[16px] border border-black flex items-center justify-center h-[48px] rounded-[12px] text-[12px] px-[24px]'
                            >
                              შეცვლა
                            </button>
                          </div>
                        </div>
                        <div className='flex items-center mt-[12px]'>
                          <div className='w-2/12 flex items-start'>
                            <Image src='/icons/stop.svg' alt='' height={24} width={24} />

                            <div className='flex flex-col ml-[12px]'>
                              <span className='text-[12px]'>დაბრუნება</span>
                              <span className='text-[12px] text-black/60'>20 ივნ</span>
                            </div>
                          </div>
                          <div className='w-6/12'>
                            <Typography type='body' className='text-[14px] ml-[40px]'>
                              თბილისი, იაკობ წურტაველის 72
                            </Typography>
                          </div>
                          <div className='w-4/12 flex justify-between'>
                            <SelectField
                              control={control}
                              valueKey='id'
                              labelKey='time'
                              name='time'
                              options={times}
                              placeholder='დრო'
                              className='bg-transparent border-green-100'
                            />
                          </div>
                        </div>
                      </div>
                      {/*TODO მიწოდება*/}
                      <div className='pl-[52px] mt-[16px]'>
                        <div className='flex items-center'>
                          <div className='w-3/12 flex items-start'>
                            <Image src='/icons/start.svg' alt='' height={24} width={24} />

                            <div className='flex flex-col ml-[12px]'>
                              <span className='text-[12px]'>მიწოდება</span>
                              <span className='text-[12px] text-black/60'>15 ივნ</span>
                            </div>
                          </div>
                          <div className='w-8/12 pr-[16px]'>
                            <input
                              className='bg-white h-[48px] rounded-[12px] w-full px-[16px]'
                              placeholder='შეოყვანე მისამართი'
                            />
                          </div>
                          <div className='w-2/12'>
                            <SelectField
                              control={control}
                              valueKey='id'
                              labelKey='time'
                              name='time'
                              options={times}
                              placeholder='დრო'
                              className='bg-transparent border-green-100'
                            />
                          </div>
                        </div>
                        <div className='flex items-center mt-[12px]'>
                          <div className='w-2/12 flex items-start'>
                            <Image src='/icons/stop.svg' alt='' height={24} width={24} />

                            <div className='flex flex-col ml-[12px]'>
                              <span className='text-[12px]'>დაბრუნება</span>
                              <span className='text-[12px] text-black/60'>20 ივნ</span>
                            </div>
                          </div>
                          <div className='w-6/12'>
                            <Typography type='body' className='text-[14px] ml-[40px]'>
                              თბილისი, იაკობ წურტაველის 72
                            </Typography>
                          </div>
                          <div className='w-4/12 flex justify-between'>
                            <SelectField
                              control={control}
                              valueKey='id'
                              labelKey='time'
                              name='time'
                              options={times}
                              placeholder='დრო'
                              className='bg-transparent border-green-100'
                            />
                            <button
                              onClick={toggleEditModal}
                              className='ml-[16px] border border-black flex items-center justify-center h-[48px] rounded-[12px] text-[12px] px-[24px]'
                            >
                              შეცვლა
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {checked && option.children && <div className='mt-6'> {option.children} </div>}
                <BookingModal open={openEditModal} onClose={toggleEditModal} />
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}

export default BookingRadio
