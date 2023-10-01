import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { DefaultInput } from 'src/views/components/input'
import SelectField from 'src/views/components/selectField'
import TwoOptionSelector from 'src/views/components/twoOptionSelector'
import ImagesInput from './imagesInput'
import Cookie from 'src/helpers/Cookie'
import useProductInfo, { getManufacturerModels } from '../useProductInfo'

interface Props {
  control: any
  newProductValues: any
}

const StepOne: React.FC<Props> = ({ control, newProductValues }) => {
  const { manufacturers } = useProductInfo()

  const selectedManufacturerId = newProductValues.man_id

  const {
    data: manufacturerModels,
    refetch,
    isError,
    isRefetching
  } = useQuery({
    queryKey: ['manufacturerModels'],
    queryFn: () => {
      if (selectedManufacturerId !== undefined) {
        return getManufacturerModels(Cookie.get('AccessToken'), selectedManufacturerId)
      } else {
        return null
      }
    },
    staleTime: Infinity,
    enabled: true
  })

  useEffect(() => {
    refetch()
  }, [selectedManufacturerId])

  const generateYearsArray = () => {
    const currentYear = new Date().getFullYear()
    const startYear = 1980
    const years = []
    for (let i = currentYear; i >= startYear; i--) {
      years.push({ value: i, label: i })
    }
    return years
  }

  return (
    <div>
      <div className='grid gap-4 grid-cold-1 md:grid-cols-2'>
        <DefaultInput name='vin' control={control} errors={''} label='ვინ კოდი' />
        <DefaultInput name='plate' control={control} errors={''} label='სახელმწიფო ნომერი' />
        <SelectField
          name='man_id'
          control={control}
          placeholder='მწარმოებელი'
          options={manufacturers}
          valueKey='id'
          labelKey='title'
        />
        <SelectField
          name='model_id'
          control={control}
          placeholder='მოდელი'
          options={manufacturerModels?.result?.data}
          valueKey='id'
          labelKey='title'
          disabled={!selectedManufacturerId}
        />
        <SelectField name='prod_year' control={control} placeholder='წელი' options={generateYearsArray()} />
        <div className='flex gap-4 justify-center'>
          <DefaultInput name='odometer.run' control={control} errors={''} label='გარბენი' className='flex-grow' />
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
          errors={''}
          label='დამატებითი ინფორმაცია'
          rows={4}
        />
        <DefaultInput name='use_instruction' control={control} errors={''} label='გამოყენების ინსტრუქცია' rows={4} />
      </div>
      <div className='flex flex-wrap gap-2 mt-4'>
        <ImagesInput label='ავტომობილის ფოტოები' infoText='(მაქს. ზომა 10 მბ, JPG, PNG, SVG)' icon bg='bg-green-10' />
      </div>
    </div>
  )
}

export default StepOne
