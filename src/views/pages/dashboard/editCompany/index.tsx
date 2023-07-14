import Image from 'next/image'
import Link from 'next/link'
import Divider from 'src/views/components/divider'
import { DefaultInput, MultilineInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'
import AddressAndSchedule from '../../profile/company/addressAndSchedule'

const EditCompany = () => {
  return (
    <div className='border border-raisin-10 rounded-3xl large:p-8'>
      <div className='flex gap-6 items-center mb-10'>
        <Image src='/images/avatar.png' width={96} height={96} alt='' className='border border-raisin-10 rounded-3xl' />
        <div>
          <div className='flex items-center gap-4'>
            <Typography type='h3' className='font-bold'>
              ბენე ექსკლუზივი
            </Typography>
            <Image src='/icons/warning.svg' height={20} width={20} alt='' />
            <Typography type='subtitle' className='hidden large:flex text-raisin-100 bg-yellow-10 p-2 rounded-2xl'>
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
        <DefaultInput label='დასახელება' value='ბენე პლიუსი' />
        <DefaultInput label='საიდენტიფიკაციო კოდი' value='402461423' />
        <DefaultInput label='იურიდიული დასახელება' value='შპს ბენე პლიუსი' />
        <MultilineInput
          className='col-span-3'
          label='აღწერა'
          rows={4}
          value='გთხოვთ გადაამოწმოთ მითითებული პარამეტრები და შემდეგ დაასრულოთ დაჯავშნის პროცესი, ეს პარამეტრები მნიშვნელოვანია შემდგომში თქვენსა და გამქირავებელს შორის კომუნიკაციისთვის'
        />
      </div>
      <Typography type='h3' className='font-bold'>
        მისამართები და განრიგი
      </Typography>
      <AddressAndSchedule />
    </div>
  )
}

export default EditCompany
