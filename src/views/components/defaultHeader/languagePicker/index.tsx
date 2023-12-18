import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Typography from '../../typography'
import { LanPickerContainer } from './styles'
import Icon from 'src/views/app/Icon'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const langs = [
  { id: 0, title: 'ქართული', locale: 'ka' },
  { id: 1, title: 'English', locale: 'en' },
  { id: 2, title: 'Русский', locale: 'ru' }
]
interface Props {
  dropdownUp?: boolean
  responsive?: boolean
  className?: string
}

const LanguagePicker = ({ dropdownUp, responsive, className }: Props) => {
  const router = useRouter()
  const selectedLang = langs.find(lang => lang.locale === router.locale)
  const { t } = useTranslation()

  return (
    <LanPickerContainer className={className}>
      <Menu as='div' className='relative text-left flex'>
        <Menu.Button
          className={`${
            responsive
              ? 'md:border md:border-raisin-10 md:rounded-xl md:px-3'
              : 'border border-raisin-10 rounded-xl px-3'
          } flex h-10 items-center font-medium text-raisin-100 text-2sm transition-all md:hover:bg-grey-100 md:hover:border-raisin-30`}
        >
          <Icon svgPath='globe' width={21} height={20} />
          <span className={`${responsive ? 'hidden md:flex' : 'flex'} ml-2`}>
            {selectedLang?.title} {t('easiest_way_to_your_new_home')}
          </span>
          <Icon
            svgPath='chevron'
            width={8}
            height={6}
            className={`fill-transparent ${responsive ? 'hidden md:flex md:ml-2' : 'flex ml-2'}`}
          />
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
          <Menu.Items
            className={`${
              dropdownUp ? 'left-0  bottom-full mb-5' : 'top-full mt-5 left-auto right-0 md:right-0'
            } min-w-[200px] absolute z-[2]  md:left-1/2 md:-translate-x-1/2  bg-white rounded-2xl  shadow-[0px_6px_18px_#000000/10] py-4`}
          >
            {langs.map(lang => (
              <Menu.Item key={lang.id}>
                <button
                  value={lang.title}
                  onClick={() => router.push(router.asPath, router.asPath, { locale: lang.locale })}
                  className='w-full flex items-center text-raisin-130 text-2sm font-medium py-2 hover:bg-grey-100 px-6 cursor-pointer'
                >
                  {/*TODO active add class border-2 border-orange-100 */}
                  <span
                    className={`${selectedLang?.id ? 'border-raisin-10' : ''} w-6 h-6 border rounded-full flex mr-4`}
                  ></span>
                  <Typography type='subtitle'>{lang.title}</Typography>
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
