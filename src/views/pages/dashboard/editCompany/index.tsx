import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Divider from 'src/views/components/divider'
import { DefaultInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'
import AddressAndSchedule from '../../profile/company/addressAndSchedule'

const EditCompany = () => {
  const { control } = useForm()
  
  return (
    <div className='border border-raisin-10 rounded-3xl md:p-8'>
      <div className='flex gap-6 items-center mb-10'>
        <Image src='/images/avatar.png' width={96} height={96} alt='' className='border border-raisin-10 rounded-3xl' />
        <div>
          <div className='flex items-center gap-4'>
            <Typography type='h3' className='font-bold'>
              ბენე ექსკლუზივი
            </Typography>
            <Image src='/icons/warning.svg' height={20} width={20} alt='' />
            <Typography type='subtitle' className='hidden md:flex text-raisin-100 bg-yellow-10 p-2 rounded-2xl'>
              არავერიფიცირებული
            </Typography>
          </div>
          <Link href='/abc'>
            <Typography type='subtitle'>სურათის შეცვლა</Typography>
          </Link>
        </div>
      </div>
      <Divider />
      <div className='grid grid-cols-3 gap-4 mt-10'>
        <DefaultInput name='' control={control} errors={''} label='დასახელება' />
        <DefaultInput name='' control={control} errors={''} label='საიდენტიფიკაციო კოდი' />
        <DefaultInput name='' control={control} errors={''} label='იურიდიული დასახელება' />
        <DefaultInput
          name=''
          control={control}
          errors={''}
          label='იურიდიული დასახელება'
          rows={4}
          className='col-span-3'
        />
      </div>
      <Typography type='h3' className='font-bold'>
        მისამართები და განრიგი
      </Typography>
      {/* <AddressAndSchedule /> */}
    </div>
  )
}

export default EditCompany
