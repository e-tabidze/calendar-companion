import { useState } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { days } from 'src/utils/sample-data'
import RoundedTag from 'src/views/components/roundedTag'
import Typography from 'src/views/components/typography'
import EditScheduleModal from '../editScheduleModal'
import CitiesSuggestions from 'src/views/components/citiesSuggestions'
import { DefaultInput } from 'src/views/components/input'

interface Props {
  index: number
  control: any
  address: any
  errors: object
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
      <div className='border border-raisin-10 rounded-3xl p-8 mt-8 mb-3'>
        {/* <LocationSuggestions  index={index} control={control} name={`addresses.${index}.address`}/> */}

        <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-4 relative mb-8'>
          <CitiesSuggestions index={index} control={control} name={`addresses.${index}.city`} border errors={errors} />

          <DefaultInput
            label='მისამართი'
            name={`addresses.${index}.address`}
            control={control}
            errors={errors}
            disabled={`addresses.${index}.city`.length === 0}
          />

          <DefaultInput label='ტელეფონი' name={`addresses.${index}.phone`} control={control} errors={errors} />
        </div>

        <div
          className={`w-full flex flex-col justify-between py-4 lg:flex-row  ${
            formState?.addresses[index]?.is_same_time === 1 ? 'lg:items-center' : 'lg:items-start'
          } gap-4 sm:gap-12`}
        >
          <div className='flex items-center gap-4 w-full'>
            {formState.addresses[index]?.is_same_time === 1 || formState.addresses[index]?.is_same_time === true ? (
              <div className='w-full flex flex-col sm:flex-row justify-between sm:items-center'>
                <div className='flex md:gap-4 gap-[6px]'>
                  {days.map(day => (
                    <Controller
                      key={day.value}
                      name={`addresses.${index}.working_hours.${day.value}`}
                      control={control}
                      render={({ field: { value } }) => <RoundedTag label={day.label} selected={value.is_selected} />}
                    />
                  ))}
                </div>
                <Typography type='subtitle' className='mt-4 sm:mt-0'>
                  {formState.addresses[index].start_time} - {formState.addresses[index].end_time}
                </Typography>
              </div>
            ) : (
              <div>
                {days.map(day => (
                  <div className='flex items-center gap-6 mb-4' key={day.value}>
                    {renderDaysSelector(day)}
                    <Typography type='subtitle'>
                      {formState.addresses[index]?.working_hours[day.value].start_time} -{' '}
                      {formState.addresses[index]?.working_hours[day.value].end_time}
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
