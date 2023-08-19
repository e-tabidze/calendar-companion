import { useRouter } from 'next/router'
import { useState } from 'react'
import NewListingLayout from 'src/layouts/NewListingLayout'
import HOC from 'src/hoc'
import StepOne from './stepOne'
import StepThree from './stepThree'
import StepTwo from './stepTwo'
import useCreateCompany from './useCreateCompany'
import { FormProvider } from 'react-hook-form'
import { createCompany } from 'src/store/apps/companies'
import Cookie from 'src/helpers/Cookie'
import { Company } from 'src/types/Company'

const NewCompany = () => {
  const options = [
    { value: '1/3 ნაბიჯი', label: 'კომპანიის დამატება', step: 1 },
    { value: '2/3 ნაბიჯი', label: 'მისამართები და სამუშაო საათები', step: 2 },
    { value: '3/3 ნაბიჯი', label: 'მისამართები და სამუშაო საათები', step: 3 }
  ]
  const [step, setStep] = useState(options[0])

  const router = useRouter()

  const { control, handleSubmit, errors, dispatch, companyValues, dirtyFields, resetField, setError, clearErrors } =
    useCreateCompany()

  const selectOption = (option: any) => {
    setStep(option)
  }

  const handleGoNextStep = () => {
    const currentIndex = options.findIndex(option => option === step)
    if (currentIndex < options.length - 1) {
      setStep(options[currentIndex + 1])
    }
  }

  const handleGoPrevStep = () => {
    const currentIndex = options.findIndex(option => option === step)
    if (currentIndex > 0) {
      setStep(options[currentIndex - 1])
    }
  }

  const handleClose = () => {
    router.push('/profile/orders/')
  }

  const onSubmit = async () => {
    try {
      // const company: Company = {
      //   identification_number: companyValues.identification_number,
      //   company_type_id: 1,
      //   company_information: {
      //     name: companyValues.name,
      //     description: companyValues.description,
      //     logo: companyValues.logo,
      //     address: companyValues.address
      //   }
      // }
      console.log(companyValues, 'companyValues')
      // await dispatch(createCompany({ AccessToken: Cookie.get('AccessToken'), company: companyValues }))
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  // const RenderStepOne = HOC<StepOneProps>(StepOne, step.step === 1)
  // const RenderStepTwo = HOC(StepTwo, step.step === 2)
  // const RenderStepThree = HOC(StepThree, step.step === 3)

  return (
    <FormProvider {...control}>
      <NewListingLayout
        options={options}
        onChange={selectOption}
        selectedOption={step}
        onNextStep={handleGoNextStep}
        onPrevStep={handleGoPrevStep}
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <RenderStepOne control={control} />
      <RenderStepTwo />
      <RenderStepThree /> */}
        {step.step === 1 && <StepOne control={control} errors={errors} clearErrors={clearErrors} />}
        {step.step === 2 && <StepTwo control={control} errors={errors} />}
        {step.step === 3 && <StepThree control={control} errors={errors} />}
      </NewListingLayout>
    </FormProvider>
  )
}

export default NewCompany
