import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react'

interface Props {
  isOpen: boolean
  toggeIsOpen: () => void
}

const EventModal: React.FC<Props> = ({ isOpen, toggeIsOpen }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={toggeIsOpen}
      transition
      className='fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0'
    >
      <DialogPanel className='max-w-lg space-y-4 bg-white p-12'>
        <DialogTitle className='font-bold'>Deactivate account</DialogTitle>
        <Description>This will permanently deactivate your account</Description>
        <p>Are you sure you want to deactivate your account?</p>
        <div className='flex gap-4'>
          <button onClick={toggeIsOpen}>Cancel</button>
          <button onClick={toggeIsOpen}>Deactivate</button>
        </div>
      </DialogPanel>
    </Dialog>
  )
}

export default EventModal
