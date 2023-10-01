import { useState } from 'react'
import { Transition } from '@headlessui/react'
import Image from '../image'
import { Controller } from 'react-hook-form'

type SelectOption = {
  value: string
  label: string
}

type Props = {
  options: SelectOption[]
  onChange: (value: number) => void
  name: string
  control: any
}

const NumberInputWithSelect: React.FC<Props> = ({ options, onChange, name, control }) => {
  const [value, setValue] = useState('0')
  const [selectedOption, setSelectedOption] = useState<SelectOption>(options[0])
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  const selectOption = (option: SelectOption) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    onChange(parseInt(event.target.value))
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className='flex items-center w-44 h-14 border border-raisin-10 rounded-lg'>
          <input
            value={value}
            onChange={handleInputChange}
            className='w-1/3 px-3 py-2 border-none text-3md outline-none rounded-xl text-center'
          />
          <div className='h-full w-px bg-raisin-10' />
          <div className='relative w-2/3 pl-1 md:pl-3 flex justify-center'>
            <button
              type='button'
              onClick={toggleOpen}
              className='flex items-center gap-2 md:gap-6 text-2sm text-raisin-130'
            >
              <span>{selectedOption.value}</span>
              <Image src='/icons/chevron.svg' alt='' />
            </button>
            <Transition
              show={isOpen}
              enter='transition ease-out duration-100 transform'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='transition ease-in duration-75 transform'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
              className='absolute top-11 w-28 shadow-lg right-px rounded-l bg-white z-50'
            >
              <div className=''>
                {options.map(option => (
                  <button
                    key={option.value}
                    type='button'
                    className={`w-full hover:bg-grey-100 flex items-center gap-3 text-left px-4 py-2 text-sm ${
                      selectedOption === option ? 'text-raisin-130' : 'text-raisin-50'
                    }`}
                    onClick={() => selectOption(option)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </Transition>
          </div>
        </div>
      )}
    />
  )
}

export default NumberInputWithSelect
