import { generateTimeOptions } from 'src/utils/timeValues'
import SelectField from 'src/views/components/selectField'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { DefaultInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'

const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })

interface Props {
  control: any
  errors: any
  otherServiceLocations: any[]
  nameCity: string
  addressName: string
  serviceValue: string | number
  timeName: string
}

const AddressService: React.FC<Props> = ({
  control,
  errors,
  otherServiceLocations,
  nameCity,
  addressName,
  serviceValue,
  timeName
}) => {
  const { t } = useTranslation()

  const options = otherServiceLocations?.map((item: any) => ({
    value: item.id,
    label: item.city.title
  }))

  return (
    <div className='pl-13 mt-4'>
      <div className='flex flex-col lg:flex-row lg:items-center mt-5 lg:mt-3 pb-6 lg:pb-0 border-b-1 border-green-40 lg:border-none'>
        <div className='flex items-center lg:items-start'>
          <Icon svgPath='booking-start' height={24} width={24} className='fill-transparent flex shrink-0' />
        </div>
        <div className='lg:w-full flex flex-col ml-2 lg:flex-row lg:items-center lg:justify-between'>
          <div className='flex lg:w-8/12 pl-9 lg:pl-0 mb-3 lg:mb-0'>
            <SelectField control={control} name={nameCity} options={options} valueKey='value' labelKey='label' className='flex-1' placeholder='აირჩიე ქალაქი' />

            <DefaultInput
              className='detail-input-placeholder flex-1 ml-3'
              name={addressName}
              control={control}
              label={t('enter_address')}
            />
          </div>

          <div className='flex gap-6 shrink-0 items-center pl-9 lg:pl-0'>
            <SelectField
              control={control}
              icon
              valueKey='value'
              labelKey='label'
              name={timeName}
              options={generateTimeOptions()}
              placeholder={t('time') + '*'}
              className='bg-transparent fill-transparent border-green-100 group-color'
              errors={errors}
              errorAbsolute
            />
          </div>
        </div>
        <div className='lg:w-2/12 flex justify-center'>
          <Typography type='body' className='text-2sm md:text-md w-max text-green-100 font-bold'>
            {serviceValue}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default AddressService
