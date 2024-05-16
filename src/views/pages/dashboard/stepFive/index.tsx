import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'
import dynamic from 'next/dynamic'
import {useTranslation} from "next-i18next";

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
  { title: 'no_limits', id: 1 },
  { title: 'half_an_hour', id: 2 },
  { title: '1_hour', id: 3 },
  { title: '3_hours', id: 4 },
  { title: '6_hours', id: 5 },
  { title: '1_day', id: 6 }
]

interface Props {
  control: any
  setValue: any
}

const StepFive: React.FC<Props> = ({ control, setValue }) => {
  const {t} = useTranslation()
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
          {t('rent_min_period')}
      </Typography>
      <Divider />
      <SwitchField label={t('any_period')} name='any_period' defaultValue={true} control={control} className='my-8' />
      <Divider />
      <SwitchField
        label={t('min_period')}
        description={t('car_rent_min_period')}
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
        </div>
      )}

      <Divider />
      <Typography type='h4' weight='normal' color='dark' className='mt-16'>
          {t('preparation_period')}
      </Typography>
      <Typography type='body' color='light' className='text-2sm mt-2'>
          {t('preparation_period_desc')}
      </Typography>
      <div className='flex flex-wrap gap-2 mt-14 mb-4'>
        <Tag height='h-10' options={preparationPeriod} name='preparation_period_type_id' control={control} />
      </div>
    </div>
  )
}

export default StepFive
