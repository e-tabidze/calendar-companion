import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Controller } from 'react-hook-form'
import Typography from 'src/views/components/typography'
import { FilterContainer, InnerFilterContainer } from './styles'
import useSearchLocations from './useSearchLocations'
import Icon from 'src/views/app/Icon'

interface Props {
  control: any
}

const LocationDropdown: React.FC<Props> = ({ control }) => {
  const { cities } = useSearchLocations()

  return (
    <div className='w-full'>
      <Controller
        name='location'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Listbox value={cities?.find((opt: { city: any }) => opt?.city === value?.city)} onChange={onChange}>
            <div className='relative mt-1 flex text-left w-full'>
              <Listbox.Button className='relative w-full cursor-pointer rounded-2xl bg-white py-5 px-4 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-raisin-5 sm:text-sm'>
                <FilterContainer>
                  <Typography type='body' color='dark'>
                    მდებარეობა
                  </Typography>
                  <InnerFilterContainer>
                    <Typography type='subtitle' className='text-raisin-50 whitespace-nowrap'>
                      {value || 'ქალაქი, მისამართი'}
                    </Typography>
                    <Icon svgPath='chevron' width={8} height={6} className='fill-transparent inline fill-white m-2' />
                  </InnerFilterContainer>
                </FilterContainer>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute top-full py-2 z-[11] mt-2 w-full overflow-hidden origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-lg focus:outline-none'>
                  {cities?.map((city: any, index: number) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `hover:bg-raisin-5 relative cursor-pointer my-2 select-none py-1 pl-6 pr-4 border-none ${
                          active ? 'bg-raisin-5' : 'text-gray-900'
                        }`
                      }
                      value={city.city}
                    >
                      {({ selected }) => (
                        <div className='flex items-center cursor-pointer'>
                          <Icon svgPath='city' width={24} height={24} className='fill-transparent mr-3' />
                          <span
                            className={`text-sm block truncate ${
                              selected ? 'font-medium text-black' : 'font-normal text-black/70'
                            }`}
                          >
                            {city.city}
                          </span>
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        )}
      />
    </div>
  )
}

export default LocationDropdown
