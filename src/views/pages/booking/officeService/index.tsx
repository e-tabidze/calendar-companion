import { useWatch } from 'react-hook-form'
import { generateTimeOptions } from 'src/utils/timeValues'
import SelectField from 'src/views/components/selectField'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'

const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })

interface Props {
  control: any
  errors: any
  city: string
  address: string
  timeName: string
}

const OfficeService: React.FC<Props> = ({ control, errors, city, address, timeName }) => {
  const formState = useWatch({ control })
  const { t } = useTranslation()

  console.log(formState, 'formState')

  return (
    <div className='pl-13 mt-4'>
      <div className='flex items-center pb-6'>
        <div className='flex items-center lg:items-start'>
          <Icon svgPath='booking-start' height={24} width={24} className='fill-transparent flex shrink-0' />
        </div>
        <div className='lg:w-8/12 flex items-center justify-between'>
          <Typography type='body' className='text-2sm ml-4'>
            {city}, {address}
          </Typography>
          <div className='flex gap-6 shrink-0 items-center pl-9 lg:pl-0'>
            <SelectField
              icon
              control={control}
              valueKey='value'
              labelKey='label'
              name={timeName}
              options={generateTimeOptions()}
              placeholder={t('time') + '*'}
              className='bg-transparent fill-transparent border-green-100 group-color'
              errors={errors}
              errorAbsolute
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfficeService
