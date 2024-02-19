import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import { useRouter } from 'next/router'
import Image from 'src/views/components/image'
import Icon from 'src/views/app/Icon'
import toast from 'react-hot-toast'
import Toast from 'src/views/components/toast'
import {useTranslation} from "next-i18next";

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
    deleteCompanyAddress,
    setValue
  } = useCompany(id)

  const toggleDeleteAddressModal = () => setDeleteAddressModal(!deleteAddresseModal)

  const toggleDeleteCompanyModal = () => setDeleteCompanyModal(!deleteCompanyeModal)

  const queryClient = useQueryClient()

  const router = useRouter()

  const updateCompanyMutation = useMutation(() => updateCompanyInfo(companyValues), {
    onSuccess: () => {
      queryClient.invalidateQueries(['companyInfo'])
      toast.custom(
        <Toast
          title='კომპანია წარმატებით განახლდა!'
          type='success'
        />
      )
    }
  })

  const deleteCompanyMutation = useMutation(() => deleteCompany(), {
    onSuccess: () => {
      queryClient.invalidateQueries(['profileInfo'])
    }
  })

  const deleteCompanyAddressMutation = useMutation((id: number) => deleteCompanyAddress(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['singleCompanyBranches'])
      queryClient.invalidateQueries(['companyInfo'])
      queryClient.invalidateQueries([id])
    }
  })

  const onSubmit = () => {
    updateCompanyMutation.mutate(companyValues)
  }

  const deletCompany = () => {
    deleteCompanyMutation.mutate()
    router.push('/profile/orders')
  }

  const deletCompanyAddress = () => {
    deleteAddressId ? deleteCompanyAddressMutation.mutate(deleteAddressId) : remove(index)
  }
  const {t}= useTranslation()

  console.log(companyValues, 'companyValues edit')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 lg:mt-0">
      <div className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl'>
        <div>
          <div className='flex items-center gap-6 md:mb-10'>
            <div className='flex items-center justify-center border border-raisin-10 relative overflow-hidden rounded-2xl md:rounded-3xl w-[76px] h-[76px] md:w-24 md:h-24'>
              <Image
                src={logo || ''}
                onError={(ev: any) => {
                  ev.target.src = `/icons/avatar.svg`
                }}
                alt=''
                height='100%'
                width='100%'
                className='object-cover w-full h-full'
              />
            </div>
            <div>
              <Typography type='h3' className='font-bold text-3md md:text-2lg'>
                {name}
              </Typography>
              <Link href='/' className='text-blue-80 text-2sm underline'>
                სულ {productsCount} {t('ads')}
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
              name='company_information.legal_name'
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
              <AddressAndSchedule index={index} control={control} address={address} errors={errors} setValue={setValue} />

              {addressFields.length > 1 && index > 0 && (
                <div className='w-full flex justify-end pr-8'>
                  <IconTextButton
                    icon='clear'
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
              )}
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
          {updateCompanyMutation.isLoading ? (
            <Icon svgPath='loader' width={20} height={20} />
          ) : (
            <DefaultButton
              text={t('save')}
              bg='bg-orange-100 hover:bg-orange-110 transition-all'
              textColor='text-white'
              type='submit'
              disabled={updateCompanyMutation.isLoading}
            />
          )}

          <IconTextButton
            label='კომპანიის წაშლა'
            width={20}
            height={21}
            icon='trash'
            className='text-orange-130'
            onClick={toggleDeleteCompanyModal}
            type="button"
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
