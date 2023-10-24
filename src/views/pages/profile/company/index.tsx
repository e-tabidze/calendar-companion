import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import { DefaultInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'
import AddressAndSchedule from './addressAndSchedule'
import useCompany from './useCompany'

interface Props {
  id: number
}

const Company: React.FC<Props> = ({ id }) => {
  const { control, errors } = useCompany(id)
  const [scheduleComponents, setScheduleComponents] = useState<any>([<AddressAndSchedule key={Math.random()} />])

  const addComponent = () => {
    setScheduleComponents([...scheduleComponents, <AddressAndSchedule key={Math.random()} />])
  }

  return (
    <form>
      <div className='md:border border-raisin-10 rounded-3xl'>
        <div className='p-2 md:p-6'>
          <div className='flex items-center gap-6'>
            <Image src='/images/avatar.png' alt='' height={96} width={97} className='rounded-3xl' />
            <div>
              <Typography type='h3' className='font-bold'>
                ბენე პლიუსი {id}
              </Typography>
              <Link href='/' className='text-blue-100 underline'>
                სულ 16  განცხადება
              </Link>
            </div>
          </div>
          <Divider />
          <div className='grid grid-cols-2 gap-4 my-5'>
            <DefaultInput name='identification_number' control={control} errors={errors} label='საიდენტიფიკაციო კოდი' />
            <DefaultInput
              name='company_information.name'
              control={control}
              errors={errors}
              disabled
              label='იურიდიული დასახელება'
            />
            <DefaultInput
              name='company_information.name'
              control={control}
              errors={errors}
              label='დასახელება'
              className='col-span-2'
            />
            <DefaultInput
              name='company_information.description'
              errors={errors}
              control={control}
              className='col-span-2'
              rows={4}
              label='აღწერა'
            />
          </div>
          <Typography type='h3' className='font-bold'>
            მისამართები და განრიგი
          </Typography>
          {scheduleComponents}

          <IconTextButton label='მისამართის დამატება' icon='/icons/add.svg' onClick={addComponent} />

          <Typography type='h3' className='font-bold'>
            საკონტაქტო
          </Typography>
          <div className='grid grid-cols-2 gap-4 my-5'>
            <DefaultInput name='' control={control} errors={errors} label='ელ. ფოსტა' />
            <DefaultInput name='' control={control} errors={errors} label='ოფისი ნომერი' />
            <DefaultInput name='' control={control} errors={errors} label='ფაქსი' />
            <DefaultInput name='' control={control} errors={errors} label='მობილური' />
          </div>
        </div>
        <Divider />
        <div className='flex justify-between items-center p-2 md:p-6'>
          <DefaultButton text='შენახვა' bg='bg-orange-100' textColor='text-white' />
          <IconTextButton
            label='კომპანიის წაშლა'
            icon='/icons/trash.svg'
            onClick={addComponent}
            className='text-orange-130'
          />
        </div>
      </div>
    </form>
  )
}

export default Company
