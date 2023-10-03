import { useState } from 'react'
import HOC from 'src/hoc'
import NewListingLayout from 'src/layouts/NewListingLayout'
import StepOne from 'src/views/pages/dashboard/newListing/stepOne'
import StepThree from 'src/views/pages/dashboard/newListing/stepThree'
import StepTwo from 'src/views/pages/dashboard/newListing/stepTwo'
import StepFour from 'src/views/pages/dashboard/newListing/stepFour'
import StepFive from 'src/views/pages/dashboard/newListing/stepFive'
import StepSix from 'src/views/pages/dashboard/newListing/stepSix'
import StepSeven from 'src/views/pages/dashboard/newListing/stepSeven'
import { useRouter } from 'next/router'

const options = [
  { value: '1/7 ნაბიჯი', label: 'ავტომობილის შესახებ', step: 1 },
  { value: '2/7 ნაბიჯი', label: 'ავტომობილის პარამეტრები', step: 2 },
  { value: '3/7 ნაბიჯი', label: 'ფასები და ფასდაკლება', step: 3 },
  { value: '4/7 ნაბიჯი', label: 'სერვისები', step: 4 },
  { value: '5/7 ნაბიჯი', label: 'ჯავშნის მიღების პირობები', step: 5 },
  { value: '6/7 ნაბიჯი', label: 'ადგილმდებარეობა', step: 6 },
  { value: '7/7 ნაბიჯი', label: 'ადგილმდებარეობა', step: 7 }
]

interface Props1 {
  prop1: any
}

interface Props2 {
  prop2: any
}

const NewListing: React.FC = () => {
  const router = useRouter()
  const [step, setStep] = useState(options[0])

  const RenderStepOne = HOC<Props1>(StepOne, step.step === 1)
  const RenderStepTwo = HOC<Props2>(StepTwo, step.step === 2)
  const RenderStepThree = HOC<Props2>(StepThree, step.step === 3)
  const RenderStepFour = HOC<Props2>(StepFour, step.step === 4)
  const RenderStepFive = HOC<Props2>(StepFive, step.step === 5)
  const RenderStepSix = HOC<Props2>(StepSix, step.step === 6)
  const RenderStepSeven = HOC<Props2>(StepSeven, step.step === 7)

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
    router.push('/dashboard/dashboard')
  }

  return (
    
    // @ts-ignore
    <NewListingLayout
      options={options}
      onChange={selectOption}
      selectedOption={step}
      onNextStep={handleGoNextStep}
      onPrevStep={handleGoPrevStep}
      onClose={handleClose}
    >
      <RenderStepOne prop1='Prop 1' />
      <RenderStepTwo prop2='Prop 2' />
      <RenderStepThree prop2='Prop 2' />
      <RenderStepFour prop2='Prop 2' />
      <RenderStepFive prop2='Prop 2' />
      <RenderStepSix prop2='Prop 2' />
      <RenderStepSeven prop2='Prop 2' />
    </NewListingLayout>
  )
}

export default NewListing
