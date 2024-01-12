import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker';
import ka from 'date-fns/locale/ka';
import 'react-datepicker/dist/react-datepicker.css'
import { Controller } from 'react-hook-form'
import { format } from 'date-fns'
import Icon from 'src/views/app/Icon'
import _ from 'lodash'


interface Props {
  name: string
  control: any
  defaultValue?: string
  label: string
  errors: any
}

interface CalendarInputProps {
  value: string
  onClick: () => void
  isCalendarOpen: boolean
  label: string
}
registerLocale("ka", ka);

const CustomDateInput: React.FC<CalendarInputProps> = ({ value, onClick, isCalendarOpen, label }) => (
  <div className='relative w-full h-14'>
    <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
      <Icon svgPath='calendar' width={24} height={24} className='fill-transparent' />
    </div>
    <input
      type='text'
      className='w-full h-full pl-12 pr-8 pb-1 pt-3 rounded-xl border border-raisin-10 text-2sm outline-none focus:ring-0 bg-transparent cursor-pointer transition-all hover:border-raisin-30'
      value={value}
      onClick={onClick}
      readOnly
    />
    <label className={`absolute left-12 transition-all text-2sm pointer-events-none ${value ? 'text-sm text-raisin-50 top-[3px]' : 'top-[16px]'}`}>{label}</label>
    <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
      <Icon
        svgPath='chevron'
        height={6}
        width={10}
        className={`fill-transparent transform ${isCalendarOpen ? 'rotate-0' : 'rotate-180'}`}
      />
    </div>
  </div>
)

const DateDropdown: React.FC<Props> = ({ name, control, defaultValue, label, errors }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            locale="ka"
            selected={value ? new Date(value) : null}
            onChange={date => onChange(date && format(date, 'yyyy-MM-dd'))}
            dateFormat='yyyy-MM-dd'
            customInput={
              <CustomDateInput
                value={value || ''}
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                isCalendarOpen
                label={label}
              />
            }
            onCalendarOpen={() => setIsCalendarOpen(true)}
            onCalendarClose={() => setIsCalendarOpen(false)}
          />
        )}
      />
      {_.get(errors, name)?.message && (
        <div id={name} className='text-sm text-red-100 ml-2 my-2 relative'>
          {_.get(errors, name)?.message}
        </div>
      )}
    </>
  )
}

export default DateDropdown
