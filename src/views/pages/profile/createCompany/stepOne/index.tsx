import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller } from 'react-hook-form'

// import FileUpload from 'src/views/components/fileUpload'
import { DefaultInput } from 'src/views/components/input'
import useCreateCompany from '../useCreateCompany'

interface Props {
  control: any
  errors: any
  clearErrors: any
}

const StepOne: React.FC<Props> = ({ control, errors, clearErrors }) => {
  const { uploadCompanyLogo, setValue } = useCreateCompany()

  const queryClient = useQueryClient()

  // const { data, isLoading, error } = useMutation(uploadCompanyLogo)

  // const { data, isLoading, error } = useMutation(file => uploadCompanyLogo(file), {
  //   onSettled: () => {
  //     queryClient.invalidateQueries(['companyLogo'])
  //   }
  // })
  const mutation: any = useMutation(uploadCompanyLogo, {
    onSettled: () => {
      queryClient.invalidateQueries(['companyLogo'])
      setValue('company_information.logo', mutation.data?.Data?.FilesList[0])
    }
  })

  const handleFileUpload = async (file: any) => {
    try {
      await mutation.mutateAsync(file)
      await setValue('company_information.logo', mutation.data?.Data?.FilesList[0])

      // console.log(uploadedFile?.Data?.FilesList[0], 'uploadedFile')

      // setValue('company_information.logo', uploadedFile?.Data?.FilesList[0]);
      setValue('company_information.logo', 'rame')

      // return uploadedFile?.Data?.FilesList[0]
      // Assuming the response contains the uploaded file information

      // Call the function to save the company logo with the uploaded file information
      // const savedLogo = await saveCompanyLogo(uploadedFile?.Data?.FilesList[0]);

      // Handle successful upload and save
      // console.log('File uploaded and logo saved:', savedLogo);
      // Handle successful upload
    } catch (error) {
      // Handle error
      console.error('Error uploading file:', error)
    }
  }

  console.log(mutation.data?.Data?.FilesList[0], 'data')

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
      {/* <FileUpload title='კომპანიის ლოგო' description='(მაქს. ზომა 10 მბ, JPG, PNG, SVG)' /> */}

      <Controller
        name='company_information.logo'
        control={control}
        render={({ field: { value } }) => (
          <>
            {console.log(value, 'value')}
            <input
              type='file'

              // onChange={(e: any) => handleFileUpload(e.target.files[0])}
              onChange={(e: any) => {

                // onChange()
                handleFileUpload(e.target.files[0])
              }}

              // name='company_information.logo'
            />
          </>
        )}
      />

      {/* Loading indicator */}
      {mutation.isLoading && <p>Uploading...</p>}

      {/* Display error if there is any */}
      {mutation.isError && <p>Error uploading file: {mutation.error.message}</p>}
    </div>
  )
}

export default StepOne
