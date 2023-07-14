import FileUpload from 'src/views/components/fileUpload'
import { DefaultInput, MultilineInput } from 'src/views/components/input'

const StepOne = () => {
  return (
    <div>
      <div className='grid grid-cols-2 gap-2 my-5'>
        <DefaultInput label='საიდენტიფიკაციო კოდი' />
        <DefaultInput label='შპს ბედინა პლიუსი' />
        <DefaultInput label='კომპანიის დასახელება' className='col-span-2' />
        <MultilineInput label='აღწერა' rows={4} className="col-span-2" />
      </div>
      <FileUpload title='კომპანიის ლოგო' description='(მაქს. ზომა 10 მბ, JPG, PNG, SVG)' />
    </div>
  )
}

export default StepOne
