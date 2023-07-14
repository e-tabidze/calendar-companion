import { useRouter } from 'next/router'
import { useState } from 'react'
import NewListingLayout from 'src/layouts/NewListingLayout'
import HOC from 'src/hoc'
import StepOne from './stepOne'
import StepThree from './stepThree'
import StepTwo from './stepTwo'

interface Props1 {
  prop1: any
}

const NewCompany = () => {
  const options = [
    { value: '1/3 ნაბიჯი', label: 'კომპანიის დამატება', step: 1 },
    { value: '2/3 ნაბიჯი', label: 'მისამართები და სამუშაო საათები', step: 2 },
    { value: '3/3 ნაბიჯი', label: 'მისამართები და სამუშაო საათები', step: 3 }
  ]
  const [step, setStep] = useState(options[0])

  const router = useRouter()

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

  const RenderStepOne = HOC<Props1>(StepOne, step.step === 1)
  const RenderStepTwo = HOC<Props1>(StepTwo, step.step === 2)
  const RenderStepThree = HOC<Props1>(StepThree, step.step === 3)

  return (
    <NewListingLayout
      options={options}
      onChange={selectOption}
      selectedOption={step}
      onNextStep={handleGoNextStep}
      onPrevStep={handleGoPrevStep}
      onClose={handleClose}
    >
      <RenderStepOne prop1='Prop 1' />
      <RenderStepTwo prop1='Prop 1' />
      <RenderStepThree prop1='Prop 1' />
    </NewListingLayout>
  )
}

export default NewCompany
