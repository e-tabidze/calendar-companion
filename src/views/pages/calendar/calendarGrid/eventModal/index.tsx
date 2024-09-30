import { Dialog, DialogPanel } from '@headlessui/react'
import { Transition } from '@headlessui/react'
import { EventInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'
import Icon from 'src/views/app/Icon'
import DateDropdown from 'src/views/components/dateDropdown'
import useCreateEvent from './useCreateEvent'
import TimeSelector from './timeSelector'

interface Props {
  isOpen: boolean
  toggleIsOpen: () => void
  selectedDate: Date | null
}

const EventModal: React.FC<Props> = ({ isOpen, toggleIsOpen, selectedDate }) => {
  const { handleSubmit, control, createEventValues } = useCreateEvent(selectedDate)

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
          <div className='px-8 pt-4'>
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

          <div className='bg-grey-70 rounded-xl flex'>
            <div className='w-11 h-11 rounded-full bg-white flex justify-center items-center'>
              <Icon svgPath='googleMeet' width={25} height={25} />
            </div>
            <div>
              <div className='flex items-center'>
                <DateDropdown name='selected_date' control={control} label='date' errors={undefined} />
                <TimeSelector control={control} />
              </div>
              <Typography type='subtitle' className='text-primary-100'>
                Add meeting link
              </Typography>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </Transition>
  )
}

export default EventModal
