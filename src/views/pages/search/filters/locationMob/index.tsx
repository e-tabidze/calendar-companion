import React, { useState } from 'react'
import { useWatch } from 'react-hook-form'
import { FilterContainer, InnerFilterContainer } from './styles'
import dynamic from 'next/dynamic'
import LocationModal from 'src/views/pages/main/filters/locationMob/locationModal'

const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
interface Props {
  control: any
  resetField: any
}

const LocationMob: React.FC<Props> = ({ control, resetField }) => {
  const [location, toggleLocation] = useState(false)
  const formState = useWatch({ control })

  return (
    <>
      <FilterContainer onClick={() => toggleLocation(!location)}>
        <InnerFilterContainer className='py-3 pl-3 pr-1 sm:pl-4 sm:pr-2'>
          <Typography type='subtitle' className='text-sm'>
            {formState.location || 'მდებარეობა'}
          </Typography>
          {formState.location ? (
            <span
              className='flex shrink-0 p-2'
              onClick={e => {
                resetField(), e.stopPropagation()
              }}
            >
              <Icon svgPath='clear-xs' width={7} height={7} color='raisin-10' className='fill-transparent' />
            </span>
          ) : (
            <span className='flex shrink-0 p-2'>
              <Icon svgPath='chevron' width={8} height={6} className='fill-white' />
            </span>
          )}
        </InnerFilterContainer>
      </FilterContainer>
      <LocationModal open={location} toggleModal={() => toggleLocation(!location)} control={control} />
    </>
  )
}

export default LocationMob
