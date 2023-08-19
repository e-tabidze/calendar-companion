import { JSXElementConstructor, ReactElement, useState } from 'react'
import { IconTextButton } from 'src/views/components/button'
import { DefaultInput } from 'src/views/components/input'

interface Props {
  control: any
  errors: any
}

const StepThree: React.FC<Props> = ({ control, errors }) => {
  const [phoneNumberComponents, setPhoneNumberComponents] = useState<any>([
    <DefaultInput label='მობილურის ნომერი' key={Math.random()} control={control} errors={errors} name='mobile' />
  ])

  const addComponent = () => {
    setPhoneNumberComponents([
      ...phoneNumberComponents,
      <DefaultInput
        label='მობილურის ნომერი'
        index={phoneNumberComponents.length + 1}
        key={Math.random()}
        control={control}
        errors={errors}
        name='mobile1'
      />
    ])
  }

  return (
    <form>
      <div className='grid grid-cols-1 gap-2'>
        <DefaultInput label='ელ. ფოსტა' control={control} errors={errors} name='email' />
        <DefaultInput label='ოფისი ნომერი' control={control} errors={errors} name='officePhone' />
        <DefaultInput label='ფაქსი' control={control} errors={errors} name='fax' />
        {phoneNumberComponents.map(
          (component: ReactElement<any, string | JSXElementConstructor<any>>, index: number) => (
            <div key={index}>{component}</div>
          )
        )}
        <IconTextButton label='სხვა  ნომრის  დამატება' icon='/icons/add.svg' onClick={addComponent} />
      </div>
    </form>
  )
}

export default StepThree
