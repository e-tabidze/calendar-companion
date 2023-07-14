import { DefaultInput, MultilineInput } from 'src/views/components/input'
import SelectField from 'src/views/components/selectField'
import ImagesInput from './imagesInput'

const StepOne = () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]
  
  return (
    <div>
      <div className='grid gap-4 grid-cold-1 large:grid-cols-2'>
        <DefaultInput label='ვინ კოდი' value='' onChange={(e: any) => console.log(e)} />
        <DefaultInput label='სახელმწიფო ნომერი' value='' onChange={(e: any) => console.log(e)} />
        <SelectField placeholder='sdfghjk' options={options} disabled={false} />
        <SelectField placeholder='sdfghjk' options={options} disabled={false} />
        <SelectField placeholder='sdfghjk' options={options} disabled={false} />
        <SelectField placeholder='sdfghjk' options={options} disabled={false} />
      </div>
      <div className='grid grid-cols-1 gap-4 mt-4'>
        <MultilineInput placeholder='დამატებითი ინფორმაცია' rows={4} />
        <MultilineInput placeholder='გამოყენების ინსტრუქცია' rows={4} />
      </div>
      <div className='flex flex-wrap gap-2 mt-4'>
        <ImagesInput
          label='ავტომობილის ფოტოები'
          infoText='(მაქს. ზომა 10 მბ, JPG, PNG, SVG)'
          icon
          bg='bg-green-10'
        />
      </div>
    </div>
  )
}

export default StepOne
