import { useState } from 'react'
import { useRouter } from 'next/router'
import NewListingLayout from 'src/layouts/NewListingLayout'
import StepOne from './stepOne'
import StepThree from './stepThree'
import StepTwo from './stepTwo'
import { FormProvider } from 'react-hook-form'
import { createCompany } from 'src/store/apps/companies'
import Cookie from 'src/helpers/Cookie'
import useCreateCompany from './useCreateCompany'

const NewCompany = () => {
  const options = [
    { value: '1/3 ნაბიჯი', label: 'კომპანიის დამატება', step: 1 },
    { value: '2/3 ნაბიჯი', label: 'მისამართები და სამუშაო საათები', step: 2 },
    { value: '3/3 ნაბიჯი', label: 'მისამართები და სამუშაო საათები', step: 3 }
  ]
  const [step, setStep] = useState(options[0])

  const router = useRouter()

  const handleClose = () => router.push('/profile/orders/')

  const {
    control,
    handleSubmit,
    errors,
    dispatch,
    companyValues,
    clearErrors,
    addressFields,
    appendAddress
  } = useCreateCompany()

  const selectOption = (option: any) => setStep(option)

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

  const onSubmit = async () => {
    try {
      companyValues.addresses.forEach(
        (addr: {
          isSameTime: boolean
          working_hours: {
            [x: string]: {
              isSelected: boolean
              endTime: string
              startTime: string
            }
          }
        }) => {
          if (addr.isSameTime) {
            const takeDefaultTime = {
              startTime: addr.working_hours['monday'].startTime,
              endTime: addr.working_hours['monday'].endTime
            }

            for (const day in addr.working_hours) {
              addr.working_hours[day].startTime = ''
              addr.working_hours[day].endTime = ''
              if (addr.working_hours[day].isSelected) {
                addr.working_hours[day].startTime = takeDefaultTime.startTime
                addr.working_hours[day].endTime = takeDefaultTime.endTime
                addr.working_hours[day].isSelected = true
              } else {
                addr.working_hours[day].isSelected = false
              }
            }
          }
        }
      )

      console.log(companyValues, 'companyValues')
      await dispatch(createCompany({ AccessToken: Cookie.get('AccessToken'), company: companyValues }))
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (

    // @ts-ignore
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
        <form>
          {step.step === 1 && <StepOne control={control} errors={errors} clearErrors={clearErrors} />}
          {step.step === 2 && <StepTwo control={control} addressFields={addressFields} appendAddress={appendAddress} errors={errors} />}
          {step.step === 3 && <StepThree control={control} errors={errors} />}
        </form>
      </NewListingLayout>
    </FormProvider>
  )
}

export default NewCompany
