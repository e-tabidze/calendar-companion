import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Divider from 'src/views/components/divider'
import { InputWithComponent } from 'src/views/components/input'
import RoundedTag from 'src/views/components/roundedTag'
import Typography from 'src/views/components/typography'
import EditScheduleModal from '../editScheduleModal'

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

const AddressAndSchedule = () => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [selectedWorkDays, setSelectedWorkDays] = useState<any[]>([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ])

  const { control } = useForm()

  const handleselectedWorkDays = (value: string) => {
    if (selectedWorkDays.includes(value)) {
      setSelectedWorkDays(selectedWorkDays.filter(day => day !== value))
    } else {
      setSelectedWorkDays(prevState => [...prevState, value])
    }
  }

  const toggleEditModal = () => {
    setOpenEditModal(!openEditModal)
  }

  return (
    <>
      <div className='border border-raisin-10 rounded-xl my-4'>
        <InputWithComponent label='დასახელება' className='border-none' control={control} name='' errors={''} />
        <Divider />
        <div className='w-full flex flex-col justify-between p-4 laptop:flex-row laptop:items-center'>
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
          <Typography type='subtitle'>09:00 - 21:00</Typography>
          <Typography type='subtitle' className='underline cursor-pointer' onClick={toggleEditModal}>
            რედაქტირება
          </Typography>
        </div>
      </div>
      <EditScheduleModal open={openEditModal} onClose={toggleEditModal} />
    </>
  )
}

export default AddressAndSchedule
