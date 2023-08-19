import { useState } from 'react'
import { Transition } from '@headlessui/react'
import Typography from 'src/views/components/typography'

type SelectOption = {
  value: string
  label: string
}

type Props = {
  options: SelectOption[]
  onChange: (option: SelectOption) => void
  selectedOption: SelectOption
}

export const NewListingSelect: React.FC<Props> = ({ options, onChange, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className='absolute bg-white w-full bottom-[-83px] py-4 large:relative large:w-fit large:bottom-0 large:py-0'>
      <Typography type='h4' weight='normal' color='dark' className='text-md text-center large:text-3md'>
        {selectedOption.label}
      </Typography>
      <button type='button' onClick={toggleOpen} className='flex items-center gap-2 text-2sm text-green-100 m-auto'>
        <span>{selectedOption.value}</span>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <rect width='24' height='24' rx='8' fill='#DDEAE6' />
          <path d='M8 11L11.75 14L15.5 11' stroke='#549684' strokeWidth='2' strokeLinecap='round' />
        </svg>
      </button>
      <Transition
        show={isOpen}
        enter='transition ease-out duration-100 transform'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='transition ease-in duration-75 transform'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
        className='fixed z-[111] mt-5 left-3 w-[calc(100%-20px)] shadow-lg h-[75px] flex items-center bg-white top-[80px] large:top-none '
      >
        <div className='flex justify-between h-full w-max overflow-auto large:w-full'>
          {options.map((option, index) => (
            <button
              key={option.value}
              type='button'
              className={`flex items-center gap-3 text-left px-4 py-2 text-sm  min-w-max ${
                selectedOption === option ? 'text-raisin-130 border-b-2 border-green-100' : 'text-raisin-50'
              }`}
              onClick={() => {
                onChange(option)
                toggleOpen()
              }}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  selectedOption === option ? 'bg-green-100 text-gray-900' : 'bg-raisin-10 text-raisin-20'
                }`}
              >
                <span className={` ${selectedOption === option ? ' text-white' : ' text-raisin-70'}`}>{index + 1}</span>
              </div>
              {option.label}
            </button>
          ))}
        </div>
      </Transition>
    </div>
  )
}

export default NewListingSelect
