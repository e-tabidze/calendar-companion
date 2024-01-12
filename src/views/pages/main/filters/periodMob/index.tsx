import React, { useState } from 'react'
import PeriodModal from 'src/views/pages/main/filters/periodMob/periodModal'
import { FilterContainer, InnerFilterContainer } from 'src/views/pages/main/filters/periodDropdown/styles'
import Typography from 'src/views/components/typography'
import Icon from 'src/views/app/Icon'
import { useWatch } from 'react-hook-form'

interface Props {
  control: any
  resetField?:any
}

const PeriodMob: React.FC<Props> = ({ control, resetField }) => {
  const [calendar, toggleCalendar] = useState(false)
  const formState = useWatch({ control })

  return (
    <div className='p-4 w-full'>
      <FilterContainer onClick={() => toggleCalendar(!calendar)}>
        <Typography type='body' color='dark'>
          დაქირავების პერიოდი
        </Typography>
        <InnerFilterContainer>
          <Typography type='subtitle' className='text-raisin-50'>
            {formState?.booking?.book_from && formState?.booking?.book_to
              ? `${formState?.booking?.book_from} - ${formState?.booking?.book_to}`
              : 'თარიღი'}
          </Typography>
          {(formState?.booking?.book_from || formState?.booking?.book_to) ? (
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
              <Icon svgPath='chevron' width={10} height={10} className="fill-transparent ml-2" />
          )}
        </InnerFilterContainer>
      </FilterContainer>

      <PeriodModal open={calendar} toggleModal={() => toggleCalendar(!calendar)} control={control} />
    </div>
  )
}

export default PeriodMob
