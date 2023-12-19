import { useForm } from 'react-hook-form'
import Counter from 'src/views/components/counter'
import Typography from 'src/views/components/typography'

interface Props {
  children?: any
  name?: string
  options: any[]
  control?: any
  className?: string
}

const AdditionalServiceCheckbox: React.FC<Props> = ({ options }) => {
  const control = useForm()
  
  return (
    <div className=''>
      {options.map((option, index) => (
        <div className='flex justify-between py-6 border-b border-raisin-20 last:border-none' key={index}>
          <div className='flex gap-7 items-center '>

            {/* <Checkbox title='' name='' control={control} /> */}
            <Typography type='body' color='light'>
              0-9კგ
            </Typography>
          </div>
          <div className='flex gap-20 items-center'>
            <Counter name='' control={control} />
            <Typography type='h5'>{option.info}</Typography>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdditionalServiceCheckbox
