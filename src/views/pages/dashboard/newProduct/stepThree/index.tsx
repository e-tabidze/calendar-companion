import { JSXElementConstructor, ReactElement, useState } from 'react'
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
}

const options = [
  { value: 'დღე', label: 'დღე', id: '1' },
  { value: 'კვირა', label: 'კვირა', id: '2' },
  { value: 'თვე', label: 'თვე', id: '3' }
]

const StepThree: React.FC<Props> = ({ control, discountItems, appendDiscountItem }) => {
  const { discount_item } = useNewProduct()
  // const [discountComponents, setDiscountComponents] = useState<any>([
  //   <DiscountComponent index={1} options={options} key={Math.random()} />
  // ])
  const { width } = useWindowDimensions()

  // const addComponent = () => {
  //   setDiscountComponents([
  //     ...discountComponents,
  //     <DiscountComponent index={discountComponents.length + 1} options={options} key={Math.random()} />
  //   ])
  // }

  // const deleteComponent = (index: number) => {
  //   const updatedComponents = discountComponents.filter((_: any, i: number) => i !== index)
  //   setDiscountComponents(updatedComponents)
  // }

  const formState = useWatch({ control })

  console.log(formState, 'formState')

  console.log(discountItems, 'discountItems')

  return (
    <StepThreeContainer>
      <StepThreePriceContainer>
        <DefaultInput label='დღიური ღირებულება' control={control} name='daily_price.amount' errors={''} />
        <TwoOptionSelector
          control={control}
          name='daily_price.currency'
          options={[
            { value: 'GEL', icon: 'gridMap' },
            { value: 'USD', icon: 'gridMap' }
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
          name='discount.apply_discount'
          defaultValue={false}
          className='my-8'
        />
      </DiscountContainer>
      {formState.discount.apply_discount ? (
        <DiscountComponentWrapper>
          {discountItems.map((component: ReactElement<any, string | JSXElementConstructor<any>>, index: number) => (
            <DiscountInputsWrapper key={index}>
              <DiscountComponent
                index={index}
                options={options}
                control={control}
                name={`discount.discount_item.${index}`}
              />

              {index === discountItems.length - 1 && (
                <IconTextButton
                  label={width > 779 ? 'წაშლა' : ''}
                  icon='/icons/clear.svg'
                  labelClassname='text-orange-120'
                  // onClick={() => deleteComponent(index)}
                  className='p-0 md:p-4'
                />
              )}
            </DiscountInputsWrapper>
          ))}
          <IconTextButton
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
