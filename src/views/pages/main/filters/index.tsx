import { IconTextButton } from '../../../components/button'
import LocationDropdown from './locationDropdown'
import { Divider, ExtraFiltersContainer, FiltersContainer } from './styles'
import PeriodDropdown from './periodDropdown'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Filters = () => {
  const [filters, toggleFilters] = useState(false)

  const router = useRouter()

  const onClickSearch = () => {
    router.push('/search')
  }

  return (
    <>
      <FiltersContainer>
        <LocationDropdown />
        <Divider />
        <PeriodDropdown />
        <Divider />
        <ExtraFiltersContainer>
          <IconTextButton
            label={'დამატებითი ფილტრი'}
            icon={'/icons/filters.svg'}
            bg='white'
            labelClassname='text-xs text-base-100 text-left md:hidden'
            className='mr-[16px]'
            onClick={() => toggleFilters(!filters)}
          />
          <IconTextButton
            label={'ძებნა'}
            icon={'/icons/search.svg'}
            bg='bg-red-100'
            labelClassname='text-2sm text-white md:hidden'
            onClick={onClickSearch}
            className=''
          />
        </ExtraFiltersContainer>
      </FiltersContainer>

      {/* <AdditionalFilters open={filters} setOpen={() => toggleFilters(!filters)} control={control} /> */}
    </>
  )
}

export default Filters
