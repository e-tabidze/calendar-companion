import { JSXElementConstructor, ReactElement, useEffect } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { IconTextButton } from 'src/views/components/button'
import TwoOptionSelector from 'src/views/components/twoOptionSelector'
import Divider from 'src/views/components/divider'
import { DefaultInput } from 'src/views/components/input'
import SwitchField from 'src/views/components/switchField'
import Typography from 'src/views/components/typography'
import DiscountComponent from './discountComponent'
import {
  DiscountComponentWrapper,
  DiscountContainer,
  DiscountInputsWrapper,
  StepThreeContainer,
  StepThreePriceContainer
} from './styles'
import { useWatch } from 'react-hook-form'
import useNewProduct from '../useNewProduct'

interface Props {
  control: any
  discountItems: any
  appendDiscountItem: any
  remove: any
  errors: any
}

const options = [
  { value: 'დღე', label: 'დღე', id: '1' },
  { value: 'კვირა', label: 'კვირა', id: '2' },
  { value: 'თვე', label: 'თვე', id: '3' }
]

const StepThree: React.FC<Props> = ({ control, discountItems, appendDiscountItem, remove, errors }) => {
  const { discount_item, setValue } = useNewProduct()
  const { width } = useWindowDimensions()
  const formState = useWatch({ control })

  useEffect(() => {
    if (discountItems.length === 0) {
      setValue('apply_discount', false)
    }

    console.log(discountItems, 'discountItems')
  }, [setValue, discountItems])

  return (
    <StepThreeContainer>
      <StepThreePriceContainer>
        <DefaultInput label='დღიური ღირებულება' control={control} name='daily_price.amount' errors={errors} />
        <TwoOptionSelector
          control={control}
          name='daily_price.currency'
          options={[
            { value: 'GEL', icon: 'gel', width: '11', height: '12' },
            { value: 'USD', icon: 'usd', width: '7', height: '12' }
          ]}
        />
      </StepThreePriceContainer>
      <Typography type='subtitle' className='my-9'>
        მითითებული ფასი განსაზღვრავს ავტომობილის 1 დღის ქირაობის ფასს, რომლის ცვლილებაც დამოკიდებული იქნება დაქირავებული
        დღეების რაოდენობასა და დინამიური ფასების პოლიტიკაზე
      </Typography>
      <Typography type='h5' weight='normal' className='text-3md my-6'>
        ფასდაკლება
      </Typography>
      <Divider />
      <DiscountContainer>
        <SwitchField
          label='ფასდაკლება გაქირავების ხანგრძლივობის მიხედვით'
          control={control}
          name='apply_discount'
          defaultValue={false}
        />
      </DiscountContainer>
      {formState.apply_discount ? (
        <DiscountComponentWrapper>
          {discountItems.map((component: ReactElement<any, string | JSXElementConstructor<any>>, index: number) => (
            <DiscountInputsWrapper key={index}>
              <DiscountComponent index={index} options={options} control={control} name={`discount.${index}`} errors={errors} />
              {index > 0 && (
                <IconTextButton
                  label={width > 779 ? 'წაშლა' : ''}
                  icon='/icons/clear.svg'
                  labelClassname='text-orange-120'
                  onClick={() => {
                    remove(index)
                    formState.discount.length === 0 && setValue('apply_discount', false)
                  }}
                  className='p-0 md:p-4'
                />
              )}
            </DiscountInputsWrapper>
          ))}
          <IconTextButton
            className='mt-6 mb-8'
            label='ახალი ფასდაკლების დამატება'
            icon='/icons/add.svg'
            onClick={() => appendDiscountItem(discount_item)}
          />
        </DiscountComponentWrapper>
      ) : (
        <></>
      )}
      <Divider />
    </StepThreeContainer>
  )
}

export default StepThree
