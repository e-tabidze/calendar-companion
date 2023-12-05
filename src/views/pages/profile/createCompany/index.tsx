import { useState } from 'react'
import { useRouter } from 'next/router'
import NewListingLayout from 'src/layouts/NewListingLayout'
import StepOne from './stepOne'
import StepThree from './stepThree'
import StepTwo from './stepTwo'
import useCreateCompany from './useCreateCompany'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
    createCompany,
    setValue
  } = useCreateCompany()

  const queryClient = useQueryClient()

  const handleGoNextStep = () => {
    const currentIndex = options.findIndex(option => option.value === step.value)
    if (currentIndex < options.length - 1) {
      setStep(options[currentIndex + 1])
    }
  }
  const handleGoPrevStep = () => {
    const currentIndex = options.findIndex(option => option.step === step.step)
    if (currentIndex > 0) {
      setStep(options[currentIndex - 1])
    }
  }

  const createCompanyMutation = useMutation(() => createCompany('', companyValues), {
    onSuccess: () => {
      queryClient.invalidateQueries(['profileInfo'])
    }
  })

  console.log(companyValues, 'companyValues')

  const onSubmit = () => {
    createCompanyMutation.mutate(companyValues)
  }

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
      >
        {step.step === 1 && <StepOne control={control} errors={errors} clearErrors={clearErrors} />}
        {step.step === 2 && (
          <StepTwo
            control={control}
            addressFields={addressFields}
            appendAddress={appendAddress}
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
