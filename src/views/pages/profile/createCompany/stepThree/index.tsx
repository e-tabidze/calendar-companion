import { DefaultInput } from 'src/views/components/input'

interface Props {
  control: any
  errors: any
}

const StepThree: React.FC<Props> = ({ control, errors }) => {
  
  return (
    <div className='grid'>
      <div className='grid grid-cols-1 gap-2 md:min-w-[400px] min-w-[320px]'>
        <DefaultInput label='ელ. ფოსტა' control={control} errors={errors} name='company_information.email' className='w-full' />
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
