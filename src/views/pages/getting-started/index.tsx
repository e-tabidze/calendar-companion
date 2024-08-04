import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import useGettingStarted from './useGettingStarted'
import StepOne from './stepOne'
import ProgressBar from './progressBar'
import StepTwo from './stepTwo'

const GettingStartedPage = () => {
  const { control, errors, userData } = useGettingStarted()

  console.log(userData, 'userData')

  const renderStepComponent = () => {
    // switch (step.step) {
    //   case 1:
    //     return <StepOne control={control} errors={errors} clearErrors={clearErrors} setValue={setValue} />
    //   case 2:
    //     return (
    //       <StepTwo
    //         control={control}
    //         addressFields={addressFields}
    //         appendAddress={appendAddress}
    //         removeAddress={removeAddress}
    //         errors={errors}
    //         setValue={setValue}
    //       />
    //     )
    //   case 3:
    //     return <StepThree control={control} errors={errors} />
    //   default:
    //     return null
    // }
  }

  return (
    <UnauthorizedLayout>
      <div className='h-[calc(100%-50px)]'>
        <ProgressBar currentStep={2} totalSteps={5} />
        {/* <StepOne control={control} errors={errors} /> */}
        <StepTwo control={control} errors={errors} />
      </div>
    </UnauthorizedLayout>
  )
}

export default GettingStartedPage
