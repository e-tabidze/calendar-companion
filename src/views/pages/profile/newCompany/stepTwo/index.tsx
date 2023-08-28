import { IconTextButton } from 'src/views/components/button'
import BranchInfoComponent from './branchInfoComponent'

interface Props {
  control: any
  addressFields: any
  appendAddress: any
}

const StepTwo: React.FC<Props> = ({ control, addressFields, appendAddress }) => {
  return (
    <div>
      {addressFields.map((field: any, index: number) => (
        <BranchInfoComponent index={index} control={control} key={field.id} />
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
