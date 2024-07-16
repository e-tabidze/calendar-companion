import { IconTextButton } from 'src/views/components/button'
import useCreateCompany from '../useCreateCompany'
import BranchInfoComponent from './branchInfoComponent'
import { useTranslation } from 'next-i18next'

interface Props {
  control: any
  addressFields: any
  appendAddress: any
  errors: any
  setValue: any
  removeAddress: any
}

const StepTwo: React.FC<Props> = ({ control, addressFields, appendAddress, errors, setValue, removeAddress }) => {
  const { defaultAddress } = useCreateCompany()
  const { t } = useTranslation()

  return (
    <>
      {addressFields.map((field: any, index: number) => (
        <BranchInfoComponent
          index={index}
          control={control}
          key={field.id}
          errors={errors}
          setValue={setValue}
          removeAddress={removeAddress}
        />
      ))}

      <IconTextButton
        label={t('add_other_address')}
        icon='add'
        width={20}
        className='my-6'
        height={20}
        onClick={() => appendAddress(defaultAddress)}
        type='button'
      />
    </>
  )
}

export default StepTwo
