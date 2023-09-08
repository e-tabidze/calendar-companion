import { useForm } from 'react-hook-form'
import { DefaultInput } from 'src/views/components/input'
import Radio from 'src/views/components/radio'
import Typography from 'src/views/components/typography'
import DateDropdown from '../dateDropdown'

interface Props {
  control: any
}

const ProfileInfoForm: React.FC<Props> = ({ control }) => {
  const options = [
    { label: 'მამრობითი', value: '1' },
    { label: 'მდედრობითი', value: '0' }
  ]

  return (
    <div>
      <Typography type='body' className='my-10'>
        გთხოვთ გადაამოწმოთ მითითებული პარამეტრები და შემდეგ დაასრულოთ დაჯავშნის პროცესი, ეს პარამეტრები მნიშვნელოვანია
        შემდგომში თქვენსა და გამქირავებელს შორის კომუნიკაციისთვის
      </Typography>
      <Typography type='body'>აირჩიე სქესი</Typography>
      <div className='grid gap-2 grid-cols-1 large:grid-cols-2'>
        <Radio options={options} control={control} color='bg-orange-100' name='' horizontal />
        <div></div>
        <DefaultInput control={control} name='first_name' errors={''} label='სახელი' />
        <DefaultInput control={control} name='last_name' errors={''} label='გვარი' />
        <DefaultInput control={control} name='identification_number' errors={''} label='პირადი ნომერი' />
        <DefaultInput control={control} name='phone' errors={''} label='მობილურის ნომერი' />
        <DefaultInput control={control} name='Email' errors={''} label='ელ.ფოსტა' disabled />
        <DateDropdown label={'აირჩიე დაბადების თარიღი'} />
        <DateDropdown label={'მართვის მოწმობის მოქმედების ვადა'} />
      </div>
    </div>
  )
}

export default ProfileInfoForm
