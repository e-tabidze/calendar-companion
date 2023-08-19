import SelectField from 'src/views/components/selectField'

interface Props {
  control: any
}

const TimeRangeComponent: React.FC<Props> = ({ control }) => {
  const generateTimeOptions = () => {
    const options = []

    for (let hour = 0; hour < 24; hour++) {
      const time = hour.toString().padStart(2, '0') + ':00'
      options.push({ value: time, label: time })
    }

    return options
  }

  const selectOptions = generateTimeOptions()

  return (
    <div className='flex items-center gap-1'>
      <SelectField
        options={selectOptions}
        disabled={false}
        className='my-2'
        icon
        placeholder=''
        defaultValue={'08:00'}
        control={control}
        name="name"
      />
      <div className='h-px w-[6px] bg-raisin-130' />
      <SelectField
        options={selectOptions}
        disabled={false}
        className='my-2'
        icon
        placeholder=''
        defaultValue={'08:00'}
        control={control}
        name="name"
      />
    </div>
  )
}

export default TimeRangeComponent
