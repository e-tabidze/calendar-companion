import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const useNewProduct = () => {
  const discount_item = {
    number: 1,
    period: '',
    discount_percent: ''
  }
  const newListingDefaultValues = {
    apply_discount: false,
    discount_item: [discount_item],
    additional_options: []
  }
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    resetField,
    setError,
    clearErrors,
    setValue
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: newListingDefaultValues
  })

  const { fields: additionalParams, append: appendAdditionalParam } = useFieldArray({
    control,
    name: 'additional_options'
  })

  const { fields: discountItems, append: appendDiscountItem } = useFieldArray({
    control,
    name: 'discount_item'
  })

  const newProductValues: any = useWatch({ control })

  return {
    control,
    handleSubmit,
    errors,
    dirtyFields,
    resetField,
    setError,
    clearErrors,
    setValue,
    newProductValues,
    additionalParams,
    appendAdditionalParam,
    discountItems,
    appendDiscountItem,
    discount_item
  }
}

export default useNewProduct
