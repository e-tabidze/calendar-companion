import { IconTextButton } from 'src/views/components/button'
import useCreateCompany from '../useCreateCompany'
import BranchInfoComponent from './branchInfoComponent'

interface Props {
  control: any
  addressFields: any
  appendAddress: any
  errors: any
}

const StepTwo: React.FC<Props> = ({ control, addressFields, appendAddress, errors }) => {
  const { defaultAddress } = useCreateCompany()
  return (
    <div>
      {addressFields.map((field: any, index: number) => (
        <BranchInfoComponent index={index} control={control} key={field.id} errors={errors} />
      ))}

      <IconTextButton
        label='სხვა  მისამართის დამატება'
        icon='/icons/add.svg'
        onClick={() => {
          appendAddress(defaultAddress)
        }}
        type='button'
      />
    </div>
  )
}

export default StepTwo
