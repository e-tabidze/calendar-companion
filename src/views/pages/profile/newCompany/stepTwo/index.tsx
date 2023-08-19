import { useState } from 'react'
import { IconTextButton } from 'src/views/components/button'
import BranchInfoComponent from './branchInfoComponent'

interface Props {
  control: any
  errors: any
}

const StepTwo: React.FC<Props> = ({ control, errors }) => {
  const [companyInfoComponents, setCompanyInfoComponents] = useState<number[]>([0])

  const addComponent = () => {
    setCompanyInfoComponents(prevComponents => [...prevComponents, prevComponents.length])
  }

  return (
    <form>
      <div className='mb-48'>
        {companyInfoComponents.map(index => (
          <BranchInfoComponent key={index} index={index} control={control} errors={errors} />
        ))}
        <IconTextButton label='სხვა  მისამართის დამატება' icon='/icons/add.svg' onClick={addComponent} />
      </div>
    </form>
  )
}

export default StepTwo
