import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DefaultInput } from 'src/views/components/input'
import SelectField from 'src/views/components/selectField'
import TwoOptionSelector from 'src/views/components/twoOptionSelector'

// import ImagesInput from './imagesInput'
import { useEffect } from 'react'
import useProductInfo, { getManufacturerModels } from '../useProductInfo'
import useNewProduct from '../newProduct/useNewProduct'
import { Controller, useWatch } from 'react-hook-form'
import { generateYearsArray } from 'src/utils/years'
import ImagesInput from './imagesInput'

interface Props {
  control: any
  productValues: any
  errors: any
  setValue: any
}

const StepOne: React.FC<Props> = ({ control, productValues, errors, setValue }) => {
  const { manufacturers } = useProductInfo()
  const { postUploadProductImages } = useNewProduct()

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

  // const handleFileUpload = async (files: any, count: number, userId: number = 4111619) => {
  //   try {
  //     await uploadProductImagesMutation.mutateAsync({ Files: files, count, userId })
  //   } catch (error) {
  //     console.error('Error uploading file:', error)
  //   }
  // }

  const handleFileUpload = async (files: any, count: number, userId = 4111619) => {
    try {
      await uploadProductImagesMutation.mutateAsync({
        Files: Array.from(files),
        count,
        userId
      })

      // const uploadedFiles = uploadProductImagesMutation.data?.Data?.FilesList || []
      // console.log(uploadedFiles, 'uploadedFiles')
      // setValue('images', uploadedFiles)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  console.log(uploadProductImagesMutation.data?.Data?.FilesList, 'uploadProductImagesMutation.data')

  useEffect(() => {
    const uploadedFiles = uploadProductImagesMutation.data?.Data?.FilesList || []
    console.log(uploadedFiles, 'uploadedFiles')
    setValue('images', uploadedFiles)
  }, [uploadProductImagesMutation.data?.Data?.FilesList, setValue])

  const formState = useWatch({ control })

  console.log(formState, 'formState')

  const handleRemoveFile = () => setValue('images', '')

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
        {/* <ImagesInput label='ავტომობილის ფოტოები' infoText='(მაქს. ზომა 10 მბ, JPG, PNG, SVG)' icon bg='bg-green-10' /> */}
        <Controller
          name='images'
          control={control}
          render={({ field: { onChange } }) => (
            // <ImagesInput
            //   label='ავტომობილის ფოტოები'
            //   infoText='(მაქს. ზომა 10 მბ, JPG, PNG, SVG)'
            //   icon
            //   bg='bg-green-10'
            //   onChange={(e: any) => {
            //     console.log(Array.from(e.target.files), 'targetfiles')
            //     onChange()
            //     handleFileUpload(Array.from(e.target.files), e.target.files.length)
            //   }}
            // />

            <Controller
              name='images'
              control={control}
              render={({ field: { onChange, value } }) => (
                // <ImagesInput
                //   label='ავტომობილის ფოტოები'
                //   infoText='(მაქს. ზომა 10 მბ, JPG, PNG, SVG)'
                //   icon
                //   bg='bg-green-10'
                //   onChange={(e: any) => {
                //     console.log(Array.from(e.target.files), 'targetfiles')
                //     onChange()
                //     handleFileUpload(Array.from(e.target.files), e.target.files.length)
                //   }}
                // />
                <ImagesInput
                  title='ავტომობილის ფოტოსურათები'
                  description='(მაქს. ზომა 10 მბ, JPG, PNG, SVG)'
                  handleDelete={handleRemoveFile}
                  value={value}
                  onChange={(e: any) => {
                    onChange()
                    handleFileUpload(Array.from(e.target.files), e.target.files.length)
                  }}
                />
              )}
            />

            // <input
            //   type='file'
            //   multiple
            //   onChange={(e: any) => {
            //     console.log(Array.from(e.target.files), 'targetfiles')
            //     onChange()
            //     handleFileUpload(Array.from(e.target.files), e.target.files.length)
            //   }}
            // />
          )}
        />
      </div>
    </>
  )
}

export default StepOne
