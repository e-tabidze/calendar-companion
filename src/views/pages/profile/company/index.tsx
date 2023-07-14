import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import { DefaultInput, MultilineInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'
import AddressAndSchedule from './addressAndSchedule'

const Company = () => {
  const [scheduleComponents, setScheduleComponents] = useState<any>([<AddressAndSchedule key={Math.random()} />])

  const addComponent = () => {
    setScheduleComponents([...scheduleComponents, <AddressAndSchedule key={Math.random()} />])
  }

  return (
    <div>
      <div className='p-2 large:p-6'>
        <div className='flex items-center gap-6'>
          <Image src='/images/avatar.png' alt='' height={96} width={97} className='rounded-3xl' />
          <div>
            <Typography type='h3' className='font-bold'>
              ბენე პლიუსი
            </Typography>
            <Link href='/' className='text-blue-100 underline'>
              სულ 16  განცხადება
            </Link>
          </div>
        </div>
        <Divider />
        <div className='grid grid-cols-2 gap-4 my-5'>
          <DefaultInput label='საიდენტიფიკაციო კოდი' value='402461423' onChange={() => console.log('')} />
          <DefaultInput label='იურიდიული დასახელება' value='შპს ბენე პლიუსი' onChange={() => console.log('')} />
          <DefaultInput
            label='დასახელება'
            value='ბენე პლიუსი'
            className='col-span-2'
            onChange={() => console.log('')}
          />
          <MultilineInput
            className='col-span-2'
            onChange={() => console.log('')}
            rows={4}
            label='აღწერა'
            value='გთხოვთ გადაამოწმოთ მითითებული პარამეტრები და შემდეგ დაასრულოთ დაჯავშნის პროცესი, ეს პარამეტრები მნიშვნელოვანია შემდგომში თქვენსა და გამქირავებელს შორის კომუნიკაციისთვის'
          />
        </div>
        <Typography type='h3' className='font-bold'>
          მისამართები და განრიგი
        </Typography>
        {scheduleComponents}

        <IconTextButton label='ახალი ფასდაკლების დამატება' icon='/icons/add.svg' onClick={addComponent} />

        <Typography type='h3' className='font-bold'>
          საკონტაქტო
        </Typography>
        <div className='grid grid-cols-2 gap-4 my-5'>
          <DefaultInput label='ელ. ფოსტა' value='kukuri.kukunava@yahoo.com' onChange={() => console.log('')} />
          <DefaultInput label='ოფისი ნომერი' onChange={() => console.log('')} />
          <DefaultInput label='ფაქსი' onChange={() => console.log('')} />
          <DefaultInput label='მობილური' value='599 010101' onChange={() => console.log('')} />
        </div>
      </div>
      <Divider />
      <div className='flex justify-between items-center p-2 large:p-6'>
        <DefaultButton text='შენახვა' bg='bg-orange-100' textColor='text-white' />
        <IconTextButton
          label='კომპანიის წაშლა'
          icon='/icons/trash.svg'
          onClick={addComponent}
          className='text-orange-130'
        />
      </div>
    </div>
  )
}

export default Company
