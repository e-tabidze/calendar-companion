import React, { useState } from 'react'
import { FilterContainer, InnerFilterContainer } from 'src/views/pages/main/filters/periodDropdown/styles'
import Typography from 'src/views/components/typography'
import Icon from 'src/views/app/Icon'
import { useWatch } from 'react-hook-form'
import LocationModal from 'src/views/pages/main/filters/locationMob/locationModal'
import {useTranslation} from "next-i18next";

interface Props {
  control: any
  resetField?:any
}

const LocationMob: React.FC<Props> = ({ control, resetField }) => {
  const [location, toggleLocation] = useState(false)
  const formState = useWatch({ control })
  const {t}= useTranslation()

  return (
    <div className='p-4 w-full flex'>
      <FilterContainer onClick={() => toggleLocation(!location)}>
        <Typography type='body' color='dark'>
          {t('location')}
        </Typography>
        <InnerFilterContainer>
          <Typography type='subtitle' className={`${formState.location ? 'text-green-100':'text-raisin-50'}`}>
            {formState.location || t('city_address')}
          </Typography>
          {formState.location ? (
              <Icon
                  svgPath='clear-xs'
                  width={7}
                  height={7}
                  color='raisin-10'
                  onClick={e => {
                    resetField(), e.stopPropagation()
                  }}
                  className="fill-transparent ml-2"
              />
          ) : (
              <Icon svgPath='chevron' width={8} height={6} className="fill-transparent ml-2" />
          )}
        </InnerFilterContainer>
      </FilterContainer>

      <LocationModal open={location} toggleModal={() => toggleLocation(!location)} control={control} />
    </div>
  )
}

export default LocationMob
