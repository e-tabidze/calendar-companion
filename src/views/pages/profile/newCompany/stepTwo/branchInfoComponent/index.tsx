import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { InputWithComponent } from 'src/views/components/input'
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
  control?: any
}

const BranchInfoComponent: React.FC<Props> = ({ index, control }) => {
  const [map, setMap] = useState(false)
  const [sameTime, setSameTime] = useState(true)
  const [selectedWorkDays, setSelectedWorkDays] = useState<string[]>([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'satudray'
  ])

  const toggleMap = () => setMap(prevMap => !prevMap)
  const toggleTime = () => setSameTime(prevSameTime => !prevSameTime)

  const renderTimeRangeComponent = (day: string) => <TimeRangeComponent index={index} control={control} day={day} />

  return (
    <div className='mb-6 large:border large:border-raisin-10 rounded-3xl large:py-10 large:px-9 grid grid-cols-1 gap-7'>
      <InputWithComponent
        label='მისამართი'
        onComponentClick={toggleMap}
        name={`company_information.address.${index}.address`}
        control={control}
      />
      <SwitchField label='ერთნაირი დროის მონიშვნა' value={sameTime} onChange={toggleTime} />

      {sameTime ? (
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            {days.map(day => (
              <Controller
                key={day.value}
                name={`company_information.address.${index}.working_hours.${day.value}`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RoundedTag label={day.label} handleSelect={() => onChange(!value)} selected={value} />
                )}
              />
            ))}
          </div>
          {/* <div className='flex items-center justify-between'>
            <TimeRangeComponent index={index} control={control} workDays={selectedWorkDays} setValue={setValue} />
          </div> */}
        </div>
      ) : (
        <div className=''>
          {days.map(day => (
            <div className='flex items-center gap-6' key={day.value}>
              <Controller
                name={`company_information.address.${index}.working_hours.${day.value}`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RoundedTag label={day.label} handleSelect={() => onChange(!value)} selected={value} />
                )}
              />
              {renderTimeRangeComponent(day.value)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BranchInfoComponent
