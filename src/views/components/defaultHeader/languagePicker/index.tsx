import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from '../../image'
import Typography from '../../typography'
import { LanPickerContainer } from './styles'

const langs = [
  {
    lan: 'English',
    id: 1
  },
  {
    lan: 'ქართული',
    id: 2
  },
  {
    lan: 'Русский',
    id: 3
  }
]

const LanguagePicker = () => {
  const [active, setActive] = useState('ქართული')

  const handleChangeLanguage = (e: any) => {
    setActive(e.target.value)
  }

  return (
    <LanPickerContainer>
      <Menu as='div' className='relative text-left flex'>
        <Menu.Button className='flex h-[40px] md:rounded-[12px] items-center md:px-[12px] font-medium text-[#272A37] text-[14px] md:border transition-all  md:border-[#E9EAEB] md:hover:bg-[#F2F3F6] md:hover:border-[#BEBFC3]'>
          <Image src='/icons/globe.svg' alt='img' className="mr-2"/>
          <span className="hidden md:flex">{active}</span>
          <Image src='/icons/chevron.svg' alt='img' className="hidden md:flex md:ml-2"/>
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
          <Menu.Items className='min-w-[200px] absolute z-[2] right-0 left-auto md:right-0 md:left-1/2 md:-translate-x-1/2  bg-[#ffffff] rounded-[16px]  shadow-[0px_6px_18px_#000000/10] py-[16px] top-full mt-[20px]'>
            {langs.map(lang => (
              <Menu.Item key={lang.id}>
                <button
                  value={lang.lan}
                  onClick={handleChangeLanguage}
                  className="w-full flex items-center text-[#1B1D27] text-[14px] font-medium py-[8px] hover:bg-[#F2F3F6] px-[24px] cursor-pointer"
                >
                  {/*TODO active add class border-[8px] border-[#FD4100*/}
                  <span className={`${active? 'border-[#E9EAEB]': ''} w-[24px] h-[24px] border rounded-full flex mr-[16px]`}></span>
                  <Typography type='subtitle'>{lang.lan}</Typography>
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </LanPickerContainer>
  )
}

export default LanguagePicker
