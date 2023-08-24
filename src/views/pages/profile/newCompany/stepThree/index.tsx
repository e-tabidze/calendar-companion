import { JSXElementConstructor, ReactElement, useState } from 'react'
import { IconTextButton } from 'src/views/components/button'
import { DefaultInput } from 'src/views/components/input'

interface Props {
  control: any
  errors: any
  mobileFields: any
  appendMobile: any
}

const StepThree: React.FC<Props> = ({ control, errors, mobileFields, appendMobile }) => {
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
    <div>
      <div className='grid grid-cols-1 gap-2'>
        <DefaultInput label='ელ. ფოსტა' control={control} errors={errors} name='company_information.contact.email' />
        <DefaultInput
          label='ოფისი ნომერი'
          control={control}
          errors={errors}
          name='company_information.contact.officeNumber'
        />
        {mobileFields.map((field: any, index: number) => (
          <DefaultInput
            label='მობილურის ნომერი'
            index={index}
            control={control}
            errors={errors}
            key={field.id}
            name={`company_information.contact.mobile.${index}`}
          />
        ))}
        <IconTextButton
          label='სხვა  ნომრის  დამატება'
          icon='/icons/add.svg'
          onClick={() => {
            appendMobile({
              mobile: ''
            })
          }}
        />
      </div>
    </div>
  )
}

export default StepThree
