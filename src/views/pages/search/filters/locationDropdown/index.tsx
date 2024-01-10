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
            <div className='relative flex text-left w-full'>
              <Listbox.Button
                onClick={resetField}
                className='relative w-32 lg:w-52 cursor-pointer rounded-2xl bg-white px-4 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-raisin-5 sm:text-sm'
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
                        className="fill-transparent"
                      />
                    ) : (
                      <Icon svgPath='chevron' width={10} height={10} className="fill-transparent" />
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
                <Listbox.Options className='min-w-[240px] absolute top-full z-10 mt-6 w-full origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-lg focus:outline-none overflow-hidden'>
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
          </Listbox>
        )}
      />
    </>
  )
}

export default LocationDropdown
