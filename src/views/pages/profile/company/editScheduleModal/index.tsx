import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DefaultButton, IconButton } from 'src/views/components/button'
import { Divider } from '../../favourites/listComponent/styles'
import RoundedTag from 'src/views/components/roundedTag'
import SwitchField from 'src/views/components/switchField'
import { Controller, useWatch } from 'react-hook-form'
import SelectField from 'src/views/components/selectField'
import {useTranslation} from "next-i18next";

interface Props {
  open: boolean
  onClose: () => void
  control: any
  address: any
  index: number
}

const EditScheduleModal: React.FC<Props> = ({ open, onClose, control, address, index }) => {
  const formState = useWatch({ control })
  const {t} = useTranslation()

  const generateTimeOptions = () => {
    const options = []

    for (let hour = 0; hour < 24; hour++) {
      const time = hour.toString().padStart(2, '0') + ':00' + ':00'
      options.push({ value: time, label: time })
    }

    return options
  }

  const workDayData = () => {
    const customLabels: Record<string, string> = {
      monday: t('monday'),
      tuesday: t('tuesday'),
      wednesday: t('wednesday'),
      thursday: t('thursday'),
      friday: t('friday'),
      saturday: t('saturday'),
      sunday: t('sunday')
    }

    return Object.keys(address.working_hours).map(day => ({
      day,
      label: customLabels[day],
      start_time: address.working_hours[day].start_time,
      end_time: address.working_hours[day].end_time,
      is_selected: address.working_hours[day].is_selected
    }))
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-[111]' onClose={onClose}>
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
              <Dialog.Panel className='w-full max-w-[900px] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
                <Dialog.Title as='h3' className='w-full flex items-center justify-between px-10 py-6'>
                  {t('edit_hours')}
                  <IconButton icon='close' onClick={onClose} width={40} height={40} className='cursor-pointer' />
                </Dialog.Title>
                <Divider />
                <div className='mb-20'>
                  <div className='px-9 grid grid-cols-1 gap-7'>
                    <SwitchField
                      label={t('same_time')}
                      name={`addresses.${index}.is_same_time`}
                      control={control}
                    />
                    {formState.addresses[index]?.is_same_time === 1 ||
                    formState.addresses[index]?.is_same_time === true ? (
                      <div className='flex items-center gap-4'>
                        {workDayData().map((dayData: any) => (
                          <div key={dayData.day}>
                            <Controller
                              key={dayData.day}
                              name={`addresses.${index}.working_hours.${dayData.day}`}
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <RoundedTag
                                  label={dayData.label}
                                  handleSelect={() => {
                                    const updatedValue = {
                                      ...value,
                                      is_selected: !value.is_selected
                                    }
                                    if (!updatedValue.is_selected) {
                                      updatedValue.start_time = ''
                                      updatedValue.end_time = ''
                                    } else {
                                      updatedValue.start_time = workDayData().find(
                                        (item: any) => item.is_selected === 1
                                      )?.start_time
                                      updatedValue.end_time = workDayData().find(
                                        (item: any) => item.is_selected === 1
                                      )?.end_time
                                    }
                                    onChange(updatedValue)
                                  }}
                                  selected={value?.is_selected}
                                />
                              )}
                            />
                          </div>
                        ))}
                        <div className='flex items-center gap-1'>
                          <SelectField
                            options={generateTimeOptions()}
                            className='my-2 fill-transparent'
                            icon
                            name={`addresses.${index}.start_time`}
                            control={control}
                            valueKey='value'
                            labelKey='label'
                          />
                          <div className='h-px w-[6px] bg-raisin-130' />
                          <SelectField
                            options={generateTimeOptions()}
                            className='my-2 fill-transparent'
                            icon
                            control={control}
                            name={`addresses.${index}.end_time`}
                            valueKey='value'
                            labelKey='label'
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        {workDayData().map((dayData: any) => (
                          <div className='flex items-center gap-4' key={dayData.day}>
                            <Controller
                              key={dayData.day}
                              name={`addresses.${index}.working_hours.${dayData.day}`}
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <RoundedTag
                                  label={dayData.label}
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
                                  selected={value?.is_selected}
                                />
                              )}
                            />

                            <div className='flex items-center gap-1'>
                              <SelectField
                                options={generateTimeOptions()}
                                className='my-2'
                                icon
                                name={`addresses.${index}.working_hours.${dayData.day}.start_time`}
                                control={control}
                                valueKey='value'
                                labelKey='label'
                              />
                              <div className='h-px w-[6px] bg-raisin-130' />
                              <SelectField
                                options={generateTimeOptions()}
                                className='my-2'
                                icon
                                control={control}
                                name={`addresses.${index}.working_hours.${dayData.day}.end_time`}
                                valueKey='value'
                                labelKey='label'
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex justify-end bottom-0 w-full shadow-md'>
                  <DefaultButton
                    text={t('add')}
                    bg='bg-green-100'
                    className='my-4 mr-10'
                    textColor='text-white'
                    type='submit'
                    onClick={onClose}
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
