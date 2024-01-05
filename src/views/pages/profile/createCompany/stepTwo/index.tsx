import { IconTextButton } from 'src/views/components/button'
import useCreateCompany from '../useCreateCompany'
import BranchInfoComponent from './branchInfoComponent'

interface Props {
  control: any
  addressFields: any
  appendAddress: any
  errors: any
  setValue: any
}

const StepTwo: React.FC<Props> = ({ control, addressFields, appendAddress, errors, setValue }) => {
  const { defaultAddress } = useCreateCompany()

  return (
    <>
      {addressFields.map((field: any, index: number) => (
        <BranchInfoComponent index={index} control={control} key={field.id} errors={errors} setValue={setValue} />
      ))}

      <IconTextButton
        label='სხვა  მისამართის დამატება'
        icon='add'
        width={20}
        className ='my-6'
        height={20}
        onClick={() => {
          appendAddress(defaultAddress)
        }}
        type='button'
      />
    </>
  )
}

export default StepTwo
