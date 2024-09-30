import { Dialog, DialogPanel, DialogTitle, Description, DialogBackdrop } from '@headlessui/react'
import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { DefaultInput, EventInput } from 'src/views/components/input'
import { useForm } from 'react-hook-form'
import Typography from 'src/views/components/typography'

interface Props {
  isOpen: boolean
  toggleIsOpen: () => void
}

const EventModal: React.FC<Props> = ({ isOpen, toggleIsOpen }) => {
  const [title, setTitle] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [color, setColor] = useState('#ff0000')

  const { register, handleSubmit, control } = useForm()

  const handleSave = () => {
    if (title && startTime && endTime) {
      toggleIsOpen()
    }
  }

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
        {/* <DialogBackdrop className='fixed inset-0 bg-black/30' /> */}
        <DialogPanel className='max-w-lg w-full rounded-lg bg-white shadow-xl'>
          <div className="px-8 pt-4">
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

          <DialogTitle className='text-2xl font-semibold text-gray-800'>Create Event</DialogTitle>
          <Description className='text-sm text-gray-600 mt-2 mb-6'>Enter event details below:</Description>
          <div className='flex flex-col space-y-4'>
            <input
              type='text'
              placeholder='Event Title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='datetime-local'
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='datetime-local'
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <div className='flex items-center space-x-4'>
              <label htmlFor='colorPicker' className='text-gray-700'>
                Event Color:
              </label>
              <input
                id='colorPicker'
                type='color'
                value={color}
                onChange={e => setColor(e.target.value)}
                className='w-16 h-10 p-0 border-none'
              />
            </div>
          </div>
          <div className='flex justify-end mt-6 space-x-4'>
            <button
              onClick={toggleIsOpen}
              className='px-5 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition'
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className='px-5 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition'
            >
              Save
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </Transition>
  )
}

export default EventModal
