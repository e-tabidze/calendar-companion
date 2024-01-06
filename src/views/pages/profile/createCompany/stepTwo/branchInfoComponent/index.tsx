import React, { useEffect } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { days } from 'src/utils/sample-data'
import { DefaultInput } from 'src/views/components/input'
import RoundedTag from 'src/views/components/roundedTag'
import SwitchField from 'src/views/components/switchField'

import TimeRangeComponent from './timeRangeComponent'
import CitiesSuggestions from 'src/views/components/citiesSuggestions'
import { IconTextButton } from 'src/views/components/button'

interface Props {
  index: number
  onWorkingHoursChange?: any
  workingHoursObject?: any
  control: any
  errors: any
  setValue: any
  removeAddress: any
}

const BranchInfoComponent: React.FC<Props> = ({ index, control, errors, setValue, removeAddress }) => {
  const formState = useWatch({ control })

  useEffect(() => {
    if (formState.addresses[index].is_same_time) {
      const selectedWorkDays = Object.keys(formState.addresses[index].working_hours).filter(
        day => formState.addresses[index].working_hours[day].is_selected
      )

      const startTime = formState.addresses[index].start_time
      const endTime = formState.addresses[index].end_time

      const shouldUpdate =
        selectedWorkDays.some(day => formState.addresses[index].working_hours[day].start_time !== startTime) ||
        selectedWorkDays.some(day => formState.addresses[index].working_hours[day].end_time !== endTime)

      if (shouldUpdate) {
        selectedWorkDays.forEach(day => {
          setValue(`addresses.${index}.working_hours.${day}.start_time`, startTime)
          setValue(`addresses.${index}.working_hours.${day}.end_time`, endTime)
        })
      }
    }
  }, [formState.addresses[index], index, setValue])

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
    <div className='flex flex-col md:border md:border-raisin-10 md:py-10 md:px-9 rounded-3xl'>
      <div className='mb-6 grid grid-cols-1 gap-7'>
        <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-4 relative'>
          <CitiesSuggestions index={index} control={control} name={`addresses.${index}.city`} border errors={errors} />

          <DefaultInput
            label='მისამართი'
            name={`addresses.${index}.address`}
            control={control}
            errors={errors}
            disabled={formState.addresses[index].city.length < 3}
          />

          <DefaultInput label='ტელეფონი' name={`addresses.${index}.phone`} control={control} errors={errors} />
        </div>
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

          {/* <DefaultInput label='ტელეფონი' name={`addresses.${index}.phone`} control={control} errors={errors} /> */}
        </div>
      ) : (
        <div className='grid md:grid-cols-12'>
          <div className='md:col-span-6'>
            {days.slice(0, 5).map(day => (
              <div className='flex items-center gap-6 ' key={day.value}>
                {renderDaysSelector(day)}
                <TimeRangeComponent
                  control={control}
                  startTimeName={`addresses.${index}.working_hours.${day.value}.start_time`}
                  endTimeName={`addresses.${index}.working_hours.${day.value}.end_time`}
                  isDisabled={!formState.addresses[index]?.working_hours[day.value]?.is_selected}
                />
              </div>
            ))}
          </div>
          <div className='md:col-span-6'>
            {days.slice(5).map(day => (
              <div className='flex items-center gap-6 ' key={day.value}>
                {renderDaysSelector(day)}
                <TimeRangeComponent
                  control={control}
                  startTimeName={`addresses.${index}.working_hours.${day.value}.start_time`}
                  endTimeName={`addresses.${index}.working_hours.${day.value}.end_time`}
                  isDisabled={!formState.addresses[index]?.working_hours[day.value]?.is_selected}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {index > 0 && (
        <IconTextButton
          label='წაშლა'
          icon='clear'
          width={20}
          height={20}
          onClick={() => removeAddress(index)}
          type='button'
          className='self-end mb-8'
        />
      )}
    </div>
  )
}

export default BranchInfoComponent
