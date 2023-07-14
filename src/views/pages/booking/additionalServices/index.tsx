import Radio from 'src/views/components/radio'
import Typography from 'src/views/components/typography'
import AdditionalServiceCheckbox from './additionalServiceCheckbox'

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
