import React, { useState } from 'react'
import { FilterContainer, InnerFilterContainer } from 'src/views/pages/main/filters/periodDropdown/styles'
import Typography from 'src/views/components/typography'
import Icon from 'src/views/app/Icon'
import { useWatch } from 'react-hook-form'
import LocationModal from 'src/views/pages/main/filters/locationMob/locationModal'

interface Props {
  control: any
}

const LocationMob: React.FC<Props> = ({ control }) => {
  const [location, toggleLocation] = useState(false)
  const formState = useWatch({ control })

  return (
    <div className='p-4 w-full flex md:hidden'>
      <FilterContainer onClick={() => toggleLocation(!location)}>
        <Typography type='body' color='dark'>
          ადგილდებარეობა
        </Typography>
        <InnerFilterContainer>
          <Typography type='subtitle' className='text-raisin-50'>
            {formState.location || 'ქალაქი, აეროპორტი, მისამართი...'}
          </Typography>
          <Icon svgPath='chevron' width={8} height={6} className='inline fill-white m-2' />
        </InnerFilterContainer>
      </FilterContainer>

      <LocationModal open={location} toggleModal={() => toggleLocation(!location)} control={control} />
    </div>
  )
}

export default LocationMob
