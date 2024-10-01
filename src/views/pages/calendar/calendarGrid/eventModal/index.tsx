import { Dialog, DialogPanel } from '@headlessui/react'
import { Transition } from '@headlessui/react'
import { EventInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'
import Icon from 'src/views/app/Icon'
import DateDropdown from 'src/views/components/dateDropdown'
import useCreateEvent from './useCreateEvent'
import TimeSelectorPopover from './timeSelectorPopover'
import RepeatEventPopover from './repeatEventPopover'
import CheckboxField from 'src/views/components/checkboxField'
import SwitchField from 'src/views/components/switchField'
import { IconButton } from 'src/views/components/button'
import EventColorPopover from './eventColorPopover'

interface Props {
  isOpen: boolean
  toggleIsOpen: () => void
  selectedDate: Date | null
  selectedStartHour: null | number
}

const EventModal: React.FC<Props> = ({ isOpen, toggleIsOpen, selectedDate, selectedStartHour }) => {
  const { handleSubmit, control, createEventValues } = useCreateEvent(selectedDate, selectedStartHour)

  console.log(createEventValues, 'createEventValues')

  return (
    <Transition
      show={isOpen}
      enter='transition-transform transition-opacity duration-600'
      enterFrom='transform translate-y-10 opacity-0'
      enterTo='transform translate-y-0 opacity-100'
      leave='transition-transform transition-opacity duration-600'
      leaveFrom='transform translate-y-0 opacity-100'
      leaveTo='transform translate-y-10 opacity-0'
    >
      <Dialog
        open={isOpen}
        onClose={toggleIsOpen}
        className='fixed w-3/4 mx-auto inset-x-0 bottom-6 z-50 flex items-center justify-center transition duration-800 ease-out'
        transition
      >
        <DialogPanel className='max-w-lg w-full rounded-lg bg-white shadow-xl'>
          <div className='px-[18px] pt-[18px]'>
            <div className='flex gap-3'>
              <div className='h-[51px] w-1 bg-red-100' />
              <div>
                <Typography type='subtitle' color='light'>
                  In 1h and 15 minutes
                </Typography>
                <EventInput
                  control={control}
                  name='title'
                  className='h-[30px] bg-white mt-1'
                  placeholder='Add title'
                  boldPlaceholder
                />
              </div>
            </div>
            <div className='flex gap-3'>
              <div className='h-[51px] w-1 bg-white' />
              <div>
                <EventInput
                  control={control}
                  name='description'
                  className='h-[30px] bg-white'
                  placeholder='Add description'
                />
              </div>
            </div>
          </div>

          <div className='w-full h-px bg-grey-10' />

          <div className='bg-grey-70 rounded-xl flex m-[18px] p-3'>
            <div className='w-11 h-11 rounded-full bg-white flex justify-center items-center'>
              <Icon svgPath='googleMeet' width={25} height={25} />
            </div>
            <div className='w-full'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <DateDropdown name='selected_date' control={control} label='date' errors={undefined} />
                  <TimeSelectorPopover control={control} />
                  <div className='w-1 h-1 rounded-full bg-raisin-80' />
                  <RepeatEventPopover control={control} />
                </div>
                <SwitchField name='all_day' label='All day' control={control} reversed height='h-[14px]' />
              </div>
              <Typography type='subtitle' className='text-primary-100'>
                Add meeting link
              </Typography>
            </div>
          </div>

          <div className='mx-[18px] flex gap-[18px] mb-[18px]'>
            <div className='border border-grey-70 rounded-xl p-3 flex-grow'>
              <Typography type='subtitle' color='light'>
                Participants
              </Typography>
              <div className='flex items-center justify-between'>
                <Typography type='subtitle' color='light'>
                  No participants yet
                </Typography>
                <IconButton icon='add' width={24} height={24} />
              </div>
            </div>

            <div className='border border-grey-70 rounded-xl p-3 min-w-[180px]'>
              <Typography type='subtitle' color='light' className='mb-3'>
                Companion bot
              </Typography>
              <SwitchField name='companion_bot' label='Attend' control={control} reversed height='h-[17px]' />
            </div>
          </div>

          <div className='mx-[18px] border border-grey-70 rounded-xl p-3 mb-[18px]'>
            <Typography type='subtitle' color='light' className='mb-3 text-[13px]'>
              Documents
            </Typography>
            <Typography type='subtitle' color='light' className='mb-3'>
              No documents added yet
            </Typography>
          </div>

          <div className='w-full h-px bg-grey-10' />

          <div className='m-[18px]'>
            <EventColorPopover control={control} />
          </div>
        </DialogPanel>
      </Dialog>
    </Transition>
  )
}

export default EventModal
