import { IconButton } from '../../../components/button'
import LocationDropdown from './locationDropdown'
import { Divider, ExtraFiltersContainer, FiltersContainer } from './styles'
import PeriodDropdown from './periodDropdown'
import { useRouter } from 'next/router'
import useSearch from 'src/hooks/useSearch'

const Filters = () => {
  const router = useRouter()

  const { control, objectToURI, getValues, resetField, setValue, searchValues } = useSearch()

  console.log(searchValues, 'searchValues')

  const onSubmit = () => {
    const updatedSearchValues = getValues()
    router.push(`/search?${objectToURI(updatedSearchValues)}`)
  }

  return (
    <div className='border border-raisin-10'>
      <FiltersContainer>
        <LocationDropdown control={control} resetField={() => resetField('location')} />
        <Divider />
        <PeriodDropdown control={control} resetField={() => resetField('booking')} setValue={setValue} />
        <Divider />
        <ExtraFiltersContainer>
          <IconButton
            icon='/icons/search.svg'
            bg='orange-100'
            onClick={onSubmit}
            width={20}
            height={20}
            className='rounded-full !p-[6px]'
          />
        </ExtraFiltersContainer>
      </FiltersContainer>
    </div>
  )
}

export default Filters
