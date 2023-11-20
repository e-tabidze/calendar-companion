import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Controller } from 'react-hook-form'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import { FilterContainer, InnerFilterContainer } from './styles'

interface Props {
  control: any
}

const options = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' }
]

const LocationDropdown: React.FC<Props> = ({ control }) => {
  return (
    <>
      <Controller
        name='location'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Listbox value={options?.find(opt => opt.name === value?.name)} onChange={onChange}>
            <div className='relative mt-1 flex text-left w-full'>
              <Listbox.Button className='relative w-full cursor-default rounded-2xl bg-white py-5 px-4 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                <FilterContainer>
                  <Typography type='body' color='dark'>
                    ადგილმდებარეობა
                  </Typography>
                  <InnerFilterContainer>
                    <Typography type='subtitle' className='text-raisin-50 whitespace-nowrap'>
                      {value || 'ქალაქი, აეროპორტი, მისამართი...'}
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
                <Listbox.Options className='absolute top-full z-10 p-4 mt-4 w-full origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-lg focus:outline-none'>
                  {options.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={person.name}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {person.name}
                          </span>
                          {selected ? (
                            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>✅</span>
                          ) : null}
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
