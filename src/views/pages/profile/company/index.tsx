import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
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
  const {
    control,
    errors,
    addressFields,
    appendAddress,
    defaultEmptyAddress,
    companyValues,
    remove,
    handleSubmit,
    updateCompanyInfo,
    deleteCompany
  } = useCompany(id)


  const queryClient = useQueryClient()

  const updateCompanyMutation = useMutation(() => updateCompanyInfo(companyValues), {
    onSuccess: () => {
      queryClient.invalidateQueries(['companyInfo'])
    }
  })

  const deleteCompanyMutation = useMutation(() => deleteCompany(), {
    onSuccess: () => {
      queryClient.invalidateQueries(['profileInfo'])
    }
  })

  const onSubmit = () => {
    console.log(companyValues, 'companyValues')
    updateCompanyMutation.mutate(companyValues)
  }

  const deletCompany = () => {
    deleteCompanyMutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='md:border border-raisin-10 rounded-3xl mx-[16px] lg:mx-0'>
        <div className='p-2 md:p-6'>
          <div className='flex items-center gap-6 md:mb-10'>
            <div className="flex items-center justify-center border border-raisin-10 rounded-[16px] md:rounded-[24px] w-[76px] h-[76px] md:w-[96px] md:h-[96px]">
              <Image src='/images/avatar.png' alt='' height={96} width={97} className='rounded-3xl' />
            </div>
            <div>
              <Typography type='h3' className='font-bold text-[20px] md:text-[24px]'>
                ბენე პლიუსი {id}
              </Typography>
              <Link href='/' className='text-blue-80 text-[14px] underline'>
                სულ 16  განცხადება
              </Link>
            </div>
          </div>
          <Divider className="hidden md:flex" />
          <div className='grid grid-cols-2 gap-4 my-10'>
            <DefaultInput
                name='identification_number'
                control={control}
                errors={errors}
                label='საიდენტიფიკაციო კოდი'
                className="col-span-2 sm:col-span-1"
            />
            <DefaultInput
              name='company_information.name'
              control={control}
              errors={errors}
              disabled
              label='იურიდიული დასახელება'
              className="col-span-2 sm:col-span-1"
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
          <Typography type='h3' className='font-bold text-[20px] md:text-[24px]'>
            მისამართები და განრიგი
          </Typography>

          {addressFields.map((address, index) => (
            <div key={address.id}>
              <AddressAndSchedule index={index} control={control} address={address} errors={errors} />
              <div className='w-full flex justify-end pr-8'>
                <IconTextButton
                  icon='/icons/clear.svg'
                  label='წაშლა'
                  width={16}
                  height={16}
                  onClick={() => remove(index)}
                />
              </div>
            </div>
          ))}

          <IconTextButton
            label='მისამართის დამატება'
            icon='/icons/add.svg'
            className='ml-4'
            onClick={() => {
              appendAddress(defaultEmptyAddress)
            }}
            type='button'
          />

          <Typography type='h3' className='font-bold mt-24 text-[20px] md:text-[24px]'>
            საკონტაქტო
          </Typography>
          <div className='grid grid-cols-2 gap-4 my-5'>
            <DefaultInput
                name='company_information.email'
                control={control}
                errors={errors}
                label='ელ. ფოსტა'
                className="col-span-2 md:col-span-1"
            />
            <DefaultInput
              name='company_information.phone_numbers'
              control={control}
              errors={errors}
              label='ტელეფონის ნომერი'
              className="col-span-2 md:col-span-1"
            />
          </div>
        </div>
        <Divider />
        <div className='flex justify-between items-center p-2 md:p-6'>
          <DefaultButton text='შენახვა' bg='bg-orange-100' textColor='text-white' type='submit' />
          <IconTextButton
            label='კომპანიის წაშლა'
            icon='/icons/trash.svg'
            className='text-orange-130'
            onClick={deletCompany}
          />
        </div>
      </div>
    </form>
  )
}

export default Company
