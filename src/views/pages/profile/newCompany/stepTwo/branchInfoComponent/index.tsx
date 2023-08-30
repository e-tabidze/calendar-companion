import React, { useEffect, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { DefaultInput, InputWithComponent } from 'src/views/components/input'
import RoundedTag from 'src/views/components/roundedTag'
import SwitchField from 'src/views/components/switchField'
import useCreateCompany from '../../useCreateCompany'
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
  // const [selectedWorkDays, setSelectedWorkDays] = useState<string[]>([
  //   'monday',
  //   'tuesday',
  //   'wednesday',
  //   'thursday',
  //   'friday'
  // ])

  const toggleMap = () => setMap(prevMap => !prevMap)

  const formState = useWatch({ control })

  return (
    <div className='mb-6 large:border large:border-raisin-10 rounded-3xl large:py-10 large:px-9 grid grid-cols-1 gap-7'>
      <InputWithComponent
        label='მისამართი'
        onComponentClick={toggleMap}
        name={`company_information.addresses.${index}.address`}
        control={control}
      />
      <DefaultInput
        label='ტელეფონის ნომერი'
        onComponentClick={toggleMap}
        name={`company_information.addresses.${index}.phone`}
        control={control}
        errors={errors}
      />

      <SwitchField
        name={`company_information.addresses.${index}.isSameTime`}
        label='ერთნაირი დროის მონიშვნა'
        defaultValue={true}
        control={control}
      />

      {formState.company_information.addresses[index].isSameTime ? (
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            {days.map(day => (
              <>
                {console.log(day, 'day')}
                <Controller
                  key={day.value}
                  name={`company_information.address.${index}.working_hours.${day.value}`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      {console.log(value, '<= value')}
                      <RoundedTag
                        label={day.label}
                        handleSelect={() => {
                          const updatedValue = {
                            ...value,
                            isSelected: !value.isSelected
                          }
                          if (!updatedValue.isSelected) {
                            updatedValue.startTime = ''
                            updatedValue.endTime = ''
                          }
                          onChange(updatedValue)
                        }}
                        // selected={
                        //   timeValues[day.value]?.startTime?.length > 0 || timeValues[day.value]?.endTime?.length > 0
                        // }
                        selected={value?.isSelected}
                      />
                    </>
                  )}
                />
              </>
            ))}
          </div>
          <TimeRangeComponent index={index} control={control} day={'monday'} />
        </div>
      ) : (
        <div className=''>
          {days.map(day => (
            <div className='flex items-center gap-6' key={day.value}>
              <Controller
                name={`company_information.address.${index}.working_hours.${day.value}`}
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <RoundedTag
                      label={day.label}
                      handleSelect={() => onChange(value.isSelected)}
                      // selected={
                      //   timeValues[selectedWorkDays[0]]?.startTime.length > 0 ||
                      //   timeValues[selectedWorkDays[0]]?.endTime.length > 0
                      // }
                      selected={value?.isSelected}
                    />
                  )
                }}
              />
              <TimeRangeComponent index={index} control={control} day={day.value} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BranchInfoComponent
