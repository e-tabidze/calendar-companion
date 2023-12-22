import React from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { days } from 'src/utils/sample-data'
import { DefaultInput } from 'src/views/components/input'
import RoundedTag from 'src/views/components/roundedTag'
import SwitchField from 'src/views/components/switchField'

import TimeRangeComponent from './timeRangeComponent'
import LocationSuggestions from 'src/views/components/locationSuggestions'

interface Props {
  index: number
  onWorkingHoursChange?: any
  workingHoursObject?: any
  control: any
  errors: any
  setValue: any
}

const BranchInfoComponent: React.FC<Props> = ({ index, control, errors, setValue }) => {
  const formState = useWatch({ control })

  // useEffect(() => {
  //   if (formState.addresses[index].is_same_time) {
  //     const selectedWorkDays = Object.keys(formState.addresses[index].working_hours).filter(
  //       day => formState.addresses[index].working_hours[day].is_selected
  //     )

  //     const startTime = formState.addresses[index].start_time
  //     const endTime = formState.addresses[index].end_time

  //     const shouldUpdate =
  //       selectedWorkDays.some(day => formState.addresses[index].working_hours[day].start_time !== startTime) ||
  //       selectedWorkDays.some(day => formState.addresses[index].working_hours[day].end_time !== endTime)

  //     if (shouldUpdate) {
  //       selectedWorkDays.forEach(day => {
  //         setValue(`addresses.${index}.working_hours.${day}.start_time`, startTime)
  //         setValue(`addresses.${index}.working_hours.${day}.end_time`, endTime)
  //       })
  //     }
  //   }
  // }, [formState.addresses[index], index, setValue])

  console.log(setValue)

  const renderDaysSelector = (day: any) => (
    <Controller
      key={day.value}
      name={`addresses.${index}.working_hours.${day.value}`}
      control={control}
      render={({ field: { value, onChange } }) => (
        <RoundedTag
          label={day.label}
          handleSelect={() => {
            const updatedValue = {
              ...value,
              is_selected: !value.is_selected
            }
            if (!updatedValue.is_selected) {
              updatedValue.start_time = ''
              updatedValue.end_time = ''
            }
            onChange(updatedValue)
          }}
          selected={value?.is_selected}
        />
      )}
    />
  )

  return (
    <div className='mb-6 md:border md:border-raisin-10 rounded-3xl md:py-10 md:px-9 grid grid-cols-1 gap-7'>
      <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-4 relative'>
        <LocationSuggestions index={index} control={control} name={`addresses.${index}.address`} border />

        <DefaultInput label='ტელეფონი' name={`addresses.${index}.phone`} control={control} errors={errors} />
      </div>

      <SwitchField
        name={`addresses.${index}.is_same_time`}
        label='ერთნაირი დროის მონიშვნა'
        control={control}
        reversed
      />

      {formState.addresses[index]?.is_same_time ? (
        <div className='flex flex-col gap-2 lg:items-center lg:flex-row justify-between' key={index}>
          <div className='flex items-center gap-4'>{days.map(day => renderDaysSelector(day))}</div>
          <TimeRangeComponent
            control={control}
            startTimeName={`addresses.${index}.start_time`}
            endTimeName={`addresses.${index}.end_time`}
          />
        </div>
      ) : (
        <div>
          {days.map(day => (
            <div className='flex items-center gap-6' key={day.value}>
              {renderDaysSelector(day)}
              <TimeRangeComponent
                control={control}
                startTimeName={`addresses.${index}.working_hours.${day.value}.start_time`}
                endTimeName={`addresses.${index}.working_hours.${day.value}.end_time`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BranchInfoComponent
