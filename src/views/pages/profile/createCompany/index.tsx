import { useState } from 'react'
import { useRouter } from 'next/router'
import NewListingLayout from 'src/layouts/NewListingLayout'
import useCreateCompany from './useCreateCompany'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'src/views/components/toast'
import toast from 'react-hot-toast'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

const StepOne = dynamic(() => import('./stepOne'), { ssr: false })
const StepTwo = dynamic(() => import('./stepTwo'), { ssr: false })
const StepThree = dynamic(() => import('./stepThree'), { ssr: false })

const options = [
  { value: '1/3_step', label: 'company_add', step: 1 },
  { value: '2/3_step', label: 'addresses_and_hours', step: 2 },
  { value: '3/3_step', label: 'addresses_and_hours', step: 3 }
]

const CreateCompany = () => {
  const { t } = useTranslation()
  const [step, setStep] = useState(options[0])

  const router = useRouter()

  const selectOption = (option: any) => setStep(option)

  const handleClose = () => router.push('/profile/orders/?page=1')

  const {
    control,
    handleSubmit,
    errors,
    companyValues,
    clearErrors,
    addressFields,
    appendAddress,
    removeAddress,
    createCompany,
    setValue,
    saveCompanyLogo,
    trigger
  } = useCreateCompany()

  const queryClient = useQueryClient()

  const handleGoNextStep = async () => {
    const currentIndex = options.findIndex(option => option.value === step.value)

    switch (currentIndex) {
      case 0:
        const isValidStep1 = await trigger([
          'identification_number',
          'company_information.name',
          'company_information.legal_name',
          'company_information.description',
          'company_information.description_en',
          'company_information.logo'
        ])
        if (isValidStep1) {
          setStep(options[currentIndex + 1])
          window.scrollTo(0, 0)
        }
        break
      case 1:
        const isValidStep2 = await trigger(['addresses'])
        if (isValidStep2) {
          setStep(options[currentIndex + 1])
          window.scrollTo(0, 0)
        }
        break
      case 2:
        const isValidStep3 = await trigger(['company_information.email', 'company_information.phone_numbers'])
        if (isValidStep3) {
          setStep(options[currentIndex + 1])
        }
        break

      default:
        if (currentIndex < options.length - 1) {
          setStep(options[currentIndex + 1])
        }
        break
    }
  }

  const handleGoPrevStep = () => {
    const currentIndex = options.findIndex(option => option.step === step.step)
    if (currentIndex > 0) {
      setStep(options[currentIndex - 1])
    }
  }

  const saveCompanyLogoMutation = useMutation((variables: any) =>
    saveCompanyLogo('', variables.logo, variables.companyId)
  )

  const createCompanyMutation = useMutation(() => createCompany('', companyValues), {
    onSuccess: data => {
      queryClient.invalidateQueries(['profileInfo'])
      if (data) {
        saveCompanyLogoMutation.mutate({
          logo: data?.result?.data?.information?.logo,
          companyId: data?.result?.data?.id
        })
      }
      toast.custom(<Toast type='success' title={t('company_successfully_added')} />)

      setTimeout(() => {
        router.push(`/profile/company/${data?.result?.data?.id}`)
      }, 3000)
    }
  })

  const onSubmit = () => {
    createCompanyMutation.mutate(companyValues)
  }

  console.log(errors, 'errors')
  console.log(companyValues, 'companyValues')

  const renderStepComponent = () => {
    switch (step.step) {
      case 1:
        return <StepOne control={control} errors={errors} clearErrors={clearErrors} setValue={setValue} />
      case 2:
        return (
          <StepTwo
            control={control}
            addressFields={addressFields}
            appendAddress={appendAddress}
            removeAddress={removeAddress}
            errors={errors}
            setValue={setValue}
          />
        )
      case 3:
        return <StepThree control={control} errors={errors} />

      default:
        return null
    }
  }

  return (
    <NewListingLayout
      options={options}
      onChange={selectOption}
      selectedOption={step}
      onNextStep={handleGoNextStep}
      onPrevStep={handleGoPrevStep}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      submitLabel={t('add')}
      disabled={createCompanyMutation.isLoading || saveCompanyLogoMutation.isLoading}
    >
      <form onSubmit={handleSubmit(onSubmit)}>{renderStepComponent()}</form>
    </NewListingLayout>
  )
}

export default CreateCompany
