import { DefaultInput } from 'src/views/components/input'

interface Props {
  control: any
  passwordErrors: object
}

const PasswordForm: React.FC<Props> = ({ control, passwordErrors }) => {

  return (
    <div className='grid grid-cols-1 gap-2 my-10 max-w-[400px]'>
      <DefaultInput
        type='password'
        label='არსებული პაროლი'
        control={control}
        name='current_password'
        errors={passwordErrors}
      />
      <DefaultInput type='password' label='ახალი პაროლი' control={control} name='password' errors={passwordErrors} />
      <DefaultInput
        type='password'
        label='გაიმეორე ახალი პაროლი'
        control={control}
        name='confirm_password'
        errors={passwordErrors}
      />
    </div>
  )
}

export default PasswordForm
