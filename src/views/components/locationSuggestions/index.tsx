import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Fragment } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { Combobox, Transition } from '@headlessui/react'
import Icon from 'src/views/app/Icon'
import useCompanyInfo from 'src/hooks/useCompanyInfo'

interface Props {
  index: number
  control: any
  name: string
  border?: boolean
}

const LocationSuggestions: React.FC<Props> = ({ index, control, name, border }) => {
  const { getLocationSuggestions } = useCompanyInfo()

  const formState = useWatch({ control })

  const { data: locationSuggestions, isLoading } = useQuery(
    ['locationSuggestions', formState?.addresses[index]?.city],
    () => getLocationSuggestions(formState?.addresses[index]?.city),
    {
      enabled: formState?.addresses[index]?.city?.length >= 3
    }
  )

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className='lg:col-span-1'>
          <Combobox value={value} onChange={onChange}>
            <div className='relative'>
              <div className='relative w-full cursor-default overflow-hidden rounded-lg'>
                <Combobox.Input
                  placeholder='ქალაქი (მინიმუმ 3 სიმბოლო)'
                  className={`${
                    border ? 'border border-raisin-10' : ''
                  } h-12 lg:h-14 w-full rounded-xl px-3 text-2sm text-raisin-100`}
                  displayValue={value}
                  onChange={
                    onChange

                    // setValue(`addresses.${index}.city`, firstValue)
                    // setValue(`addresses.${index}.lat`, option.lat)
                    // setValue(`addresses.${index}.long`, option.lng)
                  }
                />
              </div>
              {formState?.addresses[index]?.city?.length >= 3 && (
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Combobox.Options className='absolute z-[11] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
                    {formState?.addresses[index]?.city?.length >= 3 && isLoading ? (
                      <div className='flex justify-center p-4'>
                        <Icon svgPath='loader' width={30} height={30} />
                      </div>
                    ) : (
                      <>
                        {locationSuggestions?.result?.data.map((location: any, index: any) => (
                          <Combobox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 px-4 ${active ? 'bg-raisin-10' : ''}`
                            }
                            value={location.locations.join(',')}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`inline-flex truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                  {location.locations.join(', ')}
                                </span>
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </>
                    )}
                  </Combobox.Options>
                </Transition>
              )}
            </div>
          </Combobox>
        </div>
      )}
    />
  )
}

export default LocationSuggestions
