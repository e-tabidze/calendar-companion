import LocationDropdown from './locationDropdown'
import PeriodDropdown from './periodDropdown'
import LocationMob from './locationMob';
import PeriodMob from './periodMob';
import { Divider, ExtraFiltersContainer, FiltersContainer } from './styles'
import { useRouter } from 'next/router'
import useSearch from 'src/hooks/useSearch'
import dynamic from 'next/dynamic'

import {useEffect, useState} from "react";
import {isMobile} from "react-device-detect";

const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })

const Filters = () => {
  const router = useRouter()

  const { control, objectToURI, getValues, setValue } = useSearch()

  const onSubmit = () => {
    const updatedSearchValues = getValues()
    router.push(`/search?${objectToURI(updatedSearchValues)}`)
  }

  const handleResetBooking = () => {
    setValue('booking', { book_from: '', book_to: '' })
  }

  const handleResetLocation = () => {
    setValue('location', '')
  }
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  useEffect(() => {
    setIsMobileDevice(isMobile)
  }, [])

  return (
    <div className='w-full mt-4 md:mt-0 justify-center flex border border-raisin-10 mx-auto md:ml-8 xl:ml-14 rounded-3xl h-12 items-center'>
      <FiltersContainer className='w-full flex justify-between'>
        {isMobileDevice ? <LocationMob control={control} resetField={handleResetLocation} /> : <LocationDropdown control={control} resetField={handleResetLocation} />}
        <Divider className='hidden md:flex' />
        {isMobileDevice ? <PeriodMob control={control} resetField={handleResetBooking} /> : <PeriodDropdown control={control} resetField={handleResetBooking} setValue={setValue} />}
        <Divider className='hidden md:flex' />
        <ExtraFiltersContainer>
          <button
            onClick={onSubmit}
            className='rounded-full bg-orange-100 w-9 h-9 flex items-center justify-center shrink-0'
            type='button'
          >
            <Icon svgPath='search-sm' width={36} height={36} />
          </button>
        </ExtraFiltersContainer>
      </FiltersContainer>
    </div>
  )
}

export default Filters
