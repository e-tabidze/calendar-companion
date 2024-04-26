import AdditionalServiceCheckbox from './additionalServiceCheckbox'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'

const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Radio = dynamic(() => import('src/views/components/radio'), { ssr: false })

const options = [
  { label: 'ოფისიდან წაყვანა', value: 'ოფისიდან წაყვანა', info: '$0.00' },
  { label: 'მიწოდება', value: 'მიწოდება', info: '$0.00' }
]

interface Props {
  control: any
}
const AdditionalServices: React.FC<Props> = ({ control }) => {
  const { t } = useTranslation()

  return (
    <div className='border border-raisin-20 rounded-xl p-9'>
      <Radio name='name' options={options} control={control} color='bg-green-100'></Radio>
      <Typography type='body' color='light'>
        {t('other_services')}
      </Typography>
      <AdditionalServiceCheckbox options={options} />
    </div>
  )
}

export default AdditionalServices
