import { useTranslation } from 'react-i18next'
import useAllCities from 'src/hooks/useAllCities'
import { DefaultInput } from 'src/views/components/input'
import SelectField from 'src/views/components/selectField'
import TwoOptionSelector from 'src/views/components/twoOptionSelector'
import { StepThreePriceContainer } from '../../stepThree/styles'

interface Props {
  control: any
  errors: any
  index: number
  name: string
}
const SelectCityComponent: React.FC<Props> = ({ control, errors, index, name }) => {
  const { t, i18n } = useTranslation()

  const { allCitiesData } = useAllCities()

  return (
    <div className='w-full justify-between mb-4 grid gap-6 grid-cols-1 md:grid-cols-2'>
      <SelectField
        className='w-full'
        control={control}
        options={allCitiesData}
        name={`${name}.${index}.city`}
        valueKey='id'
        labelKey={i18n.language === 'ka' ? 'title' : 'title_en'}
        placeholder={t('city')}
      />
      <StepThreePriceContainer className='justify-between'>
        <DefaultInput
          label={t('prices_and_sales') + '*'}
          control={control}
          name={`${name}.${index}.price`}
          errors={errors}
          type='number'
          className='w-full'
        />
        <TwoOptionSelector
          control={control}
          name={`${name}.${index}.currency`}
          options={[
            { value: 'GEL', icon: 'gel', width: '11', height: '12' },
            { value: 'USD', icon: 'usd', width: '7', height: '12' }
          ]}
        />
      </StepThreePriceContainer>
    </div>
  )
}

export default SelectCityComponent
