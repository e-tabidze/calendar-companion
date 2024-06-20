import { Fragment, useEffect, useRef, useState } from 'react'
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

interface Filter {
  id: string
  label: string
  order_by: string
}

const SortListBox: React.FC<Props> = ({ control, onClick, setValue }) => {
  const { sortFilters } = useFilters()
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null)
  const isFirstRender = useRef(true)
  const updateOrderRef = useRef(false)
  const urlSearchParams = new URLSearchParams(window.location.search)

  useEffect(() => {
    if (!isFirstRender.current) {
      if (selectedFilter) {
        urlSearchParams.set('selectedFilterId', selectedFilter.id)
      } else {
        urlSearchParams.delete('selectedFilterId')
      }
      const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`
      window.history.replaceState(null, '', newUrl)

      if (updateOrderRef.current) {
        setValue('order_by', selectedFilter?.order_by || '')
        onClick()
        setSelectedFilter(null)
        updateOrderRef.current = false
      }
    } else {
      isFirstRender.current = false
    }
  }, [selectedFilter, onClick, setValue])

  console.log(sortFilters, 'sortFilters')

  return (
    <>
      <Controller
        name='sort_by'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Listbox
            value={sortFilters?.find(opt => opt?.id === value)?.id}
            onChange={selectedFilterId => {
              const selectedFilter = sortFilters.find(opt => opt?.label === selectedFilterId) || null
              setSelectedFilter(selectedFilter)
              onChange(selectedFilter?.id || '')
              updateOrderRef.current = true
            }}
          >
            {({ open }) => (
              <div className='relative flex text-left ml-2'>
                <Listbox.Button
                  className={`${
                    open ? 'bg-grey-100 border-raisin-30' : 'bg-white'
                  } relative flex items-center cursor-pointer rounded-xl py-2 px-4 text-left border border-raisin-10 hover:bg-grey-100 hover:border-raisin-30 text-2sm hover:border-raisin-100 transition-all`}
                >
                  <Icon svgPath='sort' width={20} height={12} className='fill-transparent flex shrink-0 mr-3' />
                  <Typography
                    type='subtitle'
                    className='text-sm lg:text-2sm max-w-[110px] md:max-w-[176px] inline-block overflow-hidden text-ellipsis whitespace-nowrap line-clamp-1'
                  >
                    {sortFilters.find(opt => opt.id === value && opt.order_by === urlSearchParams.get('order_by'))
                      ?.label || 'დაჯგუფება'}
                  </Typography>
                  <Icon
                    svgPath='chevron'
                    width={8}
                    height={6}
                    className={`${open ? 'rotate-180' : ''} fill-transparent flex shrink-0 ml-3 transition-all`}
                  />
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options className='absolute z-[11] top-full mt-2 py-2 w-full overflow-hidden rounded-2xl bg-white shadow-lg'>
                    {sortFilters?.map((filter: any, index: number) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `hover:bg-raisin-5 cursor-pointer select-none py-2 px-6 flex items-center ${
                            active ? 'bg-raisin-10' : 'text-gray-900'
                          }`
                        }
                        value={filter.label}
                      >
                        <span className={`text-2sm flex truncate font-normal text-black/70`}>{filter.label}</span>
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

export default SortListBox
