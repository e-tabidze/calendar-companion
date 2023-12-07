import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import FileUpload from 'src/views/components/fileUpload'

// import FileUpload from 'src/views/components/fileUpload'
import { DefaultInput } from 'src/views/components/input'
import useCreateCompany from '../useCreateCompany'

interface Props {
  control: any
  errors: any
  clearErrors: any
  setValue: any
}

const StepOne: React.FC<Props> = ({ control, errors, clearErrors, setValue }) => {
  const { uploadCompanyLogo } = useCreateCompany()

  const queryClient = useQueryClient()

  const mutation: any = useMutation(uploadCompanyLogo, {
    onSettled: () => {
      queryClient.invalidateQueries(['companyLogo'])
    }
  })

  const handleFileUpload = async (file: any) => {
    try {
      await mutation.mutateAsync(file)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  useEffect(() => {
    setValue('company_information.logo', mutation.data?.Data?.FilesList[0])
  }, [mutation.data?.Data?.FilesList[0]])

  const handleRemoveFile = () => setValue('company_information.logo', '')

  return (
    <div>
      <div className='grid grid-cols-1 pb-6 md:grid-cols-2 gap-2'>
        <DefaultInput
          label='საიდენტიფიკაციო კოდი'
          control={control}
          name='identification_number'
          errors={errors}
          clearErrors={clearErrors}
        />
        <DefaultInput
          label='იურიდიული დასახელება'
          control={control}
          name='company_information.name'
          errors={errors}
          disabled
        />
        <DefaultInput
          label='კომპანიის დასახელება'
          control={control}
          className='md:col-span-2'
          name='company_information.name'
          errors={errors}
        />
        <DefaultInput
          label='აღწერა'
          control={control}
          className='md:col-span-2'
          name='company_information.description'
          rows={4}
          errors={errors}
        />
      </div>

      <Controller
        name='company_information.logo'
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            {console.log(value, 'value')}
            <FileUpload
              title='კომპანიის ლოგო'
              description='(მაქს. ზომა 10 მბ, JPG, PNG, SVG)'
              handleDelete={handleRemoveFile}
              value={value}
              onChange={(e: any) => {
                // console.log(e.target.files[0], 'E')
                onChange()
                handleFileUpload(e.target.files[0])
              }}
            />
          </>
        )}
      />

      {mutation.isLoading && <p>Uploading...</p>}

      {mutation.isError && <p>Error uploading file: {mutation.error.message}</p>}
    </div>
  )
}

export default StepOne
