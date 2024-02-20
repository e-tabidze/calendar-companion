import { useWatch } from 'react-hook-form'

// import MapPicker from 'src/views/components/mapPicker'
import SelectField from 'src/views/components/selectField'
import Typography from 'src/views/components/typography'
import useProductInfo from '../useProductInfo'
import {useTranslation} from "next-i18next";

interface Props {
  control: any
  errors: any
}
const StepSix: React.FC<Props> = ({ control, errors }) => {
  const {t} = useTranslation()
  const { companyBranches } = useProductInfo()

  const formState = useWatch({ control })

  const cities = () => companyBranches?.map((branch: any) => ({ label: branch.city, value: branch.city }))

  const renderAddresses = (name: string) => {
    const selected = formState[name] && companyBranches?.find((v: any) => v.city === formState[name] && v.city)

    return selected?.addresses?.map((address: any) => ({
      label: address,
      value: address
    }))
  }

  return (
    <div>
      <Typography type='h4' weight='normal' color='dark' className='mb-4 whitespace-normal'>
          {t('take_away_from')}*
      </Typography>
      <div className='grid gap-6 mb-10 mt-4 grid-cols-1 md:grid-cols-2'>
        <SelectField
          control={control}
          name='start_city'
          placeholder={t('select_city')}
          options={cities()}
          disabled={false}
          valueKey='value'
          labelKey='label'
          errors={errors}
        />
        <SelectField
          control={control}
          name='start_address'
          placeholder={t('select_branch')}
          options={renderAddresses('start_city')}
          disabled={!formState.start_city}
          valueKey='value'
          labelKey='label'
          errors={errors}
        />
      </div>
      <Typography type='h4' weight='normal' color='dark' className='mb-4 whitespace-normal'>
          {t('return_to')}*
      </Typography>
      <div className='grid gap-6 mb-10 mt-4 grid-cols-1 md:grid-cols-2'>
        <SelectField
          control={control}
          name='end_city'
          placeholder={t('select_city')}
          options={cities()}
          disabled={false}
          valueKey='value'
          labelKey='label'
          errors={errors}
        />
        <SelectField
          control={control}
          name='end_address'
          placeholder={t('select_branch')}
          options={renderAddresses('end_city')}
          disabled={!formState.end_city}
          valueKey='value'
          labelKey='label'
          errors={errors}
        />
      </div>

      {/* <MapPicker height='275px' borderRadius='16px' /> */}
    </div>
  )
}

export default StepSix
