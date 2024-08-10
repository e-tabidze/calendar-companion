interface Props {
  currentStep: number
  totalSteps: number
}

const ProgressBar: React.FC<Props> = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1)

  return (
    <div className='flex space-x-2'>
      {steps.map(step => (
        <div key={step} className={`h-1 rounded-[33px] w-full ${step <= currentStep ? 'bg-primary-100' : 'bg-primary-15'}`} />
      ))}
    </div>
  )
}

export default ProgressBar
