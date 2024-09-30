import React, { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import ka from 'date-fns/locale/ka'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller } from 'react-hook-form'
import { format } from 'date-fns'
import _ from 'lodash'
import { i18n } from 'next-i18next'

interface Props {
  name: string
  control: any
  label: string
  errors: any
}

registerLocale('ka', ka)

interface InputProps {
  className: string
  value: string
  onClick: () => void
  onFocus?: () => void
  onChange: () => void
}

const Input: React.FC<InputProps> = ({ className, value, onClick, onFocus, onChange }) => (
  <input className={className} type='text' value={value} onFocus={onFocus} onChange={onChange} onClick={onClick} />
)

interface CalendarInputProps extends InputProps {
  isCalendarOpen: boolean
  label: string
}

const CustomDateInput: React.FC<CalendarInputProps> = ({
  className,
  value,
  onClick,
  isCalendarOpen,
  label,
  onFocus,
  onChange
}) => (
  <div className='relative'>
    <Input className={className} value={value} onClick={onClick} onFocus={onFocus} onChange={onChange} />
  </div>
)

const DateDropdown: React.FC<Props> = ({ name, control, label, errors }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, onChange: onInputChange } }) => (
          <DatePicker
            locale={i18n?.language}
            selected={value ? new Date(value) : null}
            onChange={date => onChange(date && format(date, 'yyyy-MM-dd'))}
            dateFormat='MMM d'
            customInput={
              <CustomDateInput
                className='text-grey-90 text-[13px] max-w-[40px] outline-none focus:ring-0 bg-transparent transition-all hover:border-raisin-30'
                value={value || ''}
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                isCalendarOpen={isCalendarOpen}
                label={label}
                onChange={onInputChange}
              />
            }
            onCalendarOpen={() => setIsCalendarOpen(true)}
            onCalendarClose={() => setIsCalendarOpen(false)}
          />
        )}
      />
    </>
  )
}

export default DateDropdown
