import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Controller } from 'react-hook-form'
import { FilterContainer, InnerFilterContainer } from './styles'
import useSearchLocations from './useSearchLocations'
import dynamic from 'next/dynamic'

const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
interface Props {
  control: any
  resetField: any
}

const LocationDropdown: React.FC<Props> = ({ control, resetField }) => {
  const { cities } = useSearchLocations()

  return (
    <>
      <Controller
        name='location'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Listbox value={cities?.find((opt: { city: any }) => opt?.city === value?.city)} onChange={onChange}>
            {({ open }) => (
            <div className='relative flex text-left w-full h-full items-center'>
                    <Listbox.Button
                        onClick={resetField}
                        className='bg-transparent h-full relative cursor-pointer px-3 lg:px-4 text-left sm:text-sm'
                    >
                      <FilterContainer>
                        <InnerFilterContainer>
                          <Typography type='body' className='whitespace-nowrap'>
                            {value || 'მდებარეობა'}
                          </Typography>
                          {value ? (
                              <Icon
                                  svgPath='clear-xs'
                                  width={7}
                                  height={7}
                                  color='raisin-10'
                                  onClick={e => {
                                    resetField(), e.stopPropagation()
                                  }}
                                  className="fill-transparent ml-2"
                              />
                          ) : (
                              <Icon svgPath='chevron' width={8} height={6} className={`${open? 'rotate-180':''} transition-all fill-transparent ml-2`} />
                          )}
                        </InnerFilterContainer>
                      </FilterContainer>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                      <Listbox.Options className='min-w-[240px] max-h-64  absolute overflow-y-auto top-full z-10 mt-6 w-full origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-lg focus:outline-none overflow-hidden'>
                        {cities?.map((city: any, index: number) => (
                            <Listbox.Option
                                key={index}
                                className={({ active }) =>
                                    `relative cursor-pointer select-none py-3 px-6 ${
                                        active ? 'bg-raisin-10' : 'text-gray-900'
                                    }`
                                }
                                value={city.city}
                            >
                              {({ selected }) => (
                                  <>
                          <span className={`text-2sm block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {city.city}
                          </span>
                                  </>
                              )}
                            </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                </div>
            )}

          </Listbox>
        )}
      />
    </>
  )
}

export default LocationDropdown
