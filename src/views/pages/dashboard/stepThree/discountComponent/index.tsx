import { DefaultInput } from 'src/views/components/input'
import NumberInputWithSelect from 'src/views/components/numberInputWithSelect'
import {useTranslation} from "next-i18next";

interface Props {
  index: number
  options: any[]
  control: any
  name: string
  errors: any
}
const DiscountComponent: React.FC<Props> = ({ index, options, control, errors }) => {
    const { t } = useTranslation()

  return (
    <div className='flex items-center gap-3 my-3' key={index}>
      <div className='w-5'> {index + 1} .</div>
      <NumberInputWithSelect
        options={options}
        inputName={`discount.${index}.number`}
        selectName={`discount.${index}.period`}
        control={control}
        type="number"
      />
      <DefaultInput
        label={'%' + t('sale')}
        className='text-center'
        control={control}
        name={`discount.${index}.discount_percent`}
        errors={errors}
        type="number"
      />
    </div>
  )
}

export default DiscountComponent
