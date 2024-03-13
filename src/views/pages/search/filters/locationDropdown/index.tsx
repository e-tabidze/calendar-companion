import { Combobox, Transition } from '@headlessui/react'
import { Controller } from 'react-hook-form'
import useSearchLocations from './useSearchLocations'
import dynamic from 'next/dynamic'
import {useTranslation} from "next-i18next";
import { dynamicTranslateCities } from 'src/utils/translationUtils'

const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
interface Props {
  control: any
  resetField: any
}

const LocationDropdown: React.FC<Props> = ({ control, resetField }) => {
  const { cities } = useSearchLocations()
    const {t} = useTranslation()

  return (
    <Controller
      name='location'
      control={control}
      render={({ field: { onChange, value } }) => (
        <Combobox value={cities?.find((opt: { city: any }) => opt?.city === value?.city)} onChange={onChange}>
          {({ open }) => (
            <div className='relative h-full'>
              <Combobox.Button className='h-full flex items-center pl-3 lg:pl-4 pr-1 lg:pr-2'>
                <Combobox.Input
                  className='bg-transparent border-none h-full text-2sm text-raisin-130 placeholder:text-sm placeholder:text-raisin-130'
                  placeholder={t('location')}
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
                    <Icon svgPath='clear-xs' width={7} height={7} color='raisin-10' className='fill-transparent' />
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
              </Combobox.Button>
              <Transition
                show={open}
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
              >
                <Combobox.Options className='absolute z-[11] top-full pt-2 mt-4 max-h-[274px] w-full overflow-auto rounded-2xl bg-white shadow-lg'>
                  {(open && value.length > 0 && cities?.find((opt: any) => opt?.city === value)?.city
                    ? cities
                    : cities?.filter((city: any) => city.city.toLowerCase().includes(value.toLowerCase()))
                  )?.map((city: any) => (
                    <Combobox.Option
                      key={city?.city}
                      className='hover:bg-raisin-5 cursor-pointer select-none py-2 px-6 flex items-center last:mb-2'
                      value={city.city}
                    >
                      <span
                        className={`text-sm flex truncate font-normal ${
                          value == city.city ? 'text-green-100' : 'text-raisin-100'
                        }`}
                      >
                        {dynamicTranslateCities(city.city, t)}
                      </span>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Transition>
            </div>
          )}
        </Combobox>
      )}
    />
  )
}

export default LocationDropdown
