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
import { Company, CompanyAddress } from 'src/types/Company'

const NewCompany = () => {
  const options = [
    { value: '1/3 ნაბიჯი', label: 'კომპანიის დამატება', step: 1 },
    { value: '2/3 ნაბიჯი', label: 'მისამართები და სამუშაო საათები', step: 2 },
    { value: '3/3 ნაბიჯი', label: 'მისამართები და სამუშაო საათები', step: 3 }
  ]
  const [step, setStep] = useState(options[0])

  const router = useRouter()

  const {
    control,
    handleSubmit,
    errors,
    dispatch,
    companyValues,
    dirtyFields,
    resetField,
    setError,
    clearErrors,
    setValue
  } = useCreateCompany()

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

  //   "address": [
  //     {
  //       "address": "123 Main Street, Suite 101",
  //       "city": "Cityville",
  //       "state": "ST",
  //       "postal_code": "12345",
  //       "working_hours": {
  //         "monday": "9:00 AM - 5:00 PM",
  //         "tuesday": "9:00 AM - 5:00 PM",
  //         "wednesday": "9:00 AM - 5:00 PM",
  //         "thursday": "9:00 AM - 5:00 PM",
  //         "friday": "9:00 AM - 5:00 PM"
  //       }
  //     },
  //     {
  //       "address": "456 Elm Avenue, Suite 202",
  //       "city": "Townsville",
  //       "state": "ST",
  //       "postal_code": "67890",
  //       "working_hours": {
  //         "monday": "10:00 AM - 6:00 PM",
  //         "tuesday": "10:00 AM - 6:00 PM",
  //         "wednesday": "10:00 AM - 6:00 PM",
  //         "thursday": "10:00 AM - 6:00 PM",
  //         "friday": "10:00 AM - 6:00 PM"
  //       }
  //     }
  //   ]

  const onSubmit = async () => {
    try {
      // const company: Company = {
      //   identification_number: companyValues.identification_number,
      //   company_type_id: 1,
      //   company_information: {
      //     name: companyValues.name,
      //     description: companyValues.description,
      //     logo: companyValues.logo,
      //     // @ts-ignore
      //     address: workingHours
      //     // address: companyValues.address.map((address: CompanyAddress) => ({
      //     //   ...address,
      //     //   working_hours: workingHours // Assign the generated working hours object
      //     // }))
      //   }
      // }
      console.log(companyValues, 'companyValues')
      await dispatch(createCompany({ AccessToken: Cookie.get('AccessToken'), company: companyValues }))
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
        <form>
          {step.step === 1 && <StepOne control={control} errors={errors} clearErrors={clearErrors} />}
          {step.step === 2 && <StepTwo control={control} />}
          {step.step === 3 && <StepThree control={control} errors={errors} />}
        </form>
      </NewListingLayout>
    </FormProvider>
  )
}

export default NewCompany
