import { useForm } from 'react-hook-form'
import MapPicker from 'src/views/components/mapPicker'
import SelectField from 'src/views/components/selectField'
import Typography from 'src/views/components/typography'

const options = [
  { label: 'თბილისი', value: 'თბილისი' },
  { label: 'ქუთაისი', value: 'ქუთაისი' }
]

const options2 = [
  { label: 'თბილისის ოფისი', value: 'თბილისის ოფისი' },
  { label: 'ქუთაისის ოფისი', value: 'ქუთაისის ოფისი' }
]

interface Props {
  control: any
}
const StepSix: React.FC<Props> = ({ control }) => {
  return (
    <div>
      <Typography type='h4' weight='normal' color='dark' className='mb-4'>
        საიდან წაიყვანს მომხმარებელი მანქანას
      </Typography>
      <div className='grid gap-6 mb-10 mt-4 grid-cols-1 md:grid-cols-2'>
        <SelectField control={control} name='' placeholder='აირჩიე ქალაქი' options={options} disabled={false} />
        <SelectField control={control} name='' placeholder='აირჩიე ფილიალი' options={options2} disabled={false} />
      </div>
      <Typography type='h4' weight='normal' color='dark' className='mb-4'>
        სად დააბრუნებს მომხმარებელი მანქანას
      </Typography>
      <div className='grid gap-6 mb-10 mt-4 grid-cols-1 md:grid-cols-2'>
        <SelectField control={control} name='' placeholder='აირჩიე ქალაქი' options={options} disabled={false} />
        <SelectField control={control} name='' placeholder='აირჩიე ფილიალი' options={options2} disabled={false} />
      </div>
      <MapPicker height='275px' borderRadius='16px' />
      <Typography type='subtitle' className='mt-2'>
        მონიშვნის შემდეგ მომხმარებელთან ავტომობილები გამოჩნდება რუკაზე მდებარეობის მიხედვით
      </Typography>
    </div>
  )
}

export default StepSix
