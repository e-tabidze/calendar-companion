import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Typography from 'src/views/components/typography'
import { DateSelectContainer, InnerDateSelectContainer } from './styles'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Image from 'next/image'
import { Controller } from 'react-hook-form'

interface Props {
  name: string
  control: any
  defaultValue?: string
  label: string
}

interface CalendarInputProps {
  value: string
  onClick: () => void
  isCalendarOpen: boolean
  label: string
}

const CustomDateInput: React.FC<CalendarInputProps> = ({ value, onClick, isCalendarOpen, label }) => (
  <div className='relative w-full h-12'>
    <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
      <Image src='/icons/calendar.svg' alt='calendar' height={24} width={24} />
    </div>
    <input
      type='text'
      className='w-full h-full pl-12 pr-8 pb-1 pt-4 rounded-xl border border-raisin-10 text-2sm outline-none focus:ring-0 bg-transparent'
      value={value}
      onClick={onClick}
      readOnly
    />
    <label className={`absolute left-12 ${value ? 'text-sm text-raisin-50 top-[2px]' : 'hidden'}`}>{label}</label>
    <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
      <Image
        src='/icons/chevron.svg'
        alt='chevron'
        height={6}
        width={10}
        className={`transform ${isCalendarOpen ? 'rotate-0' : 'rotate-180'}`}
      />
    </div>
  </div>
)

const DateDropdown: React.FC<Props> = ({ name, control, defaultValue, label }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <>
          {console.log(value, 'value')}
          <DatePicker
            selected={new Date(value)}
            onChange={date => onChange(date)}
            customInput={
              <CustomDateInput
                value={value}
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                isCalendarOpen
                label={label}
              />
            }
            onCalendarOpen={() => setIsCalendarOpen(true)}
            onCalendarClose={() => setIsCalendarOpen(false)}
          />
        </>
      )}
    />
  )
}

export default DateDropdown
