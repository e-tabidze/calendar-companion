import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { DefaultInput } from 'src/views/components/input'
import SelectField from 'src/views/components/selectField'
import TwoOptionSelector from 'src/views/components/twoOptionSelector'
import useNewProduct, { getManufacturerModels } from '../useProduct'
import ImagesInput from './imagesInput'
import Cookie from 'src/helpers/Cookie'

interface Props {
  control: any
  newProductValues: any
}

const StepOne: React.FC<Props> = ({ control, newProductValues }) => {
  const { manufacturers } = useNewProduct()

  const selectedManufacturerId = newProductValues.manufacturer

  const {
    data: manufacturerModels,
    refetch,
    isError,
    isRefetching
  } = useQuery({
    queryKey: ['manufacturerModels'],
    queryFn: () => getManufacturerModels(Cookie.get('AccessToken'), selectedManufacturerId),
    staleTime: Infinity,
    enabled: !!selectedManufacturerId
  })

  useEffect(() => {
    refetch()
  }, [newProductValues.manufacturer])

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
        <DefaultInput name='plate_number' control={control} errors={''} label='სახელმწიფო ნომერი' />
        <SelectField
          name='manufacturer'
          control={control}
          placeholder='მწარმოებელი'
          options={manufacturers}
          valueKey='id'
          labelKey='title'
        />
        <SelectField
          name='model'
          control={control}
          placeholder='მოდელი'
          options={manufacturerModels?.result?.data}
          valueKey='id'
          labelKey='title'
        />
        <SelectField name='name' control={control} placeholder='წელი' options={generateYearsArray()} />
        <div className='flex gap-4 justify-center'>
          <DefaultInput name='' control={control} errors={''} label='გარბენი' className='flex-grow' />
          <TwoOptionSelector
            options={[
              { value: '0', label: 'კმ' },
              { value: '1', label: 'მილი' }
            ]}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 mt-4'>
        <DefaultInput name='' control={control} errors={''} label='დამატებითი ინფორმაცია' rows={4} />
        <DefaultInput name='' control={control} errors={''} label='გამოყენების ინსტრუქცია' rows={4} />
      </div>
      <div className='flex flex-wrap gap-2 mt-4'>
        <ImagesInput label='ავტომობილის ფოტოები' infoText='(მაქს. ზომა 10 მბ, JPG, PNG, SVG)' icon bg='bg-green-10' />
      </div>
    </div>
  )
}

export default StepOne
