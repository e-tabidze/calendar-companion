import { DefaultInput } from 'src/views/components/input'
import { useTranslation } from 'next-i18next'

interface Props {
  control: any
  errors: any
}

const StepThree: React.FC<Props> = ({ control, errors }) => {
  const { t } = useTranslation()

  return (
    <div className='grid'>
      <div className='grid grid-cols-1 gap-2 md:min-w-[400px] min-w-[320px]'>
        <DefaultInput
          label='საბანკო ანგარიშის ნომერი (IBAN)'
          control={control}
          errors={errors}
          name='company_information.iban'
          className='w-full'
        />
        <DefaultInput
          label={t('e_mail')}
          control={control}
          errors={errors}
          name='company_information.email'
          className='w-full'
        />
        <DefaultInput
          label={t('office_phone_number')}
          control={control}
          errors={errors}
          name='company_information.phone_numbers'
        />
      </div>
    </div>
  )
}

export default StepThree
