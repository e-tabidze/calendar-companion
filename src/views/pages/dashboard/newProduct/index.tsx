import { useState } from 'react'
import NewListingLayout from 'src/layouts/NewListingLayout'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import useNewProduct from './useNewProduct'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product } from 'src/types/Product'

import toast from 'react-hot-toast'
import Toast from 'src/views/components/toast'
import { useTranslation } from 'next-i18next'

const StepOne = dynamic(() => import('../stepOne'), { ssr: false })
const StepTwo = dynamic(() => import('../stepTwo'), { ssr: false })
const StepThree = dynamic(() => import('../stepThree'), { ssr: false })
const StepFour = dynamic(() => import('../stepFour'), { ssr: false })
const StepFive = dynamic(() => import('../stepFive'), { ssr: false })
const StepSix = dynamic(() => import('../stepSix'), { ssr: false })

// const StepSeven = dynamic(() => import('./stepSeven'), { ssr: false })

const options = [
  { value: '1/6_step', label: 'about_the_vehicle', step: 1 },
  { value: '2/6_step', label: 'car_parameters', step: 2 },
  { value: '3/6_step', label: 'prices_and_sales', step: 3 },
  { value: '4/6_step', label: 'services', step: 4 },
  { value: '5/6_step', label: 'booking_rules', step: 5 },
  { value: '6/6_step', label: 'location', step: 6 }

  // { value: '7/7 ნაბიჯი', label: 'მდებარეობა', step: 7 }
]

const NewProduct: React.FC = () => {
  const { t } = useTranslation()
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
    removeDiscountItem,
    createNewProduct,
    setValue,
    appendImages,
    errors,
    postSaveProductImages,
    trigger,
    removeImage,
    otherDeliverLocations,
    appendOtherDeliveryLocations,
    removeOtherDeliveryLocations,
    appendOtherReturnLocations,
    otherReturnLocations,
    removeOtherReturnLocations
  } = useNewProduct()

  const queryClient = useQueryClient()

  const handleGoNextStep = async () => {
    const currentIndex = options.findIndex(option => option.value === step.value)

    switch (currentIndex) {
      case 0:
        const isValidStep1 = await trigger([
          'vin',
          'plate',
          'man_id',
          'model_id',
          'prod_year',
          'additional_information',
          'additional_information_en',
          'use_instruction',
          'use_instruction_en',
          'odometer.run',
          'images' as any
        ])
        if (isValidStep1) {
          setStep(options[currentIndex + 1])
          window.scrollTo(0, 0)
        }
        break
      case 1:
        const isValidStep2 = await trigger([
          'category_id',
          'fuel_type_id',
          'seat_type_id',
          'luggage_numbers',
          'steering_wheel',
          'door_type_id',
          'drive_tires_id',
          'transmission_type_id' as any
        ])
        if (isValidStep2) {
          setStep(options[currentIndex + 1])
          window.scrollTo(0, 0)
        }
        break
      case 2:
        const isValidStep3 = await trigger(['daily_price.amount' as any])
        if (isValidStep3) {
          setStep(options[currentIndex + 1])
        }
        break

      case 3:
        setStep(options[currentIndex + 1])
        break

      case 4:
        setStep(options[currentIndex + 1])
        break

      case 5:
        const isValidStep6 = await trigger(['start_city', 'start_address', 'end_city', 'end_address' as any])
        if (isValidStep6) {
          setStep(options[currentIndex + 1])
        }
        break

      default:
        if (currentIndex < options.length - 1) {
          setStep(options[currentIndex + 1])
        }
        break
    }
  }

  const handleGoPrevStep = () => {
    const currentIndex = options.findIndex(option => option.step === step.step)
    if (currentIndex > 0) {
      setStep(options[currentIndex - 1])
    }
  }

  const saveProductImagesMutation = useMutation((variables: any) =>
    postSaveProductImages(variables.FilesList, variables.productId)
  )

  const createNewProducteMutation = useMutation(
    (product: Product) => {
      return createNewProduct('', product)
    },
    {
      onSuccess: data => {
        if (data) {
          const images = data?.result?.data?.images
          const productId = data?.result?.data?.id

          if (images && productId) {
            saveProductImagesMutation.mutate({
              FilesList: images.split(','),
              productId: productId
            })

            toast.custom(<Toast type='success' title={t('new_product_add_success')} />)
            queryClient.invalidateQueries(['companyProducts'])

            setTimeout(() => {
              router.push(`/dashboard/products/?is_active=&page=1`)
            }, 5000)
          } else {
            console.error('Error: Images or productId is missing.')
          }
        }
      },

      onError: () => {
        toast.custom(<Toast type='error' title={t('new_product_add_error')} />)
      }
    }
  )

  const onSubmit = () => {
    createNewProducteMutation.mutate(productValues)
  }

  console.log(productValues, 'productValues')

  console.log(errors, 'errors new product')

  const renderStepComponent = () => {
    switch (step.step) {
      case 1:
        return (
          <StepOne
            control={control}
            productValues={productValues}
            errors={errors}
            setValue={setValue}
            removeImage={removeImage}
            appendImages={appendImages}
          />
        )
      case 2:
        return (
          <StepTwo control={control} appendAdditionalParam={appendAdditionalParam} step={step.step} errors={errors} />
        )
      case 3:
        return (
          <StepThree
            control={control}
            discountItems={discountItems}
            appendDiscountItem={appendDiscountItem}
            remove={removeDiscountItem}
            errors={errors}
          />
        )
      case 4:
        return <StepFour control={control} step={step.step} errors={errors} />
      case 5:
        return <StepFive control={control} setValue={setValue} />
      case 6:
        return (
          <StepSix
            control={control}
            errors={errors}
            otherDeliverLocations={otherDeliverLocations}
            appendOtherDeliveryLocations={appendOtherDeliveryLocations}
            removeOtherDeliveryLocations={removeOtherDeliveryLocations}
            otherReturnLocations={otherReturnLocations}
            appendOtherReturnLocations={appendOtherReturnLocations}
            removeOtherReturnLocations={removeOtherReturnLocations}
          />
        )

      // case 7:
      //   return <StepSeven control={control} />
      default:
        return null
    }
  }

  return (
    <NewListingLayout
      options={options}
      onChange={selectOption}
      selectedOption={step}
      onNextStep={handleGoNextStep}
      onPrevStep={handleGoPrevStep}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      submitLabel={t('add')}
      disabled={createNewProducteMutation.isLoading || saveProductImagesMutation.isLoading}
    >
      <form>{renderStepComponent()}</form>
    </NewListingLayout>
  )
}

export default NewProduct
