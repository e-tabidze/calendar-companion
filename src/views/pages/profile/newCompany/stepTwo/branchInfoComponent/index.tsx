import React, { useEffect, useState } from 'react'
import { WorkingHours } from 'src/types/Company'
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
  onWorkingHoursChange: any
  workingHoursObject: any
}

const BranchInfoComponent: React.FC<Props> = ({ index, onWorkingHoursChange, workingHoursObject }) => {
  const [map, setMap] = useState(false)
  const [selectedWorkDays, setSelectedWorkDays] = useState<string[]>([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday'
  ])
  const [sameTime, setSameTime] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState('')
  const [addressValue, setAddressValue] = useState('')

  console.log(workingHoursObject, 'workingHoursObject in BranchInfoComponent')

  useEffect(() => {
    const newWorkingHoursObject = generateWorkingHoursObj()

    // Pass the updated working hours object to the parent component
    onWorkingHoursChange(newWorkingHoursObject)

    console.log(newWorkingHoursObject, 'newWorkingHoursObject')
  }, [selectedTimeRange, selectedWorkDays, addressValue])

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValue(e.target.value)
  }

  const toggleMap = () => setMap(prevMap => !prevMap)
  const toggleTime = () => setSameTime(prevSameTime => !prevSameTime)

  const handleSelectedWorkDays = (value: string) => {
    setSelectedWorkDays(prevDays =>
      prevDays.includes(value) ? prevDays.filter(day => day !== value) : [...prevDays, value]
    )
  }
  const renderTimeRangeComponent = () => (
    <TimeRangeComponent index={index} setSelectedTimeRange={setSelectedTimeRange} />
  )

  const generateWorkingHoursObj = () => {
    if (!selectedTimeRange || selectedWorkDays.length === 0 || !addressValue) {
      return []
    }

    const workingHoursObject = {
      address: addressValue,
      working_hours: {}
    }

    selectedWorkDays.forEach((day: string | number) => {
      workingHoursObject.working_hours[day] = selectedTimeRange
    })

    return workingHoursObject
  }

  return (
    <div className='my-6'>
      <div className='border border-raisin-10 rounded-3xl py-10 px-9 grid grid-cols-1 gap-7'>
        <InputWithComponent
          label='მისამართი'
          value={addressValue}
          onComponentClick={toggleMap}
          name={`company_information.address[${index}].address`}
          onChange={e => handleAddressChange(e)}
        />
        <SwitchField label='ერთნაირი დროის მონიშვნა' value={sameTime} onChange={toggleTime} />

        {sameTime ? (
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              {days.map(day => (
                <RoundedTag
                  key={day.value}
                  label={day.label}
                  handleSelect={() => handleSelectedWorkDays(day.value)}
                  selected={selectedWorkDays.includes(day.value)}
                />
              ))}
            </div>
            <div className='flex items-center justify-between'>{renderTimeRangeComponent()}</div>
          </div>
        ) : (
          <div className=''>
            {days.map(day => (
              <div className='flex items-center gap-6' key={day.value}>
                <RoundedTag
                  label={day.label}
                  handleSelect={() => handleSelectedWorkDays(day.value)}
                  selected={selectedWorkDays.includes(day.value)}
                />
                {renderTimeRangeComponent()}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BranchInfoComponent
