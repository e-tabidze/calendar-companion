import { useState } from 'react'
import { useRouter } from 'next/router'
import NewListingLayout from 'src/layouts/NewListingLayout'
import StepOne from './stepOne'
import StepThree from './stepThree'
import StepTwo from './stepTwo'
import useCreateCompany from './useCreateCompany'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'src/views/components/toast'
import toast from 'react-hot-toast'

const CreateCompany = () => {
  const options = [
    { value: '1/3 ნაბიჯი', label: 'კომპანიის დამატება', step: 1 },
    { value: '2/3 ნაბიჯი', label: 'მისამართები და სამუშაო საათები', step: 2 },
    { value: '3/3 ნაბიჯი', label: 'მისამართები და სამუშაო საათები', step: 3 }
  ]
  const [step, setStep] = useState(options[0])

  const router = useRouter()

  const handleClose = () => router.push('/profile/orders/')

  const selectOption = (option: any) => setStep(option)

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
          'company_information.logo'
        ])
        if (isValidStep1) {
          setStep(options[currentIndex + 1])
        }
        break
      case 1:
        const isValidStep2 = await trigger(['addresses'])
        if (isValidStep2) {
          setStep(options[currentIndex + 1])
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

  const createCompanyMutation = useMutation(() => createCompany('', companyValues), {
    onSuccess: data => {
      queryClient.invalidateQueries(['profileInfo'])
      if (data) {
        saveCompanyLogoMutation.mutate({
          logo: data?.result?.data?.information?.logo,
          companyId: data?.result?.data?.id
        })
      }
      toast.custom(<Toast type='success' title='კომპანია წარმატებით დაემატა' />)

      setTimeout(() => {
        router.push(`/profile/company/${data?.result?.data?.id}`)
      }, 3000)
    }
  })

  const saveCompanyLogoMutation = useMutation((variables: any) =>
    saveCompanyLogo('', variables.logo, variables.companyId)
  )

  const onSubmit = () => {
    createCompanyMutation.mutate(companyValues)
  }

  console.log(errors, 'errors')
  console.log(companyValues, 'companyValues')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NewListingLayout
        options={options}
        onChange={selectOption}
        selectedOption={step}
        onNextStep={handleGoNextStep}
        onPrevStep={handleGoPrevStep}
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        submitLabel='დამატება'
        disabled={createCompanyMutation.isLoading || saveCompanyLogoMutation.isLoading}
      >
        {step.step === 1 && (
          <StepOne
            control={control}
            errors={errors}
            clearErrors={clearErrors}
            setValue={setValue}
          />
        )}
        {step.step === 2 && (
          <StepTwo
            control={control}
            addressFields={addressFields}
            appendAddress={appendAddress}
            removeAddress={removeAddress}
            errors={errors}
            setValue={setValue}
          />
        )}
        {step.step === 3 && <StepThree control={control} errors={errors} />}
      </NewListingLayout>
    </form>
  )
}

export default CreateCompany
