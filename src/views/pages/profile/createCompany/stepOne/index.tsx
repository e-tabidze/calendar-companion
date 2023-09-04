import FileUpload from 'src/views/components/fileUpload'
import { DefaultInput } from 'src/views/components/input'

interface Props {
  control: any
  errors: any
  clearErrors: any
}

const StepOne: React.FC<Props> = ({ control, errors, clearErrors }) => {
  return (
    <div>
      <div className='grid grid-cols-1 pb-6 large:grid-cols-2 gap-2'>
        <DefaultInput
          label='საიდენტიფიკაციო კოდი'
          control={control}
          name='identification_number'
          errors={errors}
          clearErrors={clearErrors}
        />
        <DefaultInput
          label='შპს ბედინა პლიუსი'
          control={control}
          name='company_information.name'
          errors={errors}
          disabled
        />
        <DefaultInput
          label='კომპანიის დასახელება'
          control={control}
          className='large:col-span-2'
          name='company_information.name'
          errors={errors}
        />
        <DefaultInput
          label='აღწერა'
          control={control}
          className='large:col-span-2'
          name='company_information.description'
          rows={4}
          errors={errors}
        />
      </div>
      <FileUpload title='კომპანიის ლოგო' description='(მაქს. ზომა 10 მბ, JPG, PNG, SVG)' />
    </div>
  )
}

export default StepOne
