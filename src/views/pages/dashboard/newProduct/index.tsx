import { useState } from 'react'
import NewListingLayout from 'src/layouts/NewListingLayout'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import useNewProduct from './useNewProduct'

const StepOne = dynamic(() => import('./stepOne'), { ssr: false })
const StepTwo = dynamic(() => import('./stepTwo'), { ssr: false })
const StepThree = dynamic(() => import('./stepThree'), { ssr: false })
const StepFour = dynamic(() => import('./stepFour'), { ssr: false })
const StepFive = dynamic(() => import('./stepFive'), { ssr: false })
const StepSix = dynamic(() => import('./stepSix'), { ssr: false })
const StepSeven = dynamic(() => import('./stepSeven'), { ssr: false })

import Cookie from 'src/helpers/Cookie'

const options = [
  { value: '1/7 ნაბიჯი', label: 'ავტომობილის შესახებ', step: 1 },
  { value: '2/7 ნაბიჯი', label: 'ავტომობილის პარამეტრები', step: 2 },
  { value: '3/7 ნაბიჯი', label: 'ფასები და ფასდაკლება', step: 3 },
  { value: '4/7 ნაბიჯი', label: 'სერვისები', step: 4 },
  { value: '5/7 ნაბიჯი', label: 'ჯავშნის მიღების პირობები', step: 5 },
  { value: '6/7 ნაბიჯი', label: 'ადგილმდებარეობა', step: 6 },
  { value: '7/7 ნაბიჯი', label: 'ადგილმდებარეობა', step: 7 }
]

const NewProduct: React.FC = () => {
  const [step, setStep] = useState(options[0])

  const router = useRouter()

  const selectOption = (option: any) => setStep(option)

  const handleClose = () => router.push('/dashboard/dashboard')

  const {
    control,
    handleSubmit,
    productValues,
    appendAdditionalParam,
    discountItems,
    appendDiscountItem,
    remove,
    createNewProduct,
    setValue,
    errors,
    appendServiceItem,
  } = useNewProduct()

  const handleGoNextStep = () => {
    const currentIndex = options.findIndex(option => option.value === step.value)
    if (currentIndex < options.length - 1) {
      setStep(options[currentIndex + 1])
    }
  }
  const handleGoPrevStep = () => {
    const currentIndex = options.findIndex(option => option.step === step.step)
    if (currentIndex > 0) {
      setStep(options[currentIndex - 1])
    }
  }

  const onSubmit = async () => {
    try {
      console.log(productValues, 'productValues')
      await createNewProduct({ AccessToken: Cookie.get('AccessToken'), product: productValues })
    } catch (error) {
      console.error('An error occurred while creating new listing:', error)
    }
  }

  console.log(productValues, 'productValues')

  const renderStepComponent = () => {
    switch (step.step) {
      case 1:
        return <StepOne control={control} productValues={productValues} errors={errors} />
      case 2:
        return <StepTwo control={control} appendAdditionalParam={appendAdditionalParam} step={step.step} />
      case 3:
        return (
          <StepThree
            control={control}
            discountItems={discountItems}
            appendDiscountItem={appendDiscountItem}
            remove={remove}
            errors={errors}
          />
        )
      case 4:
        return <StepFour control={control} step={step.step} appendServiceItem={appendServiceItem} setValue={setValue} />
      case 5:
        return <StepFive control={control} setValue={setValue} />
      case 6:
        return <StepSix control={control} />
      case 7:
        return <StepSeven control={control} />
      default:
        return null
    }
  }

  return (
    // @ts-ignore
    <FormProvider {...control}>
      <NewListingLayout
        options={options}
        onChange={selectOption}
        selectedOption={step}
        onNextStep={handleGoNextStep}
        onPrevStep={handleGoPrevStep}
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
      >
        <form>{renderStepComponent()}</form>
      </NewListingLayout>
    </FormProvider>
  )
}

export default NewProduct
