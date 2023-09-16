import { useState } from 'react'
import NewListingLayout from 'src/layouts/NewListingLayout'
import StepOne from 'src/views/pages/dashboard/newListing/stepOne'
import StepThree from 'src/views/pages/dashboard/newListing/stepThree'
import StepTwo from 'src/views/pages/dashboard/newListing/stepTwo'
import StepFour from 'src/views/pages/dashboard/newListing/stepFour'
import StepFive from 'src/views/pages/dashboard/newListing/stepFive'
import StepSix from 'src/views/pages/dashboard/newListing/stepSix'
import StepSeven from 'src/views/pages/dashboard/newListing/stepSeven'
import { useRouter } from 'next/router'
import useNewListing from './useNewListing'
import { FormProvider } from 'react-hook-form'

const options = [
  { value: '1/7 ნაბიჯი', label: 'ავტომობილის შესახებ', step: 1 },
  { value: '2/7 ნაბიჯი', label: 'ავტომობილის პარამეტრები', step: 2 },
  { value: '3/7 ნაბიჯი', label: 'ფასები და ფასდაკლება', step: 3 },
  { value: '4/7 ნაბიჯი', label: 'სერვისები', step: 4 },
  { value: '5/7 ნაბიჯი', label: 'ჯავშნის მიღების პირობები', step: 5 },
  { value: '6/7 ნაბიჯი', label: 'ადგილმდებარეობა', step: 6 },
  { value: '7/7 ნაბიჯი', label: 'ადგილმდებარეობა', step: 7 }
]

const NewListing: React.FC = () => {
  const [step, setStep] = useState(options[0])

  const router = useRouter()

  const selectOption = (option: any) => setStep(option)

  const handleClose = () => router.push('/dashboard/dashboard')

  const { control, handleSubmit, errors, clearErrors, newListingValues } = useNewListing()

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
      console.log(newListingValues, 'newListingValues')
    } catch (error) {
      console.error('An error occurred while creating new listing:', error)
    }
  }

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
        <form>
          {step.step === 1 && <StepOne />}
          {step.step === 2 && <StepTwo />}
          {step.step === 3 && <StepThree />}
          {step.step === 4 && <StepFour />}
          {step.step === 5 && <StepFive />}
          {step.step === 6 && <StepSix />}
          {step.step === 7 && <StepSeven />}
        </form>
      </NewListingLayout>
    </FormProvider>
  )
}

export default NewListing
