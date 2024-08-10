import { Controller } from 'react-hook-form'

interface Props {
  control: any
  name: string
}

const Options: React.FC<Props> = ({ control, name }) => {
  const options = [
    { value: 'work', label: 'Work' },
    { value: 'school', label: 'School' },
    { value: 'personal', label: 'Personal' }
  ]
  
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <div className='flex gap-2'>
          {options?.map(option => (
            <div
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`flex-grow py-2 text-center cursor-pointer ${
                value === option.value ? 'bg-primary-10 text-primary-100' : 'bg-grey-70 text-raisin-80'
              }`}
              style={{ minWidth: '0' }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    />
  )
}

export default Options
