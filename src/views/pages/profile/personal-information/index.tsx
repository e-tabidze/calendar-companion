import Image from 'src/views/components/image'
import { DefaultButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'

import { Tab } from '@headlessui/react'
import ProfileInfoForm from './profileInfoForm'
import PasswordForm from './passwordForm'
import { UserInfo } from 'src/types/User'
import usePersonalInfo from './usePersonalInfo'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import useProfile from 'src/hooks/useProfile'
import {useTranslation} from "next-i18next";

const cat = [
  {
    title: 'personal_info',
    id: 0
  },
  {
    title: 'change_password',
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
  const {t} = useTranslation()
  const [activeTab, setActiveTab] = useState<number>(0)
  const { defaultImgUrl, userInfo } = useProfile()
  const {
    userInfoControl,
    passwordControl,
    errors,
    handleSubmit,
    userInfoValues,
    updateUserInfo,
    changeUserPassword,
    passwordValues,
    passwordErrors,
    reset,
    uploadProfileImage,
    saveProfileImage
  } = usePersonalInfo(userData)

  const renderTabContent = (id: any) => {
    if (id === 0) {
      return <ProfileInfoForm control={userInfoControl} errors={errors} />
    } else {
      return <PasswordForm control={passwordControl} passwordErrors={passwordErrors} />
    }
  }

  const queryClient = useQueryClient()

  const updateUserMutation = useMutation(() => updateUserInfo({ AccessToken: '', userInfo: userInfoValues }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['profileInfo'])
    }
  })

  const changePasswordMutation = useMutation(() => changeUserPassword('', passwordValues), {
    onSuccess: () => {
      queryClient.invalidateQueries(['profileInfo'])
    }
  })

  const onSubmit = () => {
    activeTab === 0 ? updateUserMutation.mutate(userInfoValues) : changePasswordMutation.mutate(passwordValues)
  }

  const saveProfileImageMutation = useMutation((variables: any) => saveProfileImage(variables.Photo))

  const handleReset = () => {
    activeTab === 0 ? reset() : reset()
  }

  const uploadProfileImageMutation: any = useMutation(uploadProfileImage, {
    onSettled: data => {
      if (data) {
        saveProfileImageMutation.mutate({
          Photo: data?.Image
        })
        queryClient.invalidateQueries(['profileInfo'])
      }
    }
  })

  const handleFileUpload = async (file: any) => {
    try {
      await uploadProfileImageMutation.mutateAsync(file)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  console.log(userInfoValues, 'userInfoValues')

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={handleReset}
      className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl mt-8 lg:mt-0'
    >
      <div>
        <Typography type='h3' className='mb-6'>
          {t('parameters')}
        </Typography>
        <div className='border border-raisin-10 p-4 md:border-none md:p-0 rounded-2xl flex items-center gap-6 md:mt-8 '>
          <div className='w-12 h-12 md:w-24 md:h-24 rounded-full overflow-hidden'>
            <Image
              src={userInfo?.information?.profile_pic || defaultImgUrl}
              onError={(ev: any) => {
                ev.target.src = `/icons/avatar.svg`
              }}
              height='100%'
              width='100%'
              alt=''
              className='w-full h-full object-cover'
            />
          </div>

          <div className='flex flex-col md:gap-2'>
            <Typography type='h3' className='text-md md:text-2lg font-medium md:font-bold'>
              {userData?.information?.first_name || userData?.FirstName} {userData?.information?.last_name || userData?.LastName}
            </Typography>

            <Controller
              name='profile_pic'
              control={userInfoControl}
              render={({ field: { value, onChange } }) => (
                <label className='text-blue-130 text-2sm underline cursor-pointer'>
                  {t('change_photo')}
                  <input
                    value={value}
                    className='sr-only'
                    onChange={(e: any) => {
                      onChange()
                      handleFileUpload(Array.from(e.target.files))
                    }}
                    type='file'
                  />
                </label>
              )}
            />
          </div>
        </div>

        <Tab.Group onChange={index => setActiveTab(index)}>
          <Tab.List className='flex space-x-4 gap-6 pb-[7.4px] border-b border-raisin-10 mt-10'>
            {cat.map((category, key: number) => (
              <Tab key={key} className='focus:outline-none'>
                {({ selected }) => (
                  <Typography
                    type='button'
                    color='dark'
                    weight='medium'
                    className={`${selected ? 'border-b-2 border-b-orange-100' : 'border-none'} pb-2`}
                  >
                    {t(category.title)}
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
        <DefaultButton
          type='submit'
          text={t('save')}
          textColor='text-white'
          bg='bg-orange-100 hover:bg-orange-110 transition-all'
        ></DefaultButton>
        <DefaultButton text={t('decline')} bg='bg-grey-100 hover:bg-raisin-10 transition-all text-raisin-100' type='reset' textColor="!text-raisin-100"></DefaultButton>
      </div>
    </form>
  )
}

export default PersonalInfo
