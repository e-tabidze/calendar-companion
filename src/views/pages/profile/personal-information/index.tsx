import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DefaultButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import { DefaultInput, PasswordInput } from 'src/views/components/input'
import Radio from 'src/views/components/radio'
import Typography from 'src/views/components/typography'
import DateDropdown from './dateDropdown'

enum Tabs {
  PROFILE = 'profile',
  PASSWORD = 'password'
}

const options = [
  { label: 'მამრობითი', value: 'მამრობითი' },
  { label: 'მდედრობითი', value: 'მდედრობითი' }
]

const PersonalInfo = () => {
  const [activeTab, setActiveTab] = useState(Tabs.PROFILE)

  const { control } = useForm()

  const handleTabClick = (tab: Tabs) => {
    setActiveTab(tab)
  }

  return (
    <div className=''>
      <div className='p-2 large:p-4'>
        <Typography type='h3'>პარამეტრები</Typography>
        <div className='flex items-center gap-3 mt-8 '>
          <Image src='/images/avatar.png' height={96} width={96} alt='' className='rounded-3xl' />
          <div>
            <Typography type='h3' className='font-bold'>
              ზაური ათაბეგაშვილი
            </Typography>
            <Link href='/' className='text-2sm underline text-blue-100'>
              სურათის შეცვლა
            </Link>
          </div>
        </div>
        <div className='flex flex-row gap-10 relative mt-10'>
          <button
            className={`${activeTab === Tabs.PROFILE ? 'border-b-2 border-b-orange-100' : 'border-none'}  py-4`}
            onClick={() => handleTabClick(Tabs.PROFILE)}
          >
            პირადი ინფორმაცია
          </button>
          <button
            className={`${activeTab === Tabs.PASSWORD ? 'border-b-2 border-b-orange-100' : 'border-none'}  py-4`}
            onClick={() => handleTabClick(Tabs.PASSWORD)}
          >
            პაროლის შეცვლა
          </button>
          <div className='w-full h-px bg-raisin-10 absolute z-0 -bottom-px' />
        </div>
        <div>
          {activeTab === Tabs.PROFILE && (
            <div>
              <Typography type='body' className='my-10'>
                გთხოვთ გადაამოწმოთ მითითებული პარამეტრები და შემდეგ დაასრულოთ დაჯავშნის პროცესი, ეს პარამეტრები
                მნიშვნელოვანია შემდგომში თქვენსა და გამქირავებელს შორის კომუნიკაციისთვის
              </Typography>
              <Typography type='body'>აირჩიე სქესი</Typography>
              <div className='grid gap-2 grid-cols-1 large:grid-cols-2'>
                <Radio options={options} control={control} color='bg-orange-100' name='' horizontal />
                <div></div>
                <DefaultInput control={control} name='' errors={''} label='სახელი, გვარი' />
                <DefaultInput control={control} name='' errors={''} label='პირადი ნომერი' />
                <DefaultInput control={control} name='' errors={''} label='მობილურის ნომერი' />
                <DefaultInput control={control} name='' errors={''} label='ელ.ფოსტა' />
                <DateDropdown label={'აირჩიე დაბადების თარიღი'} />
                <DateDropdown label={'მართვის მოწმობის მოქმედების ვადა'} />
              </div>
            </div>
          )}
        </div>
        <div>
          {activeTab === Tabs.PASSWORD && (
            <div className='grid grid-cols-1 gap-2 mt-10'>
              <PasswordInput label='არსებული პაროლი' />
              <PasswordInput label='ახალი პაროლი' />
              <PasswordInput label='გაიმეორე ახალი პაროლი' />
            </div>
          )}
        </div>
      </div>
      <Divider />
      <div className='flex items-center gap-3 p-2 large:p-4'>
        <DefaultButton text='შენახვა' textColor='text-white' bg='bg-orange-100'></DefaultButton>
        <DefaultButton text='უარყოფა' bg='bg-grey-100'></DefaultButton>
      </div>
    </div>
  )
}

export default PersonalInfo
