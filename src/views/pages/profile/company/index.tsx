import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import { DefaultInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'
import AddressAndSchedule from './addressAndSchedule'
import DeleteAddressConfirmationModal from '../../../components/deleteAddressConfirmationModal'
import DeleteCompanyConfirmationModal from '../../../components/deleteCompanyConfirmationModal'
import useCompany from './useCompany'

interface Props {
  id: number
  name: string
  productsCount: number
  logo: string
}

const Company: React.FC<Props> = ({ id, name, productsCount, logo }) => {
  const [deleteAddresseModal, setDeleteAddressModal] = useState(false)
  const [deleteCompanyeModal, setDeleteCompanyModal] = useState(false)
  const [deleteAddressId, setDeleteAddressId] = useState<number | null>(null)
  const [index, setIndex] = useState<number>()
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
    deleteCompany,
    deleteCompanyAddress
  } = useCompany(id)

  const toggleDeleteAddressModal = () => setDeleteAddressModal(!deleteAddresseModal)

  const toggleDeleteCompanyModal = () => setDeleteCompanyModal(!deleteCompanyeModal)

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
    console.log(companyValues, 'companyValues')
    updateCompanyMutation.mutate(companyValues)
  }

  const deletCompany = () => {
    deleteCompanyMutation.mutate()
  }

  const deletCompanyAddress = () => {
    deleteAddressId && deleteCompanyAddressMutation.mutate(deleteAddressId)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='md:border border-raisin-10 rounded-3xl mx-4 lg:mx-0'>
        <div className='p-2 md:p-6'>
          <div className='flex items-center gap-6 md:mb-10'>
            <div className='flex items-center justify-center border border-raisin-10 rounded-2xl md:rounded-3xl w-[76px] h-[76px] md:w-24 md:h-24'>
              <Image src={logo} alt='' height={96} width={97} className='rounded-3xl' />
            </div>
            <div>
              <Typography type='h3' className='font-bold text-3md md:text-2lg'>
                {name}
              </Typography>
              <Link href='/' className='text-blue-80 text-2sm underline'>
                სულ {productsCount}  განცხადება
              </Link>
            </div>
          </div>
          <Divider className='hidden md:flex' />
          <div className='grid grid-cols-2 gap-4 my-10'>
            <DefaultInput
              name='identification_number'
              control={control}
              errors={errors}
              label='საიდენტიფიკაციო კოდი'
              className='col-span-2 sm:col-span-1'
            />
            <DefaultInput
              name='company_information.name'
              control={control}
              errors={errors}
              disabled
              label='იურიდიული დასახელება'
              className='col-span-2 sm:col-span-1'
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
          <Typography type='h3' className='font-bold text-3md md:text-2lg'>
            მისამართები და განრიგი
          </Typography>

          {addressFields.map((address: any, index: number) => (
            <div key={address.id}>
              <AddressAndSchedule index={index} control={control} address={address} errors={errors} />
              <div className='w-full flex justify-end pr-8'>
                <IconTextButton
                  icon='/icons/clear.svg'
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
          <div className='grid grid-cols-2 gap-4 my-5'>
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
        companyId={id}
        deleteCompany={deletCompany}
      />
    </form>
  )
}

export default Company
