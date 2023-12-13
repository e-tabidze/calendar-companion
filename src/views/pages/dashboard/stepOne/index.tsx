import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DefaultInput } from 'src/views/components/input'
import SelectField from 'src/views/components/selectField'
import TwoOptionSelector from 'src/views/components/twoOptionSelector'
import { useEffect } from 'react'
import useProductInfo, { getManufacturerModels } from '../useProductInfo'
import useNewProduct from '../newProduct/useNewProduct'
import { Controller, useWatch } from 'react-hook-form'
import { generateYearsArray } from 'src/utils/years'
import ImagesInput from './imagesInput'
import useProfile from 'src/hooks/useProfile'

interface Props {
  control: any
  productValues: any
  errors: any
  setValue: any
  removeImage: any
}

const StepOne: React.FC<Props> = ({ control, productValues, errors, setValue, removeImage }) => {
  const { manufacturers } = useProductInfo()
  const { postUploadProductImages } = useNewProduct()
  const { userId } = useProfile()

  const selectedManufacturerId = productValues.man_id

  const { data: manufacturerModels, refetch } = useQuery({
    queryKey: ['manufacturerModels'],
    queryFn: () => getManufacturerModels('', selectedManufacturerId),
    staleTime: Infinity,
    enabled: !!selectedManufacturerId
  })

  useEffect(() => {
    if (selectedManufacturerId) {
      refetch()
    }
  }, [selectedManufacturerId, refetch])

  const queryClient = useQueryClient()

  const uploadProductImagesMutation: any = useMutation(postUploadProductImages, {
    onSettled: () => {
      queryClient.invalidateQueries(['productInfo'])
    }
  })

  const handleFileUpload = async (files: any, count: number) => {
    try {
      await uploadProductImagesMutation.mutateAsync({
        Files: Array.from(files),
        count,
        userId
      })
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  useEffect(() => {
    const uploadedFiles = uploadProductImagesMutation.data?.Data?.FilesList || []
    setValue('images', uploadedFiles)
  }, [uploadProductImagesMutation.data?.Data?.FilesList, setValue])

  const formState = useWatch({ control })

  const handleMoveToFront = (index: number) => {
    const updatedImages = [...formState.images]
    const movedImage = updatedImages.splice(index, 1)[0]
    updatedImages.unshift(movedImage)
    setValue('images', updatedImages)
  }

  return (
    <>
      <div className='grid gap-4 grid-cold-1 md:grid-cols-2'>
        <DefaultInput name='vin' control={control} errors={errors} label='ვინ კოდი*' />
        <DefaultInput name='plate' control={control} errors={errors} label='სახელმწიფო ნომერი*' />
        <SelectField
          name='man_id'
          control={control}
          placeholder='მწარმოებელი*'
          options={manufacturers}
          valueKey='id'
          labelKey='title'
          errors={errors}
        />
        <SelectField
          name='model_id'
          control={control}
          placeholder='მოდელი*'
          options={manufacturerModels?.result?.data}
          valueKey='id'
          labelKey='title'
          disabled={!selectedManufacturerId}
          errors={errors}
        />
        <SelectField
          name='prod_year'
          control={control}
          placeholder='წელი*'
          options={generateYearsArray()}
          valueKey='value'
          labelKey='label'
          errors={errors}
        />
        <div className='flex gap-4 justify-center'>
          <DefaultInput
            name='odometer.run'
            control={control}
            errors={errors}
            label='გარბენი*'
            className='flex-grow'
            type='number'
          />
          <TwoOptionSelector
            control={control}
            name='odometer.measure'
            options={[
              { value: 'km', label: 'კმ' },
              { value: 'mile', label: 'მილი' }
            ]}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 mt-4'>
        <DefaultInput
          name='additional_information'
          control={control}
          errors={errors}
          label='დამატებითი ინფორმაცია*'
          rows={4}
        />
        <DefaultInput
          name='use_instruction'
          control={control}
          errors={errors}
          label='გამოყენების ინსტრუქცია*'
          rows={4}
        />
      </div>
      <div className='flex flex-wrap gap-2 mt-4'>
        <Controller
          name='images'
          control={control}
          render={({ field: { onChange, value } }) => (
            <ImagesInput
              title='ავტომობილის ფოტოსურათები'
              description='(მაქს. ზომა 10 მბ, JPG, PNG, SVG)'
              handleRemoveImage={removeImage}
              handleMoveToFront={handleMoveToFront}
              value={value}
              onChange={(e: any) => {
                onChange()
                handleFileUpload(Array.from(e.target.files), e.target.files.length)
              }}
            />
          )}
        />
      </div>
    </>
  )
}

export default StepOne
