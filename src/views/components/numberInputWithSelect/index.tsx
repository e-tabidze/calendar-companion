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
  control: any
  inputName: string
  selectName: string
  type?: string
}

const NumberInputWithSelect: React.FC<Props> = ({ options, control, inputName, selectName, type = 'text' }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className='flex items-center w-44 h-14 border border-raisin-10 rounded-lg'>
      <Controller
        control={control}
        name={inputName}
        defaultValue={options[0].value}
        render={({ field: { onChange, value } }) => (
          <input
            value={value}
            onChange={onChange}
            className='w-1/3 px-3 py-2 border-none text-2md outline-none rounded-xl text-center'
            type={type}
            min={0}
            max={100}
          />
        )}
      />

      <div className='h-full w-px bg-raisin-10' />
      <Controller
        control={control}
        name={selectName}
        render={({ field: { onChange, value } }) => (
          <div className='relative w-2/3 pl-1 md:pl-3 flex justify-center'>
            <button
              type='button'
              onClick={() => setIsOpen(isOpen => !isOpen)}
              className='flex items-center gap-2 md:gap-6 text-2sm text-raisin-130'
            >
              <span>{value}</span>
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
                      value === option.value ? 'text-raisin-130' : 'text-raisin-50'
                    }`}
                    onClick={() => {
                      onChange(option.value)
                      toggleOpen()
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </Transition>
          </div>
        )}
      />
    </div>
  )
}

export default NumberInputWithSelect
