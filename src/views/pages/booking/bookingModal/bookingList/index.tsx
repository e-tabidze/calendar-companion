import tw from 'tailwind-styled-components'
import { RadioGroup } from '@headlessui/react'
import { Controller, useWatch } from 'react-hook-form'
import dynamic from 'next/dynamic'

const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
const Divider = dynamic(() => import('../../../../components/divider'), { ssr: false })
const Typography = dynamic(() => import('../../../../components/typography'), { ssr: false })
interface Props {
  addresses: any
  control: any
}

const BookingList: React.FC<Props> = ({ addresses, control }) => {
  const Circle = tw.div<{
    checked: boolean
  }>`w-6 h-6 md:w-8 md:h-8 flex shrink-0 items-center justify-center rounded-full border-[2px] border-raisin-100  outline-none ${props =>
    props.checked ? `bg-green-100 border-0` : ''}`

  console.log(addresses, 'addresses')

  const formState = useWatch({ control })

  return (
    <div className='md:px-10'>
      {formState?.supply === '0' && (
        <>
          <div className='flex items-center my-4 ml-5 md:ml-0'>
            <Icon svgPath='booking-start' height={24} width={24} className='fill-transparent flex mr-4' />
            <Typography type='body' className='text-md md:text-2lg font-normal'>
              წაყვანა
            </Typography>
          </div>
          <Controller
            name='start_address'
            control={control}
            render={({ field: { value, onChange } }) => (
              <RadioGroup value={value} onChange={onChange} name='start_address'>
                <div className='w-full'>
                  {addresses?.map((cityData: any) => (
                    <div key={cityData.city} className='w-full'>
                      {cityData.addresses.map((address: any) => (
                        <RadioGroup.Option key={address.address} value={address.address} className='w-full'>
                          <div className='my-2'>
                            <div
                              className={`md:rounded-3xl py-3 px-5 md:pl-10 md:pr-6 ${
                                value === address.address ? 'bg-green-10' : 'bg-raisin-5'
                              }`}
                            >
                              <div className='flex justify-between items-center'>
                                <RadioGroup.Label className='flex items-center' style={{ margin: '0px' }}>
                                  <Circle checked={value === address.address}>
                                    {value === address.address && (
                                      <Icon svgPath='check' width={11} height={10} className='fill-white' />
                                    )}
                                  </Circle>
                                  <Typography type='subtitle' className='text-sm ml-3'>
                                    {address.address}
                                  </Typography>
                                </RadioGroup.Label>
                              </div>
                            </div>
                          </div>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}
          />
          <Divider className='my-10' />
        </>
      )}

      <div className='flex items-center mb-4 ml-5 md:ml-0'>
        <Icon svgPath='booking-stop' width={24} height={24} className='fill-transparent flex mr-4' />
        <Typography type='body' className='text-md md:text-2lg font-normal'>
          დაბრუნება
        </Typography>
      </div>
      <Controller
        name='end_address'
        control={control}
        render={({ field: { value, onChange } }) => (
          <RadioGroup value={value} onChange={onChange} name='end_address'>
            <div className='w-full'>
              {addresses?.map((cityData: any) => (
                <div key={cityData.city} className='w-full'>
                  {cityData.addresses.map((address: any) => (
                    <RadioGroup.Option key={address.address} value={address.address} className='w-full'>
                      <div className='my-2'>
                        <div
                          className={`md:rounded-3xl py-3 px-5 md:pl-10 md:pr-6 ${
                            value === address.address ? 'bg-green-10' : 'bg-raisin-5'
                          }`}
                        >
                          <div className='flex justify-between items-center'>
                            <RadioGroup.Label className='flex items-center' style={{ margin: '0px' }}>
                              <Circle checked={value === address.address}>
                                {value === address.address && (
                                  <Icon svgPath='check' width={11} height={9} className='fill-white' />
                                )}
                              </Circle>
                              <Typography type='subtitle' className='ml-3'>
                                {address.address}
                              </Typography>
                            </RadioGroup.Label>
                          </div>
                        </div>
                      </div>
                    </RadioGroup.Option>
                  ))}
                </div>
              ))}
            </div>
          </RadioGroup>
        )}
      />
    </div>
  )
}

export default BookingList
