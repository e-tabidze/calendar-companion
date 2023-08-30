import { IconTextButton } from 'src/views/components/button'
import BranchInfoComponent from './branchInfoComponent'

interface Props {
  control: any
  addressFields: any
  appendAddress: any
  errors: any
}

const StepTwo: React.FC<Props> = ({ control, addressFields, appendAddress, errors }) => {
  return (
    <div>
      {addressFields.map((field: any, index: number) => (
        <BranchInfoComponent index={index} control={control} key={field.id} errors={errors} />
      ))}
      <IconTextButton
        label='სხვა  მისამართის დამატება'
        icon='/icons/add.svg'
        onClick={() => {
          appendAddress({
            address: '',
            city: '',
            state: '',
            postal_code: '',
            working_hours: {}
          })
        }}
        type='button'
      />
    </div>
  )
}

export default StepTwo
