import { DefaultInput } from 'src/views/components/input'
import NumberInputWithSelect from 'src/views/components/numberInputWithSelect'

interface Props {
  index: number
  options: any[]
  control: any
  name: string
}
const DiscountComponent: React.FC<Props> = ({ index, options, control }) => {
  return (
    <div className='flex items-center gap-3 my-3' key={index}>
      <div className='w-5'> {index + 1} .</div>
      <NumberInputWithSelect
        options={options}
        inputName={`discount.${index}.number`}
        selectName={`discount.${index}.period`}
        control={control}
      />
      <DefaultInput
        label='ფასდაკლება'
        className='text-center'
        control={control}
        name={`discount.${index}.discount_percent`}
        errors={''}
      />
    </div>
  )
}

export default DiscountComponent
