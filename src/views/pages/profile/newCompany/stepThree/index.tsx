import { IconTextButton } from 'src/views/components/button'
import { DefaultInput } from 'src/views/components/input'

interface Props {
  control: any
  errors: any
  phoneFields: any
  appendPhone: any
}

const StepThree: React.FC<Props> = ({ control, errors, phoneFields, appendPhone }) => {
  return (
    <div>
      <div className='grid grid-cols-1 gap-2'>
        <DefaultInput
          label='ელ. ფოსტა'
          control={control}
          errors={errors}
          name='company_information.contactInformation.email'
        />
        {/* {phoneFields.map((field: any, index: number = 1) => (
          <DefaultInput
            label='მობილურის ნომერი'
            index={index}
            control={control}
            errors={errors}
            key={field.id}
            name={`company_information.contactInformation.phoneNumbers.${index}.mobile`}
          />
        ))} */}
        <IconTextButton
          label='სხვა  ნომრის  დამატება'
          icon='/icons/add.svg'
          onClick={() => {
            appendPhone({
              mobile: ''
            })
          }}
        />
      </div>
    </div>
  )
}

export default StepThree
