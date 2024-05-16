import { useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import SelectField from 'src/views/components/selectField'
import SwitchField from 'src/views/components/switchField'
import Typography from 'src/views/components/typography'

interface Props {
  control: any
  errors: any
  cities: any[]
  addresses: any
}

const ReturnLocations: React.FC<Props> = ({ control, errors, cities, addresses }) => {
  const formState = useWatch({ control })
  const { t, i18n } = useTranslation()

  return (
    <div className='md:border md:border-raisin-10 rounded-3xl md:py-10 md:px-9 mb-3'>
      <Typography type='h4' weight='medium' color='dark' className='mb-4 whitespace-normal'>
        დაბრუნება
      </Typography>
      <Typography type='subtitle' color='dark' className='text-md mb-4 whitespace-normal'>
        {t('return_to')}
      </Typography>
      <div className='grid gap-6 mb-10 mt-4 grid-cols-1 md:grid-cols-2'>
        <SelectField
          control={control}
          name='end_city'
          placeholder={t('city')}
          options={cities}
          disabled={false}
          valueKey='value'
          labelKey='label'
          errors={errors}
        />
        <SelectField
          control={control}
          name='end_address'
          placeholder={t('branch')}
          options={addresses}
          disabled={!formState.end_city}
          valueKey='value'
          labelKey='label'
          errors={errors}
        />
      </div>
      <SwitchField
        label={i18n.language === 'en' ? 'ABC' : 'მიწოდების სერვისი სხვადასხვა ქალაქში'}
        className='my-8'
        control={control}
        name='has_return_locations'
      />
      {formState?.has_return_locations && <div>Return Locations</div>}
    </div>
  )
}

export default ReturnLocations
