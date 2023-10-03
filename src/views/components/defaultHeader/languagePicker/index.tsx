import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from '../../image'
import Typography from '../../typography'
import { LanPickerContainer } from './styles'

const langs = [
  {
    lan: 'EN',
    id: 1
  },
  {
    lan: 'KA',
    id: 2
  },
  {
    lan: 'RU',
    id: 3
  }
]

const LanguagePicker = () => {
  const [active, setActive] = useState('KA')

  const handleChangeLanguage = (e: any) => {
    setActive(e.target.value)
  }

  return (
    <LanPickerContainer>
      <div className='h-[7px] w-px bg-neutral-400 mr-4 xl:mr-5'></div>
      <Menu as='div' className='relative inline-block text-left'>
        <Menu.Button className='text-raisin-130 px-2 font-normal inline-flex items-center gap-2 w-full rounded-2xl justify-around py-2 text-2sm hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:bg-[#e7eaf3]'>
          <Image src='/icons/globe.svg' alt='img' />
          {active}
          <Image src='/icons/chevron.svg' alt='img' />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute rounded-sm bg-white header-shadow px-5px py-5px text-xs top-100 left-0 right-0 '>
            {langs.map(lang => (
              <Menu.Item key={lang.id}>
                <button
                  value={lang.lan}
                  onClick={handleChangeLanguage}
                  className={`${
                    active ? 'font-semibold' : 'font-normal'
                  } group text-gray-900 flex w-full items-center rounded-md px-2 py-1 text-sm hover:bg-gray-20`}
                >
                  <Typography type='subtitle'>{lang.lan}</Typography>
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
      <div className='h-[7px] w-px bg-neutral-400 ml-4 xl:ml-5' />
    </LanPickerContainer>
  )
}

export default LanguagePicker
