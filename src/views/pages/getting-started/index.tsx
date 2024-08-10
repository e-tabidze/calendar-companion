import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import useGettingStarted from './useGettingStarted'
import StepOne from './stepOne'
import ProgressBar from './progressBar'
import StepTwo from './stepTwo'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import useUserData from 'src/hooks/useUserData'
import { handleUserRedirection } from 'src/utils/handleUserRedirection'

const GettingStartedPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const { userData } = useUserData()
  const { control, errors, gettingStartedValues, putUsers } = useGettingStarted(userData)

  const goNextStep = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, 5))
  }

  const router = useRouter()

  const putUsersMutation = useMutation(
    () => {
      return putUsers('', userData.id, gettingStartedValues)
    },
    {
      onSuccess: () => {
        // handleUserRedirection(userData, router)
        router.push('/workspace')
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
        return <StepOne control={control} errors={errors} goNextStep={goNextStep} />
      case 2:
        return <StepTwo control={control} onSubmit={onSubmit} />
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
