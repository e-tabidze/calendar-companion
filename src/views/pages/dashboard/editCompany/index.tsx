import Image from 'next/image'
import { useEffect, useState } from 'react'
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
import useEditCompany from './useEditCompany'
import { Controller, useWatch } from 'react-hook-form'
import Icon from "src/views/app/Icon";

const EditCompany = () => {
  const [deleteAddresseModal, setDeleteAddressModal] = useState(false)
  const [deleteCompanyeModal, setDeleteCompanyModal] = useState(false)
  const [deleteAddressId, setDeleteAddressId] = useState<number | null>(null)
  const [index, setIndex] = useState<number>()

  const toggleDeleteAddressModal = () => setDeleteAddressModal(!deleteAddresseModal)

  const toggleDeleteCompanyModal = () => setDeleteCompanyModal(!deleteCompanyeModal)

  const { activeCompanyId } = useProfile()

  const { companyInfo } = useCompanyInfo(activeCompanyId)

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
    deleteCompanyAddress,
    uploadCompanyLogo,
    saveCompanyLogo,
    setValue
  } = useEditCompany(activeCompanyId)

  const queryClient = useQueryClient()

  const updateCompanyMutation = useMutation(() => updateCompanyInfo(companyValues), {
    onSuccess: data => {
      queryClient.invalidateQueries(['companyInfo'])
      queryClient.invalidateQueries(['profileInfo'])
      queryClient.invalidateQueries(['companyLogo'])
      if (data) {
        saveCompanyLogoMutation.mutate({
          logo: data?.result?.data?.information?.logo,
          companyId: data?.result?.data?.id
        })
      }
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

  const uploadCompanyLogoMutation: any = useMutation(uploadCompanyLogo, {
    onSettled: () => {
      queryClient.invalidateQueries(['companyLogo'])
    }
  })

  const saveCompanyLogoMutation = useMutation((variables: any) =>
    saveCompanyLogo('', variables.logo, variables.companyId)
  )

  const handleFileUpload = async (file: any) => {
    try {
      await uploadCompanyLogoMutation.mutateAsync(file)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  const onSubmit = () => {
    updateCompanyMutation.mutate(companyValues)
  }

  const deletCompany = () => {
    deleteCompanyMutation.mutate()
  }

  const deletCompanyAddress = () => {
    deleteAddressId && deleteCompanyAddressMutation.mutate(deleteAddressId)
  }

  const formState = useWatch({ control })

  useEffect(() => {
    setValue('company_information.logo', uploadCompanyLogoMutation.data?.Data?.FilesList[0])
  }, [uploadCompanyLogoMutation.data?.Data?.FilesList[0]])

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='md:border md:border-raisin-10 md:rounded-3xl md:p-8'>
        <div className='flex gap-6 items-center mb-10'>
          <div className="w-24 h-24 border border-raisin-10 rounded-3xl relative overflow-hidden">
            <Image
                src={formState?.company_information?.logo || companyInfo?.information?.logo || ''}
                width={96}
                height={96}
                alt={formState?.company_information?.name || ''}
                className='object-cover w-full h-full'
            />
          </div>

          <div>
            <div className='flex items-center gap-4'>
              <Typography type='h3' className='font-bold'>
                {companyInfo?.information?.name} ABC
              </Typography>
              <Icon svgPath='warning' width={20} height={20} />
              <Typography type='subtitle' className='hidden md:flex text-raisin-100 bg-yellow-10 p-2 rounded-2xl'>
                არავერიფიცირებული
              </Typography>
            </div>
            <Controller
              name='company_information.logo'
              control={control}
              render={({ field: { onChange } }) => (
                <label>
                  სურათის შეცვლა
                  <input
                    type='file'
                    className='opacity-0 text-blue-100'
                    onChange={(e: any) => {
                      onChange()
                      handleFileUpload(e.target.files[0])
                    }}
                  />
                </label>
              )}
            />
          </div>
        </div>
        <Divider />
        <div className='md:grid md:grid-cols-3 md:gap-4 mt-10'>
          <DefaultInput
            name='company_information.name'
            control={control}
            errors={''}
            label='დასახელება'
            className='mb-4 md:mb-0'
          />
          <DefaultInput
            name='identification_number'
            control={control}
            errors={''}
            label='საიდენტიფიკაციო კოდი'
            className='mb-4 md:mb-0'
            disabled
          />
          <DefaultInput
            name='company_information.name'
            control={control}
            errors={''}
            label='იურიდიული დასახელება'
            className='mb-4 md:mb-0'
            disabled
          />
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
                icon='clear'
                type='button'
                label='წაშლა'
                width={24}
                height={24}
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
          icon='add'
          width={20}
          height={20}
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
          <DefaultButton text='შენახვა' bg='bg-orange-100' textColor='text-white' type='submit' disabled={updateCompanyMutation.isLoading} />
          <IconTextButton
            label='კომპანიის წაშლა'
            icon='trash'
            width={20}
            height={21}
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
