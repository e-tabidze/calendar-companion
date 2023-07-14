import { JSXElementConstructor, ReactElement, useState } from 'react'
import { IconTextButton } from 'src/views/components/button'
import { DefaultInput } from 'src/views/components/input'

const   StepThree = () => {
  const [phoneNumberComponents, setPhoneNumberComponents] = useState<any>([
    <DefaultInput label='მობილურის ნომერი' key={Math.random()} />
  ])

  const addComponent = () => {
    setPhoneNumberComponents([
      ...phoneNumberComponents,
      <DefaultInput label='მობილურის ნომერი' index={phoneNumberComponents.length + 1} key={Math.random()} />
    ])
  }

  return (
    <div className='grid grid-cols-1 gap-2'>
      <DefaultInput label='ელ. ფოსტა' />
      <DefaultInput label='ოფისი ნომერი' />
      <DefaultInput label='ფაქსი' />
      {phoneNumberComponents.map((component: ReactElement<any, string | JSXElementConstructor<any>>, index: number) => (
        <div key={index}>{component}</div>
      ))}
      <IconTextButton label='სხვა  ნომრის  დამატება' icon='/icons/add.svg' onClick={addComponent} />
    </div>
  )
}

export default StepThree
