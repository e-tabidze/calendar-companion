import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { DefaultInput, InputWithComponent } from 'src/views/components/input'
import RoundedTag from 'src/views/components/roundedTag'
import SwitchField from 'src/views/components/switchField'
import useCreateCompany from '../../useCreateCompany'
import LocationSuggestions from './locationSuggestions'
import TimeRangeComponent from './timeRangeComponent'

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
  setValue: any
}

const BranchInfoComponent: React.FC<Props> = ({ index, control, errors, setValue }) => {
  const { getLocationSuggestions } = useCreateCompany()

  const formState = useWatch({ control })

  const { data: locationSuggestions, isLoading } = useQuery(
    ['locationSuggestions', formState?.addresses[index]?.address],
    () => getLocationSuggestions(formState?.addresses[index]?.address),
    {
      enabled: formState?.addresses[index]?.address?.length >= 3
    }
  )

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
    <div className='mb-6 md:border md:border-raisin-10 rounded-3xl md:py-10 md:px-9 grid grid-cols-1 gap-7'>
      <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-4 relative'>
        <Controller
          name={`addresses.${index}.address`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <InputWithComponent
                label='მისამართი'
                name={`addresses.${index}.address`}
                control={control}
                className='lg:col-span-2'
              />
              {locationSuggestions?.result?.data && value.length >= 3 && (
                <LocationSuggestions
                  options={locationSuggestions.result.data}
                  isLoading={isLoading}
                  onClick={(option: any) => {
                    const locations = option?.locations || []
                    if (locations.length >= 2) {
                      const firstValue = locations[0]
                      onChange(locations.join(', '))
                      setValue(`addresses.${index}.city`, firstValue)
                    }
                  }}
                />
              )}
            </>
          )}
        />

        <DefaultInput label='ტელეფონი' name={`addresses.${index}.phone`} control={control} errors={errors} />
      </div>

      <SwitchField
        name={`addresses.${index}.isSameTime`}
        label='ერთნაირი დროის მონიშვნა'
        defaultValue
        control={control}
      />

      {formState.addresses[index]?.isSameTime ? (
        <div className='flex flex-col gap-2 lg:items-center lg:flex-row justify-between' key={index}>
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
