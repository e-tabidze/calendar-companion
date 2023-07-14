import { useState } from 'react'
import Divider from 'src/views/components/divider'
import NumberInputWithSelect from 'src/views/components/numberInputWithSelect'
import SwitchField from 'src/views/components/switchField'
import Tag from 'src/views/components/tag'
import Typography from 'src/views/components/typography'

const options = ['შეზღუდვის გარეშე', '12 საათი', '1 დღე', '2 დღე', '3 დღე', '7 დღე']

const options2 = [
  { value: 'დღე', label: 'დღე' },
  { value: 'კვირა', label: 'კვირა' },
  { value: 'თვე', label: 'თვე' }
]

const StepFive = () => {
  const [minPeriod, setMinPeriod] = useState(false)
  
  return (
    <div>
      <Typography type='h4' weight='normal' color='dark' className='mb-4'>
        ქირაობის მინიმალური ვადა
      </Typography>
      <Divider />
      <SwitchField label='ნებისმიერი ვადა' value={false} onChange={() => console.log('OK')} className='my-8' />
      <Divider />
      <SwitchField
        label='მინიმალური ვადა'
        value={minPeriod}
        onChange={() => setMinPeriod(!minPeriod)}
        description='ავტომობილის გაქირავების მინიმალური ხანგრძლივობა (მაგ. 3 დღე)'
        className='my-8'
      />
      {minPeriod && (
        <div className='flex items-center gap-8 mb-10'>
          <NumberInputWithSelect options={options2} onChange={() => console.log('OK')} />
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
        {options.map((type, idx) => (
          <Tag label={type} key={idx} height={'h-10'} />
        ))}
      </div>
    </div>
  )
}

export default StepFive
