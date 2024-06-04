import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { IconTextButton } from 'src/views/components/button'
import { DefaultInput } from 'src/views/components/input'
import DiscountComponent from './discountComponent'
import {
  DiscountComponentWrapper,
  DiscountContainer,
  DiscountInputsWrapper,
  StepThreeContainer,
  StepThreePriceContainer
} from './styles'
import { useWatch } from 'react-hook-form'
import useNewProduct from '../newProduct/useNewProduct'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const SwitchField = dynamic(() => import('src/views/components/switchField'), { ssr: false })
const TwoOptionSelector = dynamic(() => import('src/views/components/twoOptionSelector'), { ssr: false })

interface Props {
  control: any
  discountItems: any
  appendDiscountItem: any
  remove: any
  errors: any
}

const options = [
  { value: 'დღე', label: 'დღე', id: '1' },
  { value: 'კვირა', label: 'კვირა', id: '2' }
]

const StepThree: React.FC<Props> = ({ control, errors, discountItems, appendDiscountItem, remove }) => {
  const { t } = useTranslation()

  const { discount_item, setValue } = useNewProduct()
  const { width } = useWindowDimensions()
  const formState = useWatch({ control })

  useEffect(() => {
    if (discountItems.length === 0) {
      setValue('apply_discount', false)
    }
  }, [setValue, discountItems])

  console.log(discountItems, 'discountItems')

  return (
    <StepThreeContainer>
      <StepThreePriceContainer>
        <DefaultInput
          label={t('daily_price') + '*'}
          control={control}
          name='daily_price.amount'
          errors={errors}
          type='number'
          className='min-w-[200px]'
        />
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
        {t('daily_price_desc')}
      </Typography>

      <Typography type='h5' weight='normal' className='text-3md my-6'>
        დეპოზიტი
      </Typography>
      <Divider />
      <DiscountContainer>
        <SwitchField
          label='მიუთითე სადეპოზიტო  თანხა'
          description='*მოცემულ თანხას მომხმარებელი გადაიხდის ადგილზე'
          control={control}
          name='has_deposit'
          defaultValue={false}
        />
      </DiscountContainer>

      {formState.has_deposit ? (
        <StepThreePriceContainer>
          <DefaultInput
            label="დეპოზიტის თანხა"
            control={control}
            name='deposit_amount'
            errors={errors}
            type='number'
            className='min-w-[200px]'
          />
          <TwoOptionSelector
            control={control}
            name='deposit_currency'
            options={[
              { value: 'GEL', icon: 'gel', width: '11', height: '12' },
              { value: 'USD', icon: 'usd', width: '7', height: '12' }
            ]}
          />
        </StepThreePriceContainer>
      ) : (
        <></>
      )}

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
          {discountItems.map((component: any, index: number) => (
            <DiscountInputsWrapper key={component.id}>
              <DiscountComponent
                index={index}
                options={options}
                control={control}
                name={`discount.${index}`}
                errors={errors}
              />
              {discountItems.length > 1 && (
                <IconTextButton
                  label={width > 779 ? 'წაშლა' : ''}
                  icon='clear'
                  width={24}
                  height={24}
                  labelClassname='text-orange-120'
                  onClick={() => {
                    remove(index)
                  }}
                  className='p-0 md:p-4'
                  type='button'
                />
              )}
            </DiscountInputsWrapper>
          ))}
          <IconTextButton
            className='mt-6 mb-8'
            label='ახალი ფასდაკლების დამატება'
            icon='add'
            width={20}
            height={20}
            onClick={() => appendDiscountItem(discount_item)}
            type='button'
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
