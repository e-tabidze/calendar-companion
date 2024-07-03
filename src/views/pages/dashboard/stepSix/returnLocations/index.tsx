import { useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { IconTextButton } from 'src/views/components/button'
import SelectField from 'src/views/components/selectField'
import SwitchField from 'src/views/components/switchField'
import Typography from 'src/views/components/typography'
import useNewProduct from '../../newProduct/useNewProduct'
import SelectCityComponent from '../selectCityComponent'

interface Props {
  control: any
  errors: any
  cities: any[]
  addresses: any
  removeOtherReturnLocations: any
  otherReturnLocations: any
  appendOtherReturnLocations: any
}

const ReturnLocations: React.FC<Props> = ({
  control,
  errors,
  cities,
  addresses,
  removeOtherReturnLocations,
  otherReturnLocations,
  appendOtherReturnLocations
}) => {
  const formState = useWatch({ control })
  const { t} = useTranslation()

  const { other_locations } = useNewProduct()

  const { width } = useWindowDimensions()

  return (
    <div className='md:border md:border-raisin-10 rounded-3xl md:py-10 md:px-9 mb-3'>
      <Typography type='h4' weight='medium' color='dark' className='mb-4 whitespace-normal'>
          {t('return')}
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
        label={t('supply_other_city')}
        className='my-8'
        control={control}
        name='has_other_return_locations'
      />
      {formState?.has_other_return_locations && (
        <div>
          {otherReturnLocations?.map((location: any, index: number) => (
            <div className='flex' key={location.id}>
              <SelectCityComponent
                control={control}
                index={index}
                errors={errors}
                name='other_return_locations'
                key={location.id}
              />
              {otherReturnLocations.length > 1 && (
                <IconTextButton
                  label={width > 779 ? t('remove') : ''}
                  icon='clear'
                  width={24}
                  height={24}
                  labelClassname='text-orange-120'
                  onClick={() => {
                    removeOtherReturnLocations(index)
                  }}
                  className='p-0 md:p-4'
                  type='button'
                />
              )}
            </div>
          ))}

          <IconTextButton
            className='mt-6 mb-8'
            label={t('add_city')}
            icon='add'
            width={20}
            height={20}
            onClick={() => appendOtherReturnLocations(other_locations)}
            type='button'
          />
        </div>
      )}
    </div>
  )
}

export default ReturnLocations
