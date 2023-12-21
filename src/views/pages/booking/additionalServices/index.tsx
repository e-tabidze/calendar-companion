import AdditionalServiceCheckbox from './additionalServiceCheckbox'
import dynamic from 'next/dynamic'

const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Radio = dynamic(() => import('src/views/components/radio'), { ssr: false })

const options = [
  { label: 'წავიყვან ოფისიდან', value: 'წავიყვან ოფისიდან', info: '$0.00' },
  { label: 'მიწოდება', value: 'მიწოდება', info: '$0.00' }
]

interface Props {
  control: any
}
const AdditionalServices = ({ control }: Props) => {
  return (
    <div className='border border-raisin-20 rounded-xl p-9'>
      <Radio name='name' options={options} control={control} color="bg-green-100"></Radio>
      <Typography type='body' color='light'>
        სხვა სერვისები
      </Typography>
      <AdditionalServiceCheckbox options={options} />
    </div>
  )
}

export default AdditionalServices
