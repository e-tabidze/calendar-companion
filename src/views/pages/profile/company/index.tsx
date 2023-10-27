import Image from 'next/image'
import Link from 'next/link'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import { DefaultInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'
import AddressAndSchedule from './addressAndSchedule'
import useCompany from './useCompany'
import { CompanyAddress, CompanyInfo, WorkingHours, WorkingTime } from 'src/types/Company'

interface Props {
  id: number
}

const Company: React.FC<Props> = ({ id }) => {
  const { control, errors, addressFields, appendAddress, defaultEmptyAddress, companyValues, remove, handleSubmit } =
    useCompany(id)

  const onSubmit = () => {
    companyValues.addresses.forEach(
      (addr: {
        is_same_time: boolean
        working_hours: {
          [x: string]: {
            is_selected: boolean
            end_time: string
            start_time: string
          }
        }
      }) => {
        if (addr.is_same_time) {
          const takeDefaultTime = {
            start_time: addr.working_hours['monday'].start_time,
            end_time: addr.working_hours['monday'].end_time
          }

          for (const day in addr.working_hours) {
            addr.working_hours[day].start_time = ''
            addr.working_hours[day].end_time = ''
            if (addr.working_hours[day].is_selected) {
              addr.working_hours[day].start_time = takeDefaultTime.start_time
              addr.working_hours[day].end_time = takeDefaultTime.end_time
              addr.working_hours[day].is_selected = true
            } else {
              addr.working_hours[day].is_selected = false
            }
          }
        }
      }
    )
    console.log(companyValues, 'companyValues')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <DefaultInput
              name='identification_number'
              control={control}
              errors={errors}
              label='საიდენტიფიკაციო კოდი'
              disabled
            />
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

          {addressFields.map((address: CompanyAddress, index) => (
            <div key={address.id}>
              <IconTextButton
                label='მისამართის წაშლა'
                icon='/icons/trash.svg'
                onClick={() => remove(index)}
                className='text-orange-130'
              />
              <AddressAndSchedule index={index} control={control} workingHours={address.working_hours} />
            </div>
          ))}

          <IconTextButton
            label='მისამართის დამატება'
            icon='/icons/add.svg'
            onClick={() => {
              appendAddress(defaultEmptyAddress)
            }}
            type='button'
          />

          <Typography type='h3' className='font-bold'>
            საკონტაქტო
          </Typography>
          <div className='grid grid-cols-2 gap-4 my-5'>
            <DefaultInput name='company_information.email' control={control} errors={errors} label='ელ. ფოსტა' />
            <DefaultInput
              name='company_information.phone_numbers'
              control={control}
              errors={errors}
              label='ტელეფონის ნომერი'
            />
          </div>
        </div>
        <Divider />
        <div className='flex justify-between items-center p-2 md:p-6'>
          <DefaultButton text='შენახვა' bg='bg-orange-100' textColor='text-white' type='submit' />
          <IconTextButton label='კომპანიის წაშლა' icon='/icons/trash.svg' className='text-orange-130' />
        </div>
      </div>
    </form>
  )
}

export default Company
