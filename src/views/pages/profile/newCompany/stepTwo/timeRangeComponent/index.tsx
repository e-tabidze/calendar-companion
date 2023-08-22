import React, { useState } from 'react'
import SelectField from 'src/views/components/selectField'

interface Props {
  index: number
  // setSelectedTimeRange: (time: string) => void
  control: any
  day: string
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

  // console.log(selectOptions, 'selectOptions')
  // const [startTime, setStartTime] = useState<string>('')
  // const [endTime, setEndTime] = useState<string>('')

  // const handleStartTimeChange = (selectedOption: any) => {
  //   setStartTime(selectedOption?.value || '')
  // }

  // const handleEndTimeChange = (selectedOption: any) => {
  //   setEndTime(selectedOption?.value || '')
  // }

  // setSelectedTimeRange(`${startTime} - ${endTime}`)

  return (
    // <div className='flex items-center gap-1'>
    //   <SelectField
    //     options={selectOptions}
    //     disabled={false}
    //     className='my-2'
    //     icon
    //     placeholder=''
    //     onChange={handleStartTimeChange}
    //   />
    //   <div className='h-px w-[6px] bg-raisin-130' />
    //   <SelectField
    //     options={selectOptions}
    //     disabled={false}
    //     className='my-2'
    //     icon
    //     placeholder=''
    //     onChange={handleEndTimeChange}
    //   />
    // </div>
    <div className='flex items-center gap-1'>
      <SelectField
        options={selectOptions}
        disabled={false}
        className='my-2'
        icon
        placeholder=''
        // onChange={handleStartTimeChange}
        name={`company_information.address.${index}.working_hours.${day}.startTime`}
        control={control}
      />
      <div className='h-px w-[6px] bg-raisin-130' />
      <SelectField
        options={selectOptions}
        disabled={false}
        className='my-2'
        icon
        placeholder=''
        // onChange={handleEndTimeChange}
        control={control}
        name={`company_information.address.${index}.working_hours.${day}.endTime`}
      />
    </div>
  )
}

export default TimeRangeComponent
