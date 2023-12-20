import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Controller } from 'react-hook-form'
import useFilters from 'src/hooks/useFilters'
import Typography from 'src/views/components/typography'
import Icon from 'src/views/app/Icon'

interface Props {
  control: any
  onClick: () => void
  setValue: any
}

const SortListBox: React.FC<Props> = ({ control, onClick, setValue }) => {
  const { sortFilters } = useFilters()

  return (
    <div className='w-[200px]'>
      <>
        <Controller
          name='sort_by'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Listbox
              value={sortFilters?.find(opt => opt?.id === value)}

              // onChange={selectedFilter => {
              //   console.log(sortFilters.find(opt => opt.id === value)?.order_by, 'order_by?')
              //   onChange(selectedFilter)
              // setValue('order_by', sortFilters.find(opt => opt.id === value)?.order_by)
              // setValue('order_by', sortFilters?.find(opt => opt?.id === selectedFilter.id)?.order_by)
              //   onClick()
              // }}
              onChange={selectedFilter => {
                console.log(sortFilters.find(opt => opt.id === value)?.order_by, 'order_by?')
                onChange(selectedFilter)
                setValue('order_by', sortFilters.find(opt => opt.id === value)?.order_by)

                onClick()

                // setValue('order_by', sortFilters.find(opt => opt.id === value)?.order_by)

                // Use the promise to wait for setValue to complete before calling onClick
              }}
            >
              <div className='relative mt-1 flex text-left w-full'>
                <Listbox.Button className='relative w-full cursor-pointer rounded-2xl bg-white py-5 px-4 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-raisin-5 sm:text-sm'>
                  <Typography type='subtitle' className='whitespace-nowrap flex items-center gap-3'>
                    <Icon svgPath='sort' width={20} height={12} className='fill-transparent' />
                    {sortFilters.find(opt => opt.id === value)?.label || 'სორტირება'}
                  </Typography>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options className='absolute top-full z-10 mt-4 w-full origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-lg focus:outline-none'>
                    {sortFilters?.map((filter: any, index: number) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-pointer my-2 select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-raisin-10' : 'text-gray-900'
                          }`
                        }
                        value={filter.id}
                      >
                        {({ selected }) => (
                          <>
                            {console.log(filter, 'filter')}
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {filter.label}
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
    </div>
  )
}

export default SortListBox
