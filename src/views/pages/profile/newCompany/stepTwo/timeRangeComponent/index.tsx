import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import SelectField from 'src/views/components/selectField'

interface Props {
  index: number
  control: any
  day?: string
}

const TimeRangeComponent: React.FC<Props> = ({ index, control, day }) => {
  const generateTimeOptions = () => {
    const options = []

    for (let hour = 0; hour < 24; hour++) {
      const time = hour.toString().padStart(2, '0') + ':00'
      options.push({ value: time, label: time })
    }

    return options
  }

  const selectOptions = generateTimeOptions()

  console.log(typeof day, 'type')

  return (
    <div className='flex items-center gap-1'>
      <SelectField
        options={selectOptions}
        className='my-2'
        icon
        name={`company_information.address.${index}.working_hours.${day}.startTime`}
        control={control}
      />
      <div className='h-px w-[6px] bg-raisin-130' />
      <SelectField
        options={selectOptions}
        className='my-2'
        icon
        control={control}
        name={`company_information.address.${index}.working_hours.${day}.endTime`}
      />
    </div>
  )
}

export default TimeRangeComponent
