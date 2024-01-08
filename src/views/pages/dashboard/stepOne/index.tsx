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
import _ from 'lodash'
import useProfile from 'src/hooks/useProfile'

interface Props {
  control: any
  productValues: any
  errors: any
  setValue: any
  removeImage: any
  appendImages: any
}

const StepOne: React.FC<Props> = ({ control, productValues, errors, setValue, removeImage, appendImages }) => {
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
    onSuccess: data => {
      const uploadedFiles = data?.Data?.FilesList || []
      uploadedFiles.forEach((file: string) => {
        appendImages(file)
      })
      queryClient.invalidateQueries(['productInfo'])
    },
    onError: error => {
      console.error('Error uploading file:', error)
    }
  })

  const handleFileUpload = async (files: any, count: number) => {
    try {
      return await uploadProductImagesMutation.mutateAsync({
        Files: Array.from(files),
        count,
        userId
      })
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

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
      <div className='flex flex-col flex-wrap gap-2 mt-4'>
        <Controller
          name='images'
          control={control}
          render={({ field: { value } }) => (
            <>
              <ImagesInput
                title='ავტომობილის ფოტოსურათები'
                description='(მაქს. ზომა 10 მბ, JPG, PNG, SVG)'
                handleRemoveImage={removeImage}
                handleMoveToFront={handleMoveToFront}
                isLoading={uploadProductImagesMutation.isLoading}
                value={value}
                onChange={(e: any) => {
                  handleFileUpload(Array.from(e.target.files), e.target.files.length)
                }}
              />
              {errors && <div className={`text-sm text-red-100 whitespace-normal`}>{_.get(errors, 'images')?.message}</div>}
            </>
          )}
        />
      </div>
    </>
  )
}

export default StepOne
