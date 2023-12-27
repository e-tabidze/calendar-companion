import { useEffect, useState } from 'react'
import useCompanyInfo from 'src/hooks/useCompanyInfo'
import useProfile from 'src/hooks/useProfile'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import { DefaultInput } from 'src/views/components/input'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import useEditCompany from './useEditCompany'
import { Controller, useWatch } from 'react-hook-form'
import dynamic from 'next/dynamic'

const Image = dynamic(() => import('src/views/components/image'), { ssr: true })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const AddressAndSchedule = dynamic(() => import('../../profile/company/addressAndSchedule'), { ssr: false })
const DeleteAddressConfirmationModal = dynamic(() => import('../../../components/deleteAddressConfirmationModal'), {
  ssr: false
})
const DeleteCompanyConfirmationModal = dynamic(() => import('src/views/components/deleteCompanyConfirmationModal'), {
  ssr: false
})

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

  console.log(companyValues, 'companyValues')

  const updateCompanyMutation = useMutation(() => updateCompanyInfo(companyValues), {
    onSuccess: data => {
      queryClient.invalidateQueries(['companyInfo'])
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
  }, [uploadCompanyLogoMutation.data?.Data?.FilesList, setValue])

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='md:border md:border-raisin-10 md:rounded-3xl md:p-8'>
        <div className='flex gap-6 items-center mb-10'>
          <div className='flex shrink-0 w-[76px] h-[76px] md:w-24 md:h-24 border border-raisin-10 rounded-3xl relative overflow-hidden'>
            {updateCompanyMutation?.isLoading ? (
              <>Loading</>
            ) : (
              <Image
                src={formState?.company_information?.logo || companyInfo?.information?.logo || ''}
                width={'100%'}
                height={'100%'}
                alt={companyInfo?.information?.name}
                className='object-cover w-full h-full'
                onError={(ev: any) => {
                  ev.target.src = `/icons/avatar.svg`
                }}
              />
            )}
          </div>

          <div>
            <div className='flex items-center gap-4'>
              <Typography
                type='h3'
                className='font-bold text-3md md:text-2lg overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] md:max-w-none inline-block'
              >
                {companyInfo?.information?.name}
              </Typography>
            </div>
            <Controller
              name='company_information.logo'
              control={control}
              render={() => (
                <label className='text-2sm flex flex-col cursor-pointer max-w-[220px] md:max-w-none'>
                  სურათის შეცვლა
                  <input
                    type='file'
                    className='opacity-0 text-blue-100'
                    onChange={(e: any) => handleFileUpload(e.target.files)}
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
            errors={errors}
            label='დასახელება'
            className='mb-4 md:mb-0'
          />
          <DefaultInput
            name='identification_number'
            control={control}
            errors={errors}
            label='საიდენტიფიკაციო კოდი'
            className='mb-4 md:mb-0'
            disabled
          />
          <DefaultInput
            name='company_information.legal_name'
            control={control}
            errors={''}
            label='იურიდიული დასახელება'
            className='mb-4 md:mb-0'
            disabled
          />
          <DefaultInput
            name='company_information.description'
            control={control}
            errors={errors}
            label='აღწერა'
            rows={4}
            className='col-span-3 mb-4 md:mb-0'
          />
        </div>
        <Typography type='h3' className='font-bold text-3md md:text-2lg mt-10 md:mt-16'>
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

        <Typography type='h3' className='font-bold mt-10 md:mt-16 text-3md md:text-2lg'>
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
        <div className='flex justify-between items-center pt-8'>
          <DefaultButton
            text='შენახვა'
            bg='bg-orange-100'
            textColor='text-white'
            type='submit'
            disabled={updateCompanyMutation.isLoading}
          />
          <IconTextButton
            label='კომპანიის წაშლა'
            icon='trash'
            width={20}
            height={21}
            className='text-orange-130'
            onClick={toggleDeleteCompanyModal}
            disabled={deleteCompanyMutation.isLoading}
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
