import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller } from 'react-hook-form'
import FileUpload from 'src/views/components/fileUpload'
import { DefaultInput } from 'src/views/components/input'
import useCreateCompany from '../useCreateCompany'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'

interface Props {
  control: any
  errors: any
  clearErrors: any
  setValue: any
}

const StepOne: React.FC<Props> = ({ control, errors, clearErrors, setValue }) => {
  const { uploadCompanyLogo } = useCreateCompany()

  const queryClient = useQueryClient()

  const uploadCompanyLogoMutation: any = useMutation(uploadCompanyLogo, {
    onSuccess: data => {
      const uploadedFile = data?.Data?.FilesList[0]
      setValue('company_information.logo', uploadedFile)
      clearErrors('company_information.logo')
      queryClient.invalidateQueries(['companyLogo'])
    }
  })

  const handleFileUpload = async (file: any) => {
    try {
      await uploadCompanyLogoMutation.mutateAsync(file)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  const handleRemoveFile = () => setValue('company_information.logo', '')
  const { t } = useTranslation()

  return (
    <div>
      <div className='grid grid-cols-1 pb-6 md:grid-cols-2 gap-4'>
        <DefaultInput
          label={t('identification_number') + '*'}
          control={control}
          name='identification_number'
          errors={errors}
          clearErrors={clearErrors}
          type='number'
        />
        <DefaultInput
          label={t('legal_name') + '*'}
          control={control}
          name='company_information.legal_name'
          errors={errors}
        />
        <DefaultInput
          label={t('company_name') + '*'}
          control={control}
          className='md:col-span-2'
          name='company_information.name'
          errors={errors}
        />
        <DefaultInput
          label={t('description') + ' (' + t('georgian') + ') *'}
          control={control}
          className='md:col-span-2'
          name='company_information.description'
          rows={4}
          errors={errors}
        />
        <DefaultInput
          label={t('description') + ' (' + t('english') + ') *'}
          control={control}
          className='md:col-span-2'
          name='company_information.description_en'
          rows={4}
          errors={errors}
        />
      </div>

      <Controller
        name='company_information.logo'
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <FileUpload
              title={t('company_logo')}
              description={t('max_image_size')}
              handleDelete={handleRemoveFile}
              value={value}
              onChange={(e: any) => {
                onChange()
                handleFileUpload(Array.from(e.target.files))
              }}
              isLoading={uploadCompanyLogoMutation.isLoading}
            />
            {errors && (
              <div className={`text-sm text-red-100 ml-2 my-2`}>
                {t(_.get(errors, 'company_information.logo')?.message)}
              </div>
            )}
          </>
        )}
      />

      {uploadCompanyLogoMutation.isError && <p>Error uploading file: {uploadCompanyLogoMutation.error.message}</p>}
    </div>
  )
}

export default StepOne
