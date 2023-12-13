import Image from 'next/image'
import Link from 'next/link'
import { DefaultButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import Cookie from 'src/helpers/Cookie'

import { Tab } from '@headlessui/react'
import ProfileInfoForm from './profileInfoForm'
import PasswordForm from './passwordForm'
import { UserInfo } from 'src/types/User'
import usePersonalInfo from './usePersonalInfo'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useWindowDimensions from "src/hooks/useWindowDimensions";

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

const tabs = (...classes: any) => {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  userData: UserInfo
}

const PersonalInfo: React.FC<Props> = ({ userData }) => {
  const { control, errors, handleSubmit, userInfoValues, updateUserInfo } = usePersonalInfo(userData)

  const { width } = useWindowDimensions()

  const renderTabContent = (id: any) => {
    if (id === 0) {
      return <ProfileInfoForm control={control} errors={errors} />
    } else {
      return <PasswordForm />
    }
  }

  const queryClient = useQueryClient()

  const updateUserMutation = useMutation(
    () => updateUserInfo({ AccessToken: Cookie.get('AccessToken'), userInfo: userInfoValues }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profileInfo'])
      }
    }
  )

  const onSubmit = () => {
    updateUserMutation.mutate(userInfoValues)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='md:border border-raisin-10 rounded-3xl'>
      <div className='p-2 md:p-10'>
        <Typography type='h3' className='hidden md:inline-block'>
          პარამეტრები
        </Typography>
        <div className='border border-raisin-10 p-4 md:border-none md:p-0 rounded-2xl flex items-center gap-6 md:mt-8 '>
          <Image
            src={userData?.information.profile_pic}
            height={width > 779 ? 96 : 48}
            width={width > 779 ? 96 : 48}
            alt=''
            className='rounded-full md:rounded-3xl'
          />
          <div className='flex flex-col md:gap-2'>
            <Typography type='h3' className='text-md md:text-2lg font-medium md:font-bold'>
              {userData?.information?.first_name} {userData?.information?.last_name}
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
      <Divider className='hidden md:block' />
      <div className='flex items-center justify-end md:justify-start gap-3 p-2 md:p-4'>
        <DefaultButton type='submit' text='შენახვა' textColor='text-white' bg='bg-orange-100'></DefaultButton>
        <DefaultButton text='უარყოფა' bg='bg-grey-100'></DefaultButton>
      </div>
    </form>
  )
}

export default PersonalInfo
