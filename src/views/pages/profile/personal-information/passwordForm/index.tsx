import { DefaultInput } from 'src/views/components/input'
import {useTranslation} from "next-i18next";

interface Props {
  control: any
  passwordErrors: object
}

const PasswordForm: React.FC<Props> = ({ control, passwordErrors }) => {
    const {t} = useTranslation()

  return (
    <div className='grid grid-cols-1 gap-2 my-10 max-w-[400px]'>
      <DefaultInput
        type='password'
        label={t('current_password')}
        control={control}
        name='current_password'
        errors={passwordErrors}
      />
      <DefaultInput type='password' label={t('new_password')} control={control} name='password' errors={passwordErrors} />
      <DefaultInput
        type='password'
        label={t('confirm_password')}
        control={control}
        name='confirm_password'
        errors={passwordErrors}
      />
    </div>
  )
}

export default PasswordForm
