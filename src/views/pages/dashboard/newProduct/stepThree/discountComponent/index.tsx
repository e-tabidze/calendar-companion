import { Controller, useForm } from 'react-hook-form'
import { DefaultInput } from 'src/views/components/input'
import NumberInputWithSelect from 'src/views/components/numberInputWithSelect'

interface Props {
  index: number
  options: any[]
  control: any
  name: string
}
const DiscountComponent: React.FC<Props> = ({ index, options, control, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className='flex items-center gap-3 my-3' key={index}>
          <div className='w-5'> {index}. </div>
          <NumberInputWithSelect options={options} onChange={() => console.log('change')} name='' control={control} />
          <DefaultInput
            label='ფასდაკლება'
            className='text-center'
            control={control}
            name={`discount.discount_item.${index}.amount`}
            errors={''}
          />
        </div>
      )}
    />
  )
}

export default DiscountComponent
