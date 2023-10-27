import React from 'react'
import SelectField from 'src/views/components/selectField'

interface Props {
  control: any
  day?: string
  startTimeName: string
  endTimeName: string
}

const TimeRangeComponent: React.FC<Props> = ({ control, startTimeName, endTimeName }) => {
  const generateTimeOptions = () => {
    const options = []

    for (let hour = 0; hour < 24; hour++) {
      const time = hour.toString().padStart(2, '0') + ':00'
      options.push({ value: time, label: time })
    }

    return options
  }

  return (
    <div className='flex items-center gap-1'>
      <SelectField
        options={generateTimeOptions()}
        className='my-2'
        icon
        name={startTimeName}
        control={control}
      />
      <div className='h-px w-[6px] bg-raisin-130' />
      <SelectField
        options={generateTimeOptions()}
        className='my-2'
        icon
        control={control}
        name={endTimeName}
      />
    </div>
  )
}

export default TimeRangeComponent
