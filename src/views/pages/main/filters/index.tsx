import { IconTextButton } from '../../../components/button'
import LocationDropdown from './locationDropdown'
import { Divider, ExtraFiltersContainer, FiltersContainer } from './styles'
import PeriodDropdown from './periodDropdown'
import { useState } from 'react'
import AdditionalFilters from 'src/views/components/additionalFilters'
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
            className='max-w-[20%]'
            onClick={() => toggleFilters(!filters)}
          />
          <IconTextButton
            label={'ძებნა'}
            icon={'/icons/search.svg'}
            bg='bg-red-100'
            labelClassname='text-2sm text-white md:hidden'
            onClick={onClickSearch}
            className="mr-4 lg:mr-0"
          />
        </ExtraFiltersContainer>
      </FiltersContainer>
      <AdditionalFilters open={filters} setOpen={() => toggleFilters(!filters)} />
    </>
  )
}

export default Filters
