import React from 'react'
import { generateTimeOptions } from 'src/utils/timeValues'
import SelectField from 'src/views/components/selectField'

interface Props {
  control: any
  day?: string
  startTimeName: string
  endTimeName: string
}

const TimeRangeComponent: React.FC<Props> = ({ control, startTimeName, endTimeName }) => {
  return (
    <div className='flex items-center gap-1'>
      <SelectField
        options={generateTimeOptions()}
        className='my-2'
        icon
        name={startTimeName}
        control={control}
        valueKey='value'
        labelKey='label'
      />
      <div className='h-px w-[6px] bg-raisin-130' />
      <SelectField
        options={generateTimeOptions()}
        className='my-2'
        icon
        control={control}
        name={endTimeName}
        valueKey='value'
        labelKey='label'
      />
    </div>
  )
}

export default TimeRangeComponent
