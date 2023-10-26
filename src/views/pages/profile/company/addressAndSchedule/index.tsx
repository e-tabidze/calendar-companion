import { useState } from 'react'
import Divider from 'src/views/components/divider'
import { InputWithComponent } from 'src/views/components/input'
import RoundedTag from 'src/views/components/roundedTag'
import Typography from 'src/views/components/typography'
import EditScheduleModal from '../editScheduleModal'

interface Props {
  index: number
  control: any
  isSameTime: 0 | 1
  workingHours: any
}

const AddressAndSchedule: React.FC<Props> = ({ index, control, isSameTime = 0, workingHours }) => {
  const [openEditModal, setOpenEditModal] = useState(false)

  console.log(workingHours, 'workingHours')
  console.log(isSameTime, 'isSameTime')

  const toggleEditModal = () => {
    setOpenEditModal(!openEditModal)
  }

  const workDayData = () => {
    const customLabels: Record<string, string> = {
      monday: 'ორშ',
      tuesday: 'სამ',
      wednesday: 'ოთხ',
      thursday: 'ხუთ ',
      friday: 'პარ',
      saturday: 'შაბ ',
      sunday: 'კვი'
    }

    return Object.keys(workingHours).map(day => ({
      day,
      label: customLabels[day],
      start_time: workingHours[day].start_time,
      end_time: workingHours[day].end_time,
      is_selected: workingHours[day].is_selected
    }))
  }

  console.log(workDayData(), 'data ')

  return (
    <>
      <div className='border border-raisin-10 rounded-xl my-4'>
        <InputWithComponent
          label='მისამართი'
          className='border-none'
          control={control}
          name={`addresses.${index}.address`}
          errors={''}
        />
        <Divider />
        <div
          className={`w-full flex flex-col justify-between p-4 lg:flex-row ${
            !!isSameTime ? 'lg:items-center' : 'lg:items-start'
          } gap-12`}
        >
          <div className='flex items-center gap-4 w-full'>
            {!!isSameTime ? (
              <div className='w-full flex justify-between items-center'>
                <div className='flex gap-4'>
                  {workDayData().map(day => (
                    <RoundedTag key={day.day} label={day.label} selected={day.is_selected} />
                  ))}
                </div>
                <Typography type='subtitle'>09:00 - 21:00</Typography>
              </div>
            ) : (
              <div className='w-full'>
                {workDayData().map(day => (
                  <div className='flex justify-between w-max gap-8 items-center mb-4' key={day.day}>
                    <RoundedTag key={index} label={day.label} selected={day.is_selected} />
                    <Typography type='subtitle'>
                      {day.start_time} - {day.end_time}
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
      <EditScheduleModal open={openEditModal} onClose={toggleEditModal} control={control} workDayData={workDayData()} index={index} />
    </>
  )
}

export default AddressAndSchedule
