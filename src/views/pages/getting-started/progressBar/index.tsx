interface Props {
  currentStep: number
  totalSteps: number
}

const ProgressBar: React.FC<Props> = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1)

  return (
    <div className='flex space-x-2'>
      {steps.map(step => (
        <div key={step} className={`h-2 w-full ${step <= currentStep ? 'bg-purple-100' : 'bg-purple-10'}`} />
      ))}
    </div>
  )
}

export default ProgressBar
