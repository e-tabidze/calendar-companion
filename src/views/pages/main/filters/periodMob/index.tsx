import React, { useState } from 'react'
import PeriodModal from 'src/views/pages/main/filters/periodMob/periodModal'
import { FilterContainer, InnerFilterContainer } from 'src/views/pages/main/filters/periodDropdown/styles'
import Typography from 'src/views/components/typography'
import Icon from 'src/views/app/Icon'
import { useWatch } from 'react-hook-form'
import { format } from 'date-fns'
import { registerLocale } from 'react-datepicker'

import ka from 'date-fns/locale/ka'

registerLocale('ka', ka)

interface Props {
  control: any
  resetField?: any
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
          <Typography type='subtitle' className={`${formState?.booking?.book_from || formState?.booking?.book_to ? 'text-green-100':'text-raisin-50'}`}>
            {formState?.booking?.book_from?.length > 0 || formState?.booking?.book_to?.length > 0
              ? `  ${
                  formState?.booking?.book_from?.length > 0 &&
                  `${format(new Date(formState?.booking?.book_from), 'd MMM', { locale: ka })}`
                }
                -
            ${
              formState?.booking?.book_to?.length > 0 && formState?.booking?.book_to !== 'თარიღი'
                ? `${format(new Date(formState?.booking?.book_to), 'd MMM', { locale: ka })}`
                : ''
            }`
              : 'თარიღი'}
          </Typography>
          {formState?.booking?.book_from || formState?.booking?.book_to ? (
            <Icon
              svgPath='clear-xs'
              width={7}
              height={7}
              color='raisin-10'
              onClick={e => {
                resetField(), e.stopPropagation()
              }}
              className='fill-transparent ml-2'
            />
          ) : (
            <Icon svgPath='chevron' width={8} height={6} className='fill-transparent ml-2' />
          )}
        </InnerFilterContainer>
      </FilterContainer>

      <PeriodModal open={calendar} toggleModal={() => toggleCalendar(!calendar)} control={control} />
    </div>
  )
}

export default PeriodMob
