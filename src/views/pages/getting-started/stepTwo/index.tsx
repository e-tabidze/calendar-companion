import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'
import Options from './options'
import SelectField from 'src/views/components/selectField'

interface Props {
  control: any
  onSubmit: () => void
}

const StepTwo: React.FC<Props> = ({ control, onSubmit }) => {
  const options_role = [
    { value: 'work', label: 'Work' },
    { value: 'school', label: 'School' },
    { value: 'personal', label: 'Personal' }
  ]

  return (
    <div className='h-full flex flex-col mt-16'>
      <div className='flex flex-col items-center gap-8 pb-8'>
        <div className='text-center lg:mx-9'>
          <Typography type='h1'>What brings you here?</Typography>
          <Typography type='h5' color='light'>
            We'd love to get to know you better so we can improve the product for you!
          </Typography>
        </div>
      </div>

      <div className='flex-1 shrink-0 flex flex-col justify-between'>
        <div className='flex flex-col gap-6'>
          <Options control={control} name='user_information.source' />
          <SelectField
            control={control}
            name='user_information.your_role'
            options={options_role}
            valueKey='value'
            labelKey='label'
            placeholder='What best describes your role?'
          />
          <SelectField
            control={control}
            name='user_information.use_this_app'
            options={options_role}
            valueKey='value'
            labelKey='label'
            placeholder='Whats the main activity you want to use this app?'
          />
        </div>

        <div className='mt-10 flex w-full justify-center'>
          <div className='flex w-full flex-col items-center gap-4 lg:w-[364px]'>
            <DefaultButton text='Next Step' bg='bg-purple-100' className='w-full h-12 rounded-lg' onClick={onSubmit} />
            <DefaultButton text='Skip for now' className='border-none text-raisin-80' onClick={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepTwo
