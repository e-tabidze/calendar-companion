import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import useGettingStarted from './useGettingStarted'

const GettingStartedPage = () => {
  const { userData } = useGettingStarted()

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

  return <UnauthorizedLayout>Getting started</UnauthorizedLayout>
}

export default GettingStartedPage
