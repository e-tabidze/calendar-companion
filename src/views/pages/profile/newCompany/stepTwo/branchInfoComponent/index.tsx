import { useState } from 'react'
import { InputWithComponent } from 'src/views/components/input'
import RoundedTag from 'src/views/components/roundedTag'
import SwitchField from 'src/views/components/switchField'
import TimeRangeComponent from '../timeRangeComponent'

const days = [
  {
    label: 'ორშ',
    value: 'monday'
  },
  {
    label: 'სამ',
    value: 'tuesday'
  },
  {
    label: 'ოთხ',
    value: 'wednesday'
  },
  {
    label: 'ხუთ',
    value: 'thursday'
  },
  {
    label: 'პარ',
    value: 'friday'
  },
  {
    label: 'შაბ',
    value: 'saturday'
  },
  {
    label: 'კვი',
    value: 'sunday'
  }
]

interface Props {
  control: any
  errors: any
  index: number
}

const BranchInfoComponent: React.FC<Props> = ({ control, errors, index }) => {
  const [map, setMap] = useState(false)
  const [selectedWorkDays, setSelectedWorkDays] = useState<any[]>([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday'
  ])
  const [sameTime, setSameTime] = useState(true)

  const toggleMap = () => {
    setMap(!map)
  }

  const togleTime = () => {
    setSameTime(!sameTime)
  }

  const handleselectedWorkDays = (value: string) => {
    if (selectedWorkDays.includes(value)) {
      setSelectedWorkDays(selectedWorkDays.filter(day => day !== value))
    } else {
      setSelectedWorkDays(prevState => [...prevState, value])
    }
  }

  return (
    <div className='my-6'>
      <div className='border border-raisin-10 rounded-3xl py-10 px-9 grid grid-cols-1 gap-7'>
        <InputWithComponent
          label='მისამართი'
          onComponentClick={toggleMap}
          control={control}
          name={`company_information.address[${index}].address`}
          errors={errors}
        />
        <SwitchField label='ერთნაირი დროის მონიშვნა' value={sameTime} onChange={togleTime} />
        {sameTime ? (
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              {days.map((day, index) => (
                <RoundedTag
                  key={index}
                  label={day.label}
                  handleSelect={() => handleselectedWorkDays(day.value)}
                  selected={selectedWorkDays.includes(day.value)}
                />
              ))}
            </div>
            <TimeRangeComponent control={control} />
          </div>
        ) : (
          <div className=''>
            <div className=''>
              {days.map((day, index) => (
                <div className='flex items-center gap-6' key={index}>
                  <RoundedTag
                    label={day.label}
                    handleSelect={() => handleselectedWorkDays(day.value)}
                    selected={selectedWorkDays.includes(day.value)}
                  />
                  <TimeRangeComponent control={control} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BranchInfoComponent
