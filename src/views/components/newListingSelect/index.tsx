import { Fragment } from 'react'
import Typography from 'src/views/components/typography'

import { Transition, Menu } from '@headlessui/react'
import {useTranslation} from "next-i18next";

type SelectOption = {
  value: string
  label: string
}

type Props = {
  options: SelectOption[]
  onChange: (option: SelectOption) => void
  selectedOption: SelectOption
}

const NewListingSelect: React.FC<Props> = ({ options, onChange, selectedOption }) => {
  const {t} = useTranslation()

    return (
    <Menu as='div' className='inline-block text-left'>
      <div className='flex flex-col items-center gap-1'>
        <Typography type='h4' weight='normal' color='dark' className='text-md text-center md:text-3md'>
          {t(selectedOption.label)}
        </Typography>
        <Menu.Button className='text-raisin-130 px-2 font-normal inline-flex items-center gap-2 w-max rounded-2xl justify-around text-2sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
          <Typography type='h5'>{t(selectedOption.value)}</Typography>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='24' height='24' rx='8' fill='#DDEAE6' />
            <path d='M8 11L11.75 14L15.5 11' stroke='#549684' strokeWidth='2' strokeLinecap='round' />
          </svg>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute left-0 w-full flex justify-between top-[-14px] md:top-20 h-[75px] bg-white shadow-lg overflow-x-auto whitespace-nowrap md:overflow-hidden px-5 md:px-10'>
          {options.map((option, index) => (
            <Menu.Item key={option.value}>
              <button
                type='button'
                className={`flex items-center gap-3 text-left px-4 py-2 text-sm  min-w-max ${
                  selectedOption.value === option.value
                    ? 'text-raisin-130 border-b-2 border-green-100'
                    : 'text-raisin-50'
                }`}
                onClick={() => onChange(option)}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    selectedOption.value === option.value ? 'bg-green-100 text-gray-900' : 'bg-raisin-10 text-raisin-20'
                  }`}
                >
                  <span className={` ${selectedOption.value === option.value ? ' text-white' : ' text-raisin-70'}`}>
                    {index + 1}
                  </span>
                </div>
                {t(option.label)}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default NewListingSelect
