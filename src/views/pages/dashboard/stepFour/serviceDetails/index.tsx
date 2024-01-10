import Counter from 'src/views/components/counter'
import { DefaultInput } from 'src/views/components/input'
import dynamic from 'next/dynamic'

const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const TwoOptionSelector = dynamic(() => import('src/views/components/twoOptionSelector'), { ssr: false })

interface Props {
  control: any
  index: number
  label: string
  description: string
  errors: any
}

const ServiceDetails: React.FC<Props> = ({ control, index, label, description, errors }) => {
  return (
    <div className='mb-8'>
      <Typography type='subtitle' className='text-black font-bold mt-9 mb-2'>
        ღირებულება
      </Typography>
      <div className='flex justify-between md:items-center w-full gag-6 flex-col md:flex-row'>
        <Typography type='body' className='md:w-7/12 py-4 md-py-0'>
          {description}
        </Typography>
        <div className='flex gap-4 md:justify-center justify-between '>
          <DefaultInput label={label} className='!w-64' control={control} name={`company_services.${index}.price`} errors={errors} type="number" />
          <TwoOptionSelector
            control={control}
            name={`company_services.${index}.currency`}
            options={[
              { value: 'GEL', icon: 'gel', width: '11', height: '12' },

              // { value: 'USD', icon: 'usd', width: '7', height: '12' }
            ]}
          />
        </div>
      </div>

      <Typography type='subtitle' className='text-black font-bold mt-12 mb-2'>
        რაოდენობა
      </Typography>
      <div className='flex justify-between md:flex-row flex-col md:items-center w-full gag-6'>
        <Typography type='body' className='py-4 md-py-0 md:w-7/12'>
          მითითებული რაოდენობა განსაზღვრავს დამატებითი სერვისისის 1 დღის ქირაობის ფასს, რომლის ცვალებადობაც დამოკიდებული
          იქნება დღეების რაოდენობასზე
        </Typography>
        <div className='flex justify-center items-center border border-px-raisin-130 w-64 rounded-2xl h-14'>
          <Counter control={control} name={`company_services.${index}.quantity`} />
        </div>
      </div>
    </div>
  )
}

export default ServiceDetails
