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
    <div className='w-full mt-4 md:mt-0 justify-center flex border md:border-0 lg:border border-raisin-10 mx-auto md:ml-4 lg:ml-8 xl:ml-14 rounded-3xl h-12 items-center'>
      <FiltersContainer className='w-full flex md:hidden lg:flex justify-between h-full md:!bg-transparent'>
        {isMobileDevice ? <LocationMob control={control} resetField={handleResetLocation} /> : <LocationDropdown control={control} resetField={handleResetLocation} />}
        <Divider />
        {isMobileDevice ? <PeriodMob control={control} resetField={handleResetBooking} /> : <PeriodDropdown control={control} resetField={handleResetBooking} setValue={setValue} />}
        <ExtraFiltersContainer>
          <button
            onClick={onSubmit}
            className='rounded-full bg-orange-100 hover:bg-orange-110 transition-all w-9 h-9 flex items-center justify-center shrink-0'
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
