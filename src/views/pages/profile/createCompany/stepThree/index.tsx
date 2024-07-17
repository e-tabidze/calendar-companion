import { DefaultInput } from 'src/views/components/input'
import { useTranslation } from 'next-i18next'
import CheckboxField from "src/views/components/checkboxField";
import Link from 'next/link'

interface Props {
  control: any
  errors: any
}

const StepThree: React.FC<Props> = ({ control, errors }) => {
  const { t } = useTranslation()

  const options = [
    {
      id: 1,
      title: (
          <>
              {t('agree')}
            <Link href="/rules" target="_blank" className="ml-2 text-blue-100" >
              {t('terms_and_conditions')}
            </Link>
          </>

      )
    },
  ]

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
          type="number"
        />
          <CheckboxField control={control} name='terms_and_conditions'  options={options} errors={errors} />
      </div>
    </div>
  )
}

export default StepThree
