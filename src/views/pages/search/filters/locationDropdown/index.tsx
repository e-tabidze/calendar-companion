import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Controller } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'
import { FilterContainer, InnerFilterContainer } from './styles'
import useSearchLocations from './useSearchLocations'

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
                className='relative w-52 cursor-pointer rounded-2xl bg-white px-4 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-raisin-5 sm:text-sm'
              >
                <FilterContainer>
                  <InnerFilterContainer>
                    <Typography type='body' className='text-raisin-50 whitespace-nowrap'>
                      {value || 'ადგილმდებარეობა'}
                    </Typography>
                    {value ? (
                      <Icon
                        svgPath='clear-xs'
                        width={7}
                        height={7}
                        color="raisin-10"
                        onClick={e => {
                          resetField(), e.stopPropagation()
                        }}
                      />
                    ) : (
                      <Icon svgPath='chevron' width={10} height={10} />
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
                <Listbox.Options className='absolute top-full z-10 mt-4 w-full origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-lg focus:outline-none'>
                  {cities?.map((city: any, index: number) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-pointer my-2 select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-raisin-10' : 'text-gray-900'
                        }`
                      }
                      value={city.city}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
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
