import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Typography from 'src/views/components/typography'
import { DefaultButton, IconButton } from 'src/views/components/button'
import { Divider } from '../../../favorites/listComponent/styles'
import RoundedTag from 'src/views/components/roundedTag'
import SwitchField from 'src/views/components/switchField'
import { Controller, useForm, useWatch } from 'react-hook-form'
import TimeRangeComponent from './timeTangeComponent'

// const days = [
//   {
//     label: 'ორშ',
//     value: 'monday'
//   },
//   {
//     label: 'სამ',
//     value: 'tuesday'
//   },
//   {
//     label: 'ოთხ',
//     value: 'wednesday'
//   },
//   {
//     label: 'ხუთ',
//     value: 'thursday'
//   },
//   {
//     label: 'პარ',
//     value: 'friday'
//   },
//   {
//     label: 'შაბ',
//     value: 'saturday'
//   },
//   {
//     label: 'კვი',
//     value: 'sunday'
//   }
// ]
interface Props {
  open: boolean
  onClose: () => void
  control: any
  index: number
  data: any
}

const EditScheduleModal: React.FC<Props> = ({ open, onClose, control, index, data }) => {
  const formState = useWatch({ control })

  console.log(formState.addresses[index].is_same_time, 'formState')

  // const [selectedWorkDays, setSelectedWorkDays] = useState<any[]>([
  //   'monday',
  //   'tuesday',
  //   'wednesday',
  //   'thursday',
  //   'friday',
  //   'saturday'
  // ])

  // const handleselectedWorkDays = (value: string) => {
  //   if (selectedWorkDays.includes(value)) {
  //     setSelectedWorkDays(selectedWorkDays.filter(day => day !== value))
  //   } else {
  //     setSelectedWorkDays(prevState => [...prevState, value])
  //   }
  // }

  // const renderDaysSelector = (day: any) => (
  //   <Controller
  //     key={day.value}
  //     name={`addresses.${index}.working_hours.${day.value}`}
  //     control={control}
  //     render={({ field: { value, onChange } }) => (
  //       <RoundedTag
  //         label={day.label}
  //         handleSelect={() => {
  //           const updatedValue = {
  //             ...value,
  //             is_selected: !value.is_selected
  //           }
  //           if (!updatedValue.is_selected) {
  //             updatedValue.start_time = ''
  //             updatedValue.end_time = ''
  //           }
  //           onChange(updatedValue)
  //         }}
  //         selected={value?.is_selected}
  //       />
  //     )}
  //   />
  // )

  let sameTime = 0

  console.log(data, 'data')

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
                <Dialog.Title as='h3' className='w-full flex items-center justify-between px-10 py-6'>
                  <Typography type='h5' weight='normal' className='text-2md'>
                    საათების რედაქტირება
                  </Typography>
                  <IconButton icon='/icons/close.svg' onClick={onClose} width={40} height={40} />
                </Dialog.Title>
                <Divider />
                <div className='mb-20'>
                  <div className='px-9 grid grid-cols-1 gap-7'>
                    <SwitchField
                      name={`addresses.${index}.is_same_time`}
                      label='ერთნაირი დროის მონიშვნა'
                      control={control}
                    />

                    {sameTime === 1 ? (
                      <div className='flex items-center justify-between gap-4'>
                        <div className='flex items-center gap-4'>
                          {data.map((day: any) => (
                            <>
                              {console.log(day, 'day')}
                              <Controller
                                key={day.value}
                                name={`addresses.${index}.working_hours.${day.day}.${day.is_selected}`}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <>
                                    <RoundedTag
                                      label={day.label}
                                      handleSelect={() => {
                                        const updatedValue = {
                                          ...value,
                                          is_selected: !value.is_selected
                                        }
                                        if (!updatedValue.is_selected) {
                                          updatedValue.start_time = ''
                                          updatedValue.end_time = ''
                                        }
                                        onChange(updatedValue)
                                      }}
                                      selected={day?.is_selected}
                                    />
                                  </>
                                )}
                              />
                            </>
                          ))}
                        </div>
                        <TimeRangeComponent index={index} control={control} />
                      </div>
                    ) : (
                      <div className=''>
                        <div className=''>
                          {data.map((day: any) => (
                            <div className='flex items-center gap-6'>
                              <>{console.log(day, 'day')}</>
                              <Controller
                                key={day.value}
                                name={`addresses.${index}.working_hours.${day.day}.${day.is_selected}`}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <>
                                    {console.log(
                                      `addresses.${index}.working_hours.${day.day}.${day.is_selected}`,
                                      'name?'
                                    )}

                                    <RoundedTag
                                      label={day.label}
                                      handleSelect={() => {
                                        const updatedValue = {
                                          ...value,
                                          is_selected: !value.is_selected
                                        }
                                        if (!updatedValue.is_selected) {
                                          updatedValue.start_time = ''
                                          updatedValue.end_time = ''
                                        }
                                        onChange(updatedValue)
                                      }}
                                      selected={day?.is_selected}
                                    />
                                  </>
                                )}
                              />
                              <TimeRangeComponent index={index} control={control} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex justify-end bottom-0 w-full shadow-md'>
                  <DefaultButton
                    text='დამატება'
                    bg='bg-green-100'
                    className='my-4 mr-10'
                    textColor='text-white'
                  ></DefaultButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default EditScheduleModal
