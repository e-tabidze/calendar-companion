import { Combobox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Controller } from 'react-hook-form'
import Typography from 'src/views/components/typography'
import { FilterContainer, InnerFilterContainer } from './styles'
import useSearchLocations from './useSearchLocations'
import Icon from 'src/views/app/Icon'

interface Props {
  control: any
  resetField?: any
}

const LocationDropdown: React.FC<Props> = ({ control, resetField }) => {
  const { cities } = useSearchLocations()

  return (
    <div className='w-full'>
      <Controller
        name='location'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Combobox value={cities?.find((opt: { city: any }) => opt?.city === value?.city)} onChange={onChange}>
            {({ open }) => (
              <div className='relative flex text-left w-full rounded-2xl'>
                <Combobox.Button className='w-full flex items-center pl-3 lg:pl-4 pr-1 lg:pr-2'>
                  <FilterContainer>
                    <Typography type='body' color='dark'>
                      მდებარეობა
                    </Typography>
                    <InnerFilterContainer>
                      <Combobox.Input
                        className={`flex shrink-0 border-none h-full text-2sm placeholder:text-2sm ${value? 'text-green-100 placeholder:text-green-100':'text-raisin-130 placeholder:text-raisin-50'}`}
                        placeholder='ქალაქი, მისამართი'
                        displayValue={(city: any) => city.city}
                        onChange={onChange}
                        value={value}
                      />
                      {value ? (
                        <span
                          className='flex shrink-0 ml-1 p-2 rounded-full hover:bg-raisin-5 transition-all'
                          onClick={e => {
                            resetField(), e.stopPropagation()
                          }}
                        >
                          <Icon
                            svgPath='clear-xs'
                            width={7}
                            height={7}
                            color='raisin-10'
                            className='fill-transparent'
                          />
                        </span>
                      ) : (
                        <span className='flex shrink-0 ml-1 p-2 rounded-full hover:bg-raisin-5 transition-all'>
                          <Icon
                            svgPath='chevron'
                            width={8}
                            height={6}
                            className={`${open ? 'rotate-180' : ''} transition-all fill-transparent`}
                          />
                        </span>
                      )}
                    </InnerFilterContainer>
                  </FilterContainer>
                </Combobox.Button>

                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Combobox.Options className='absolute z-[11] top-full pt-2 mt-8 max-h-[274px] w-full overflow-auto rounded-2xl bg-white shadow-lg'>
                    {(open && value.length > 0 && cities?.find((opt: any) => opt?.city === value)?.city
                      ? cities
                      : cities?.filter((city: any) => city.city.toLowerCase().includes(value.toLowerCase()))
                    )?.map((city: any) => (
                      <Combobox.Option
                        key={city?.city}
                        className='hover:bg-raisin-5 cursor-pointer select-none py-2 px-6 flex items-center last:mb-2'
                        value={city.city}
                      >
                        <Icon
                          svgPath='locationOutline'
                          width={24}
                          height={24}
                          className='fill-transparent flex shrink-0 mr-2'
                        />
                        <span className='text-sm flex truncate font-normal text-black/70'>{city.city}</span>
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </Transition>
              </div>
            )}
          </Combobox>
        )}
      />
    </div>
  )
}

export default LocationDropdown
