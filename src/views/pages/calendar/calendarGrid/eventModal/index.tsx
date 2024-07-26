import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react'
import { useState } from 'react'

interface Props {
  isOpen: boolean
  toggleIsOpen: () => void
  onSaveEvent: (event: Event) => void
}

interface Event {
  title: string
  startTime: string
  endTime: string
  color: string
}

const EventModal: React.FC<Props> = ({ isOpen, toggleIsOpen, onSaveEvent }) => {
  const [title, setTitle] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [color, setColor] = useState('#ff0000') // Default color

  const handleSave = () => {
    if (title && startTime && endTime) {
      onSaveEvent({ title, startTime, endTime, color })
      toggleIsOpen()
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={toggleIsOpen}
      className='fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out'
    >
      <DialogPanel className='max-w-lg space-y-4 bg-white p-12'>
        <DialogTitle className='font-bold'>Create Event</DialogTitle>
        <Description>Enter event details below:</Description>
        <div className='flex flex-col'>
          <input
            type='text'
            placeholder='Event Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='w-full p-2 border border-gray-300'
          />
          <input
            type='datetime-local'
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className='w-full p-2 border border-gray-300'
          />
          <input
            type='datetime-local'
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className='w-full p-2 border border-gray-300'
          />
          <input type='color' value={color} onChange={e => setColor(e.target.value)} className='w-full' />
          <div className='flex gap-4'>
            <button onClick={toggleIsOpen} className='bg-gray-200 p-2 rounded'>
              Cancel
            </button>
            <button onClick={handleSave} className='bg-blue-500 text-white p-2 rounded'>
              Save
            </button>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  )
}

export default EventModal
