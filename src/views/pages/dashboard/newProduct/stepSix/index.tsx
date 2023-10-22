import { useWatch } from 'react-hook-form'
import MapPicker from 'src/views/components/mapPicker'
import SelectField from 'src/views/components/selectField'
import Typography from 'src/views/components/typography'
import useProductInfo from '../useProductInfo'

interface Props {
  control: any
}
const StepSix: React.FC<Props> = ({ control }) => {
  const { companyBranches } = useProductInfo()

  const formState = useWatch({ control })

  const cities = () => companyBranches?.map((branch: any) => ({ label: branch.city, value: branch.city }))

  const renderAddresses = (name: string) => {
    const selected = formState[name] && companyBranches?.find((v: any) => v.city === formState[name] && v.city)

    return selected?.addresses?.map((address: any) => ({
      label: address,
      value: address
    }))
  }

  return (
    <div>
      <Typography type='h4' weight='normal' color='dark' className='mb-4'>
        საიდან წაიყვანს მომხმარებელი მანქანას
      </Typography>
      <div className='grid gap-6 mb-10 mt-4 grid-cols-1 md:grid-cols-2'>
        <SelectField
          control={control}
          name='start_city'
          placeholder='აირჩიე ქალაქი'
          options={cities()}
          disabled={false}
        />
        <SelectField
          control={control}
          name='start_address'
          placeholder='აირჩიე ფილიალი'
          options={renderAddresses('start_city')}
          disabled={!formState.start_city}
        />
      </div>
      <Typography type='h4' weight='normal' color='dark' className='mb-4'>
        სად დააბრუნებს მომხმარებელი მანქანას
      </Typography>
      <div className='grid gap-6 mb-10 mt-4 grid-cols-1 md:grid-cols-2'>
        <SelectField
          control={control}
          name='end_city'
          placeholder='აირჩიე ქალაქი'
          options={cities()}
          disabled={false}
        />
        <SelectField
          control={control}
          name='end_address'
          placeholder='აირჩიე ფილიალი'
          options={renderAddresses('end_city')}
          disabled={!formState.end_city}
        />
      </div>
      <MapPicker height='275px' borderRadius='16px' />
      <Typography type='subtitle' className='mt-2'>
        მონიშვნის შემდეგ მომხმარებელთან ავტომობილები გამოჩნდება რუკაზე მდებარეობის მიხედვით
      </Typography>
    </div>
  )
}

export default StepSix
