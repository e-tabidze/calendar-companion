import { useForm } from 'react-hook-form'
import { DefaultInput } from 'src/views/components/input'
import SelectField from 'src/views/components/selectField'
import ImagesInput from './imagesInput'

const StepOne = () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]

  const { control } = useForm()

  return (
    <div>
      <div className='grid gap-4 grid-cold-1 large:grid-cols-2'>
        <DefaultInput name='' control={control} errors={''} label='ვინ კოდი' />
        <DefaultInput name='' control={control} errors={''} label='სახელმწიფო ნომერი' />
        <SelectField name='name' control={control} placeholder='select' options={options} disabled={false} />
        <SelectField name='name' control={control} placeholder='select' options={options} disabled={false} />
        <SelectField name='name' control={control} placeholder='select' options={options} disabled={false} />
        <SelectField name='name' control={control} placeholder='select' options={options} disabled={false} />
      </div>
      <div className='grid grid-cols-1 gap-4 mt-4'>
        <DefaultInput name='' control={control} errors={''} label='დამატებითი ინფორმაცია' rows={4} />
        <DefaultInput name='' control={control} errors={''} label='გამოყენების ინსტრუქცია' rows={4} />
      </div>
      <div className='flex flex-wrap gap-2 mt-4'>
        <ImagesInput label='ავტომობილის ფოტოები' infoText='(მაქს. ზომა 10 მბ, JPG, PNG, SVG)' icon bg='bg-green-10' />
      </div>
    </div>
  )
}

export default StepOne
