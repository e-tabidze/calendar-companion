import React, { useState } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { DefaultInput, InputWithComponent } from 'src/views/components/input'
import RoundedTag from 'src/views/components/roundedTag'
import SwitchField from 'src/views/components/switchField'
import TimeRangeComponent from '../timeRangeComponent'

const days = [
  { label: 'ორშ', value: 'monday' },
  { label: 'სამ', value: 'tuesday' },
  { label: 'ოთხ', value: 'wednesday' },
  { label: 'ხუთ', value: 'thursday' },
  { label: 'პარ', value: 'friday' },
  { label: 'შაბ', value: 'saturday' },
  { label: 'კვი', value: 'sunday' }
]

interface Props {
  index: number
  onWorkingHoursChange?: any
  workingHoursObject?: any
  control: any
  errors: any
}

const BranchInfoComponent: React.FC<Props> = ({ index, control, errors }) => {
  const [map, setMap] = useState(false)

  const toggleMap = () => setMap(prevMap => !prevMap)

  const formState = useWatch({ control })

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

  const renderTimeRangeComponent = (day: string) => <TimeRangeComponent index={index} control={control} day={day} />

  return (
    <div className='mb-6 large:border large:border-raisin-10 rounded-3xl large:py-10 large:px-9 grid grid-cols-1 gap-7'>
      <InputWithComponent
        label='მისამართი'
        onComponentClick={toggleMap}
        name={`addresses.${index}.address`}
        control={control}
      />
      <DefaultInput
        label='ტელეფონის ნომერი'
        name={`addresses.${index}.phone`}
        control={control}
        errors={errors}
      />

      <SwitchField
        name={`addresses.${index}.isSameTime`}
        label='ერთნაირი დროის მონიშვნა'
        defaultValue={true}
        control={control}
      />

      {formState.addresses[index]?.isSameTime ? (
        <div className='flex items-center justify-between' key={index}>
          <div className='flex items-center gap-4'>{days.map(day => renderDaysSelector(day))}</div>
          {renderTimeRangeComponent('monday')}
        </div>
      ) : (
        <div>
          {days.map(day => (
            <div className='flex items-center gap-6' key={day.value}>
              {renderDaysSelector(day)}
              {renderTimeRangeComponent(day.value)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BranchInfoComponent
