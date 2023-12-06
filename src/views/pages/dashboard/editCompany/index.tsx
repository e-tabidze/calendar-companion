import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import useCompanyInfo from 'src/hooks/useCompanyInfo'
import useProfile from 'src/hooks/useProfile'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import { DefaultInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'
import AddressAndSchedule from '../../profile/company/addressAndSchedule'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import DeleteAddressConfirmationModal from '../../../components/deleteAddressConfirmationModal'
import DeleteCompanyConfirmationModal from 'src/views/components/deleteCompanyConfirmationModal'
import useCompany from './useEditCompany'

const EditCompany = () => {
  const [deleteAddresseModal, setDeleteAddressModal] = useState(false)
  const [deleteCompanyeModal, setDeleteCompanyModal] = useState(false)
  const [deleteAddressId, setDeleteAddressId] = useState<number | null>(null)
  const [index, setIndex] = useState<number>()

  const toggleDeleteAddressModal = () => setDeleteAddressModal(!deleteAddresseModal)

  const toggleDeleteCompanyModal = () => setDeleteCompanyModal(!deleteCompanyeModal)

  const { activeCompanyId } = useProfile()

  const { isLoading } = useCompanyInfo(activeCompanyId)

  const {
    control,
    handleSubmit,
    errors,
    companyValues,
    addressFields,
    appendAddress,
    defaultEmptyAddress,
    remove,
    updateCompanyInfo,
    deleteCompany,
    deleteCompanyAddress
  } = useCompany(activeCompanyId)

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

  const deleteCompanyAddressMutation = useMutation((id: number) => deleteCompanyAddress(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['companyInfo'])
      remove(index)
    }
  })

  const onSubmit = () => {
    updateCompanyMutation.mutate(companyValues)
  }

  const deletCompany = () => {
    deleteCompanyMutation.mutate()
  }

  const deletCompanyAddress = () => {
    deleteAddressId && deleteCompanyAddressMutation.mutate(deleteAddressId)
  }

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='md:border md:border-raisin-10 md:rounded-3xl md:p-8'>
        <div className='flex gap-6 items-center mb-10'>
          <Image
            src='/images/avatar.png'
            width={96}
            height={96}
            alt=''
            className='border border-raisin-10 rounded-3xl'
          />
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
        <div className='md:grid md:grid-cols-3 md:gap-4 mt-10'>
          <DefaultInput name='company_information.name' control={control} errors={''} label='დასახელება' className="mb-4 md:mb-0" />
          <DefaultInput name='identification_number' control={control} errors={''} label='საიდენტიფიკაციო კოდი' className="mb-4 md:mb-0" />
          <DefaultInput name='company_information.name' control={control} errors={''} label='იურიდიული დასახელება' className="mb-4 md:mb-0" />
          <DefaultInput
            name='company_information.description'
            control={control}
            errors={''}
            label='აღწერა'
            rows={4}
            className='col-span-3 mb-4 md:mb-0'
          />
        </div>
        <Typography type='h3' className='font-bold'>
          მისამართები და განრიგი
        </Typography>

        {addressFields.map((address: any, index: number) => (
          <div key={address.id}>
            <AddressAndSchedule index={index} control={control} address={address} errors={errors} />
            <div className='w-full flex justify-end pr-8'>
              <IconTextButton
                icon='/icons/clear.svg'
                type='button'
                label='წაშლა'
                width={16}
                height={16}
                onClick={() => {
                  setIndex(index)
                  toggleDeleteAddressModal()
                  setDeleteAddressId(address.dummyAddressId)
                }}
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

        <Typography type='h3' className='font-bold mt-24 text-3md md:text-2lg'>
          საკონტაქტო
        </Typography>
        <div className='grid grid-cols-2 gap-4 mt-5 my-10'>
          <DefaultInput
            name='company_information.email'
            control={control}
            errors={errors}
            label='ელ. ფოსტა'
            className='col-span-2 md:col-span-1'
          />
          <DefaultInput
            name='company_information.phone_numbers'
            control={control}
            errors={errors}
            label='ტელეფონის ნომერი'
            className='col-span-2 md:col-span-1'
          />
        </div>

        <Divider />
        <div className='flex justify-between items-center p-2 md:p-6'>
          <DefaultButton text='შენახვა' bg='bg-orange-100' textColor='text-white' type='submit' />
          <IconTextButton
            label='კომპანიის წაშლა'
            icon='/icons/trash.svg'
            className='text-orange-130'
            onClick={toggleDeleteCompanyModal}
          />
        </div>

        <DeleteAddressConfirmationModal
          open={deleteAddresseModal}
          toggleModal={toggleDeleteAddressModal}
          addressId={deleteAddressId}
          deleteAddress={deletCompanyAddress}
        />
        <DeleteCompanyConfirmationModal
          open={deleteCompanyeModal}
          toggleModal={toggleDeleteCompanyModal}
          companyId={activeCompanyId}
          deleteCompany={deletCompany}
        />
      </div>
    </form>
  )
}

export default EditCompany
