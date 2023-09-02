import { useForm } from 'react-hook-form'
import { DefaultInput } from 'src/views/components/input'
import NumberInputWithSelect from 'src/views/components/numberInputWithSelect'

interface Props {
  index: number
  options: any[]
}
const DiscountComponent: React.FC<Props> = ({ index, options }) => {
  const { control } = useForm()
  return (
    <div className='flex items-center gap-3 my-3' key={index}>
      <div className='w-5'> {index}. </div>
      <NumberInputWithSelect options={options} onChange={() => console.log('change')} />
      <DefaultInput label='ფასდაკლება' className='text-center' control={control} name="" errors={""} />
    </div>
  )
}

export default DiscountComponent
