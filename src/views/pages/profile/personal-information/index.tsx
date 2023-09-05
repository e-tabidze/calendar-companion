import Image from 'next/image'
import Link from 'next/link'
import { DefaultButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'

import { Tab } from '@headlessui/react'
import ProfileInfoForm from './profileInfoForm'
import PasswordForm from './passwordForm'
import { UserData } from 'src/types/User'
import usePersonalInfo from './usePersonalInfo'

const cat = [
  {
    title: 'პირადი ინფორმაცია',
    id: 0
  },
  {
    title: 'პაროლის შეცვლა',
    id: 1
  }
]

function tabs(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const PersonalInfo = ({ userData }: { userData: UserData }) => {
  const {
    control,
    errors,
    handleSubmit,
    passwordControl,
    passwordHandleSubmit,
    passwordState,
    dirtyFields,
    resetField,
    setError,
    clearErrors
  } = usePersonalInfo(userData)

  const renderTabContent = (id: any) => {
    if (id === 0) {
      return <ProfileInfoForm />
    } else {
      return <PasswordForm />
    }
  }

  return (
    <div>
      <div className='p-2 large:p-10'>
        <Typography type='h3' className='hidden large:inline-block'>
          პარამეტრები
        </Typography>
        <div className='border border-raisin-10 p-4 large:border-none large:p-0 rounded-2xl flex items-center gap-3 mt-8 '>
          <Image src='/images/avatar.png' height={96} width={96} alt='' className='rounded-full large:rounded-3xl' />
          <div className='flex flex-col gap-2'>
            <Typography type='h3' className='text-md large:text-2lg font-medium large:font-bold'>
              ზაური ათაბეგაშვილი
            </Typography>
            <Link href='/' className='text-2sm underline text-blue-100 font-normal'>
              სურათის შეცვლა
            </Link>
          </div>
        </div>

        <Tab.Group>
          <Tab.List className='flex space-x-4 pb-2 border-b border-raisin-10 mt-10'>
            {cat.map((category, key: number) => (
              <Tab key={key} className='focus:outline-none'>
                {({ selected }) => (
                  <Typography
                    type='button'
                    color='dark'
                    weight='medium'
                    className={`${selected ? 'border-b-2 border-b-orange-100' : 'border-none'} pb-[10px]`}
                  >
                    {category.title}
                  </Typography>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='mt-2'>
            {cat.map((item, idx: number) => (
              <Tab.Panel key={idx} className={tabs('rounded-xl bg-white pt-4', 'focus:outline-none')}>
                {renderTabContent(item.id)}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <Divider className='hidden large:block' />
      <div className='flex items-center gap-3 p-2 large:p-4'>
        <DefaultButton text='შენახვა' textColor='text-white' bg='bg-orange-100'></DefaultButton>
        <DefaultButton text='უარყოფა' bg='bg-grey-100'></DefaultButton>
      </div>
    </div>
  )
}

export default PersonalInfo
