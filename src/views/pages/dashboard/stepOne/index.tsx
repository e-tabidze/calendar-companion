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
import { useTranslation } from 'next-i18next'

interface Props {
  control: any
  productValues: any
  errors: any
  setValue: any
  removeImage: any
  appendImages: any
}

const StepOne: React.FC<Props> = ({ control, productValues, errors, setValue, removeImage, appendImages }) => {
  const { t } = useTranslation()
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

  // const handleFileUpload = async (files: any, count: number) => {
  //   try {
  //     return await uploadProductImagesMutation.mutateAsync({
  //       Files: Array.from(files),
  //       count,
  //       userId
  //     })
  //   } catch (error) {
  //     console.error('Error uploading file:', error)
  //   }
  // }

  const handleFileUpload = async (files: FileList) => {
    const BATCH_SIZE = 4
    const fileArray = Array.from(files)

    for (let i = 0; i < fileArray.length; i += BATCH_SIZE) {
      const batch = fileArray.slice(i, i + BATCH_SIZE)
      try {
        await uploadProductImagesMutation.mutateAsync({
          Files: batch,
          count: batch.length,
          userId
        })
      } catch (error) {
        console.error('Error uploading file:', error)
      }
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
        <DefaultInput name='vin' control={control} errors={errors} label={t('vin_code')} />
        <DefaultInput name='plate' control={control} errors={errors} label={t('legal_number') + '*'} />
        <SelectField
          name='man_id'
          control={control}
          placeholder={t('manufacturer') + '*'}
          options={manufacturers}
          valueKey='id'
          labelKey='title'
          errors={errors}
        />
        <SelectField
          name='model_id'
          control={control}
          placeholder={t('model') + ' *'}
          options={manufacturerModels?.result?.data}
          valueKey='id'
          labelKey='title'
          disabled={!selectedManufacturerId}
          errors={errors}
        />
        <SelectField
          name='prod_year'
          control={control}
          placeholder={t('year') + '*'}
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
            label={t('run') + '*'}
            className='flex-grow'
            type='number'
          />
          <TwoOptionSelector
            control={control}
            name='odometer.measure'
            options={[
              { value: 'km', label: t('km') },
              { value: 'mile', label: t('mile') }
            ]}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 mt-4'>
        <DefaultInput
          name='additional_information'
          control={control}
          errors={errors}
          label={t('additional_info') + ' (' + t('georgian') + ') *'}
          rows={4}
        />
        <DefaultInput
          name='additional_information_en'
          control={control}
          errors={errors}
          label={t('additional_info') + ' (' + t('english') + ') *'}
          rows={4}
        />
        <DefaultInput
          name='use_instruction'
          control={control}
          errors={errors}
          label={t('instruction_for_use') + ' (' + t('georgian') + ') *'}
          rows={4}
        />
        <DefaultInput
          name='use_instruction_en'
          control={control}
          errors={errors}
          label={t('instruction_for_use') + ' (' + t('english') + ') *'}
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
                title={t('car_photos')}
                description={t('max_image_size')}
                handleRemoveImage={removeImage}
                handleMoveToFront={handleMoveToFront}
                isLoading={uploadProductImagesMutation.isLoading}
                value={value}
                onChange={(e: any) => {
                  handleFileUpload(e.target.files)
                }}
              />
              {errors && (
                <div className={`text-sm text-red-100 whitespace-normal`}>{t(_.get(errors, 'images')?.message)}</div>
              )}
            </>
          )}
        />
      </div>
    </>
  )
}

export default StepOne
