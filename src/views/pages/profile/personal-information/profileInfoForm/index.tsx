import { Controller } from 'react-hook-form'
import { DefaultInput } from 'src/views/components/input'
import Radio from 'src/views/components/radio'
import Typography from 'src/views/components/typography'
import DateDropdown from '../../../../components/dateDropdown'
import {useTranslation} from "next-i18next";

interface Props {
  control: any
  errors: object
}

const ProfileInfoForm: React.FC<Props> = ({ control, errors }) => {
  const options = [
    { label: 'მამრობითი', value: 1 },
    { label: 'მდედრობითი', value: 0 }
  ]
  const {t} = useTranslation()

  return (
    <div>
      <Typography type='body' className='my-10'>
        {t('booking_notice')}
      </Typography>
      <Typography type='body'>{t('select_sex')}</Typography>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 mb-10'>
        <Controller
          name='gender'
          control={control}
          render={({ field }) => (
            <Radio options={options} control={control} color='bg-orange-100 hover:bg-orange-110 transition-all' name={field.name} horizontal />
          )}
        />
        <div></div>
        <DefaultInput control={control} name='first_name' errors={errors} label={t('first_name')} />
        <DefaultInput control={control} name='last_name' errors={errors} label={t('last_name')} />
        <DefaultInput control={control} name='identification_number' errors={errors} label={t('personal_id')} />
        <DefaultInput control={control} name='phone' errors={errors} label={t('mobile_number')} />
        <DefaultInput control={control} name='Email' errors={errors} label={t('e_mail')} disabled />
        <DateDropdown label={t('dob')} name='birth_date' control={control} errors={errors} />
        <DateDropdown label={t('driver_licence_exp_date')} name='driver_license_expiration' control={control} errors={errors} />
      </div>
    </div>
  )
}

export default ProfileInfoForm
