import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'
import dynamic from 'next/dynamic'

const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const NumberInputWithSelect = dynamic(() => import('src/views/components/numberInputWithSelect'), { ssr: false })
const SwitchField = dynamic(() => import('src/views/components/switchField'), { ssr: false })
const Tag = dynamic(() => import('src/views/components/tag'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })


const options = [
  { value: 'დღე', label: 'დღე', id: '1' },
  { value: 'კვირა', label: 'კვირა', id: '2' }
]

const preparationPeriod = [
  { title: 'შეზღუდვის გარეშე', id: 1 },
  { title: '12 საათი', id: 2 },
  { title: '1 დღე', id: 3 },
  { title: '2 დღე', id: 4 },
  { title: '3 დღე', id: 5 },
  { title: '7 დღე', id: 6 }
]

interface Props {
  control: any
  setValue: any
}

const StepFive: React.FC<Props> = ({ control, setValue }) => {
  const formState = useWatch({ control })

  useEffect(() => {
    if (formState.any_period) {
      setValue('min_period.has_min_period', false)
    } else {
      setValue('min_period.has_min_period', true)
    }
  }, [formState.any_period, setValue])

  useEffect(() => {
    if (formState.min_period.has_min_period) {
      setValue('any_period', false)
    } else {
      setValue('any_period', true)
    }
  }, [formState.min_period.has_min_period, setValue])

  return (
    <div>
      <Typography type='h4' weight='normal' color='dark' className='mb-4'>
        ქირაობის მინიმალური ვადა
      </Typography>
      <Divider />
      <SwitchField label='ნებისმიერი ვადა' name='any_period' defaultValue={true} control={control} className='my-8' />
      <Divider />
      <SwitchField
        label='მინიმალური ვადა'
        description='ავტომობილის გაქირავების მინიმალური ხანგრძლივობა (მაგ. 3 დღე)'
        className='my-8'
        name='min_period.has_min_period'
        defaultValue={formState.min_period.has_min_period}
        control={control}
      />

      {formState.min_period.has_min_period && (
        <div className='flex items-center gap-8 mb-10'>
          <NumberInputWithSelect
            options={options}
            control={control}
            inputName='min_period.time_span'
            selectName='min_period.time_interval'
            type='number'
          />
          <Typography type='body' color='light' className='w-1/2'>
            ამ პარამეტრის გააქტიურებით თქვენ ადგენთ ავტომობილის გაქირავების პერიოდის მაქსიმალურ ლიმიტს
          </Typography>
        </div>
      )}

      <Divider />
      <Typography type='h4' weight='normal' color='dark' className='mt-16'>
        მოსამზადებელი პერიოდი
      </Typography>
      <Typography type='body' color='light' className='text-2sm mt-2'>
        რა დრო გჭირდებათ იმისთვის, რომ მოამზადოთ ავტომობილი გასაქირავებლად ან მოახდინოთ რეაგირება შემოსულ შეკვეთაზე.
        მონიშნული პერიოდი ავტომატურად დაიბლოკება ყოველ მომდევნო ჯავშნამდე
      </Typography>
      <div className='flex flex-wrap gap-2 mt-14 '>
        <Tag height={'h-10'} options={preparationPeriod} name='preparation_period_type_id' control={control} />
      </div>
    </div>
  )
}

export default StepFive
