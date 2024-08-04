import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import useGettingStarted from './useGettingStarted'
import StepOne from './stepOne'
import ProgressBar from './progressBar'
import StepTwo from './stepTwo'
import { useState } from 'react'
import StepThree from './stepThree'
import { useMutation } from '@tanstack/react-query'

const GettingStartedPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const { gettingStartedControl, errors, gettingStartedValues, putUsers, userData } = useGettingStarted()

  const goNextStep = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, 5))
  }

  console.log(gettingStartedValues, 'gettingStartedValues')

  const putUsersMutation = useMutation(
    () => {
      return putUsers('', userData.id, gettingStartedValues)
    },
    {
      onSuccess: () => {
        setCurrentStep(3)
      },
      onError: (response: any) => {
        if (response.response.status === 400 && response.response.data.result.message === 'User Already Exists') {
          console.log('User Already Exists')
        }
      }
    }
  )

  const onSubmit = () => {
    putUsersMutation.mutate(gettingStartedValues)
  }

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <StepOne control={gettingStartedControl} errors={errors} goNextStep={goNextStep} />
      case 2:
        return <StepTwo control={gettingStartedControl} errors={errors} goNextStep={goNextStep} onSubmit={onSubmit} />
      case 2:
        return <StepThree control={gettingStartedControl} errors={errors} goNextStep={goNextStep} />
      default:
        return null
    }
  }

  return (
    <UnauthorizedLayout>
      <div className='h-[calc(100%-50px)]'>
        <ProgressBar currentStep={currentStep} totalSteps={5} />
        {renderStepComponent()}
      </div>
    </UnauthorizedLayout>
  )
}

export default GettingStartedPage
