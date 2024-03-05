import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Controller } from 'react-hook-form'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import { FilterContainer, InnerFilterContainer } from './styles'
import useSearchLocations from './useSearchLocations'
import {useTranslation} from "next-i18next";

interface Props {
  control: any
}

const LocationDropdown: React.FC<Props> = ({ control }) => {
  const { cities } = useSearchLocations()
  const {t} = useTranslation()
  const dynamicTranslateCities = (word:any) => {
    switch (word){
      case 'თბილისი':
        return t('backend_cities.tbilisi');
      case 'ბათუმი':
        return t('backend_cities.batumi');
      case 'გორი':
        return t('backend_cities.gori');
      case 'ზუგდიდი':
        return t('backend_cities.zugdidi');
      case 'თელავი':
        return t('backend_cities.telavi');
      case 'ქუთაისი':
        return t('backend_cities.kutaisi');
      case 'რუსთავი':
        return t('backend_cities.rustavi');
      case 'კასპი':
        return t('backend_cities.kaspi');
      case 'ხაშური':
        return t('backend_cities.khashuri');
      case 'დედოფლისწყარო':
        return t('backend_cities.dedofliswyaro');
      case 'წალენჯიხა':
        return t('backend_cities.tsalenjikha');
      default:
        return word
    }
  }

  return (
    <>
      <Controller
        name='location'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Listbox value={cities?.find((opt: { city: any }) => opt?.city === value?.city)} onChange={onChange}>
            <div className='relative flex text-left w-full'>
              <Listbox.Button className='relative w-full cursor-pointer rounded-2xl md:bg-white py-5 px-4 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-raisin-5 sm:text-sm'>
                <FilterContainer>
                  <Typography type='body' color='dark'>
                    {t('location')}
                  </Typography>
                  <InnerFilterContainer>
                    <Typography type='subtitle' className='text-raisin-50 whitespace-nowrap'>
                      {value || t('city_address')}
                    </Typography>
                    <Image src='/icons/chevron.svg' className='inline fill-white m-2' alt='img' />
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
                            {dynamicTranslateCities(city.city)}
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
