import React, { useState } from 'react'
import Typography from 'src/views/components/typography'
import { FilterContainer, InnerFilterContainer } from './styles'
import { registerLocale } from 'react-datepicker'
import ka from 'date-fns/locale/ka'
import 'react-datepicker/dist/react-datepicker.css'
import { useWatch } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import PeriodModal from 'src/views/pages/main/filters/periodMob/periodModal'
import { format } from 'date-fns'
import {useTranslation} from "next-i18next";

interface Props {
  control: any
  resetField: any
}
registerLocale('ka', ka)

const PeriodMob: React.FC<Props> = ({ control, resetField }) => {
  const [calendar, toggleCalendar] = useState(false)
  const formState = useWatch({ control })
    const {t} = useTranslation()

  return (
    <>
      <FilterContainer onClick={() => toggleCalendar(!calendar)}>
        <InnerFilterContainer className='py-3 pl-3 pr-1 sm:pl-4 sm:pr-2'>
          <Typography type='subtitle' className='text-sm whitespace-nowrap'>
            {formState?.booking?.book_from?.length > 0 || formState?.booking?.book_to?.length > 0
              ? `  ${
                  formState?.booking?.book_from?.length > 0 &&
                  `${format(new Date(formState?.booking?.book_from), 'd MMM', { locale: ka })}`
                }
                -
            ${
              formState?.booking?.book_to?.length > 0 && formState?.booking?.book_to !== t('date')
                ? `${format(new Date(formState?.booking?.book_to), 'd MMM', { locale: ka })}`
                : ''
            }`
              : t('rental_period')}
          </Typography>
          {formState?.booking?.book_from || formState?.booking?.book_to ? (
              <span
                  className='flex shrink-0 p-2'
                  onClick={e => {
                  resetField(), e.stopPropagation()
              }}>
               <Icon
                   svgPath='clear-xs'
                   width={7}
                   height={7}
                   color='raisin-10'
                   className='fill-transparent'
               />
              </span>

          ) : (
              <span className='flex-shrink-0 p-2'>
                  <Icon svgPath='chevron' width={8} height={6} className='fill-white' />
              </span>

          )}
        </InnerFilterContainer>
      </FilterContainer>
      <PeriodModal open={calendar} toggleModal={() => toggleCalendar(!calendar)} control={control} />
    </>
  )
}

export default PeriodMob
