import { useState } from 'react'
import { IconTextButton } from 'src/views/components/button'
import BranchInfoComponent from './branchInfoComponent'

const StepTwo = () => {
  const [companyInfoComponents, setCompanyInfoComponents] = useState<any>([<BranchInfoComponent key={Math.random()} />])

  const addComponent = () => {
    setCompanyInfoComponents([...companyInfoComponents, <BranchInfoComponent key={Math.random()} />])
  }
  
  return (
    <div className='mb-48'>
      <div>{companyInfoComponents.map((component: any) => component)}</div>
      <IconTextButton label='სხვა  მისამართის დამატება' icon='/icons/add.svg' onClick={addComponent} />
    </div>
  )
}

export default StepTwo
