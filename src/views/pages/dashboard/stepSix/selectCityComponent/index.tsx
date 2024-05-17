import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  return (
    <div className='flex w-full justify-between mb-4'>
      <SelectField control={control} options={[]} name={`${name}.${index}.city`} valueKey={''} labelKey={''} />
      <StepThreePriceContainer>
        <DefaultInput
          label={t('prices_and_sales') + '*'}
          control={control}
          name={`${name}.${index}.price`}
          errors={errors}
          type='number'
          className='min-w-[200px]'
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
