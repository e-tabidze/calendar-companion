import { ReactElement, useState } from 'react'
import { Controller } from 'react-hook-form'
import { WorkingHours } from 'src/types/Company'
import { IconTextButton } from 'src/views/components/button'
import BranchInfoComponent from './branchInfoComponent'

interface Props {
  control: any
}

const StepTwo: React.FC<Props> = ({ control }) => {
  const [workingHoursObjects, setWorkingHoursObjects] = useState<WorkingHours[]>([])

  const handleWorkingHoursChange = (index: number, newWorkingHours: WorkingHours) => {
    setWorkingHoursObjects(prevWorkingHours => {
      const updatedWorkingHours = [...prevWorkingHours]
      updatedWorkingHours[index] = newWorkingHours
      return updatedWorkingHours
    })
  }

  console.log(workingHoursObjects, 'workingHoursObjects')

  const generateComponent = (index: number) => (
    <Controller
      key={index}
      control={control}
      name={`company_information.address[${index}]`}
      render={({ field: { value, onChange } }) => (
        <BranchInfoComponent
          index={index}
          workingHoursObject={value}
          onWorkingHoursChange={(newWorkingHours: WorkingHours) => {
            onChange(newWorkingHours)
            handleWorkingHoursChange(index, newWorkingHours)
          }}
        />
      )}
    />
  )

  const [companyInfoComponents, setCompanyInfoComponents] = useState<any>([generateComponent(0)])

  const addComponent = () => {
    const newIndex = companyInfoComponents.length
    const newComponent = generateComponent(newIndex)

    setCompanyInfoComponents([...companyInfoComponents, newComponent])
  }

  return (
    <div className='mb-48'>
      {companyInfoComponents.map((component: ReactElement<any>, index: number) => (
        <div key={index}>{component}</div>
      ))}
      <IconTextButton label='სხვა  მისამართის დამატება' icon='/icons/add.svg' onClick={addComponent} />
    </div>
  )
}

export default StepTwo
