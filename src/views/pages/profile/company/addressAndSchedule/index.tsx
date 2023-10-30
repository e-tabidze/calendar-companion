import { useState } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import Divider from 'src/views/components/divider'
import { InputWithComponent } from 'src/views/components/input'
import RoundedTag from 'src/views/components/roundedTag'
import Typography from 'src/views/components/typography'
import EditScheduleModal from '../editScheduleModal'

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
  control: any
  address: any
  errors: any
}

const AddressAndSchedule: React.FC<Props> = ({ index, control, address, errors }) => {
  const [openEditModal, setOpenEditModal] = useState(false)

  const toggleEditModal = () => setOpenEditModal(!openEditModal)

  const formState = useWatch({ control })

  const renderDaysSelector = (day: any) => (
    <Controller
      key={day.value}
      name={`addresses.${index}.working_hours.${day.value}`}
      control={control}
      render={({ field: { value } }) => <RoundedTag label={day.label} selected={value?.is_selected} />}
    />
  )

  return (
    <>
      <div className='border border-raisin-10 rounded-xl my-4'>
        <InputWithComponent
          label='მისამართი'
          className='border-none'
          control={control}
          name={`addresses.${index}.address`}
          errors={errors}
        />
        <Divider />
        <div
          className={`w-full flex flex-col justify-between p-4 lg:flex-row ${
            formState.addresses[index].is_same_time === 1 ? 'lg:items-center' : 'lg:items-start'
          } gap-12`}
        >
          <div className='flex items-center gap-4 w-full'>
            {formState.addresses[index].is_same_time === 1 ? (
              <div className='w-full flex justify-between items-center'>
                <div className='flex gap-4'>
                  {days.map(day => (
                    <Controller
                      key={day.value}
                      name={`addresses.${index}.working_hours.${day.value}`}
                      control={control}
                      render={({ field: { value } }) => <RoundedTag label={day.label} selected={value.is_selected} />}
                    />
                  ))}
                </div>
                <Typography type='subtitle'>
                  {formState.addresses[index].start_time} - {formState.addresses[index].end_time}
                </Typography>
              </div>
            ) : (
              <div>
                {days.map(day => (
                  <div className='flex items-center gap-6 mb-4' key={day.value}>
                    {renderDaysSelector(day)}
                    <Typography type='subtitle'>
                      {formState.addresses[index].working_hours[day.value].start_time} -{' '}
                      {formState.addresses[index].working_hours[day.value].end_time}
                    </Typography>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Typography type='subtitle' className='underline cursor-pointer' onClick={toggleEditModal}>
            რედაქტირება
          </Typography>
        </div>
      </div>
      <EditScheduleModal
        open={openEditModal}
        onClose={toggleEditModal}
        control={control}
        index={index}
        address={address}
      />
    </>
  )
}

export default AddressAndSchedule
