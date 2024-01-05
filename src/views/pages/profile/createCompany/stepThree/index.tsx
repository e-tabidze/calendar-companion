import { DefaultInput } from 'src/views/components/input'

interface Props {
  control: any
  errors: any
}

const StepThree: React.FC<Props> = ({ control, errors }) => {
  
  return (
    <div className='md:w-100'>
      <div className='grid grid-cols-1 gap-2'>
        <DefaultInput label='ელ. ფოსტა' control={control} errors={errors} name='company_information.email' />
        <DefaultInput
          label='ოფისის ნომერი'
          control={control}
          errors={errors}
          name='company_information.phone_numbers'
        />
      </div>
    </div>
  )
}

export default StepThree
