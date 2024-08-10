import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'
import Options from './options'
import SelectField from 'src/views/components/selectField'
import { useWatch } from 'react-hook-form'
import { SourceType, WorkRole, SchoolRole, CareerOption } from 'src/@core/content/optionEnums'

interface Props {
  control: any
  onSubmit: () => void
}

const StepTwo: React.FC<Props> = ({ control, onSubmit }) => {
  const formState = useWatch({ control })

  // const options_role = [
  //   { value: 'work', label: 'Work' },
  //   { value: 'school', label: 'School' },
  //   { value: 'personal', label: 'Personal' }
  // ]

  // const work_roles = [
  //   { value: 'design', label: 'Design' },
  //   { value: 'product', label: 'Product' },
  //   { value: 'engineering', label: 'Engineering' },
  //   { value: 'marketing', label: 'Marketing' },
  //   { value: 'sales', label: 'Sales' },
  //   { value: 'top_management', label: 'Founder / CEO / Business owner' },
  //   { value: 'hr', label: 'HR / Recruiting' },
  //   { value: 'it', label: 'IT' },
  //   { value: 'consulting', label: 'Consulting / Services' },
  //   { value: 'legal', label: 'Legal' },
  //   { value: 'other', label: 'Other' }
  // ]

  // const school_roles = [
  //   { value: 'teacher', label: 'Teacher' },
  //   { value: 'student', label: 'Student' },
  //   { value: 'administrator', label: 'Administrator' },
  //   { value: 'other', label: 'Other' }
  // ]

  // const career_options = [
  //   { value: 'teacher', label: 'Calendar / Scheduling' },
  //   { value: 'teacher', label: 'Managing meetings' },
  //   { value: 'teacher', label: 'Note taking' },
  //   { value: 'teacher', label: 'Storing recordings' },
  //   { value: 'teacher', label: 'Collaborating' },
  //   { value: 'teacher', label: 'Managing team' },
  //   { value: 'teacher', label: 'Other' }
  // ]

  const options_role = [
    { value: SourceType.WORK, label: 'Work' },
    { value: SourceType.SCHOOL, label: 'School' },
    { value: SourceType.PERSONAL, label: 'Personal' }
  ]

  const work_roles = Object.values(WorkRole).map(role => ({
    value: role,
    label: role.charAt(0).toUpperCase() + role.slice(1).replace(/_/g, ' ')
  }))

  const school_roles = Object.values(SchoolRole).map(role => ({
    value: role,
    label: role.charAt(0).toUpperCase() + role.slice(1).replace(/_/g, ' ')
  }))

  const career_options = Object.values(CareerOption).map(option => ({
    value: option,
    label: option
  }))

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
          <Options control={control} name='user_information.source' options={options_role} />
          <SelectField
            control={control}
            name='user_information.your_role'
            options={
              formState?.user_information?.source === SourceType.WORK
                ? work_roles
                : formState?.user_information?.source === SourceType.SCHOOL
                ? school_roles
                : []
            }
            valueKey='value'
            labelKey='label'
            placeholder='What best describes your role?'
            disabled={
              formState?.user_information?.source?.length === 0 || formState?.user_information?.source === SourceType.PERSONAL
            }
          />
          <SelectField
            control={control}
            name='user_information.use_this_app'
            options={career_options}
            valueKey='value'
            labelKey='label'
            placeholder='Whats the main activity you want to use this app?'
          />
        </div>

        <div className='mt-10 flex w-full justify-center'>
          <div className='flex w-full flex-col items-center gap-4 lg:w-[364px]'>
            <DefaultButton text='Next Step' bg='bg-primary-100' className='w-full h-12 rounded-lg' onClick={onSubmit} />
            <DefaultButton text='Skip for now' className='border-none text-raisin-80' onClick={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepTwo
