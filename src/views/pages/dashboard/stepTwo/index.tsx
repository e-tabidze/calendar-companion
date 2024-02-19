import useWindowDimensions from 'src/hooks/useWindowDimensions'
import CategoryCard from 'src/views/components/categoryCard'
import useProductInfo from '../useProductInfo'
import dynamic from 'next/dynamic'
import useFilters from 'src/hooks/useFilters'
import {useTranslation} from "next-i18next";

const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const Tag = dynamic(() => import('src/views/components/tag'), { ssr: false })
const SelectField = dynamic(() => import('src/views/components/selectField'), { ssr: false })
const CheckboxField = dynamic(() => import('src/views/components/checkboxField'), { ssr: false })

interface Props {
  control: any
  appendAdditionalParam: any
  step: number
  errors: any
}

const StepTwo: React.FC<Props> = ({ control, appendAdditionalParam, step, errors }) => {
  const { width } = useWindowDimensions()
  const { productDetails, additionalParams, isProductDetailsLoading, isAdditionalParamsLoading } = useProductInfo(step)
  const { steeringWheel, suitcases } = useFilters()
    const {t} = useTranslation()

  return (
    <div>
      <Typography type='h4' color='dark'>
          {t('vehicle_category')}*
      </Typography>
      {isProductDetailsLoading ? (
        <>Loading</>
      ) : (
        <>
          {width > 779 ? (
            <div className='flex flex-wrap gap-4 my-6'>
              <CategoryCard
                name='category_id'
                control={control}
                options={productDetails?.categories}
                border
                errors={errors}
              />
            </div>
          ) : (
            <div className='my-6'>
            <SelectField
              control={control}
              name='category_id'
              options={productDetails?.categories}
              placeholder='კატეგორია'
              valueKey='id'
              labelKey='title'
            />
            </div>
          )}
        </>
      )}

      <Typography type='h4' color='dark' className='mt-14'>
          {t('fuel_type')}*
      </Typography>
      <div className='flex flex-wrap gap-3 my-6'>
        {isProductDetailsLoading ? (
          <>Loading</>
        ) : (
          <Tag
            name='fuel_type_id'
            control={control}
            options={productDetails?.fuel_types}
            height='h-12'
            outlined
            errors={errors}
          />
        )}
      </div>
      <Typography type='h5' weight='normal' className=' mt-14'>
          {t('seat_type')}*
      </Typography>
      <div className='flex flex-wrap gap-4 my-6'>
        {isProductDetailsLoading ? (
          <>Loading</>
        ) : (
          <Tag
            name='seat_type_id'
            control={control}
            options={productDetails?.seat_types}
            height='h-10'
            errors={errors}
          />
        )}
      </div>
      <Typography type='h5' weight='normal' className=' mt-14'>
          {t('luggage_type')}*
      </Typography>
      <div className='flex flex-wrap gap-4 my-6'>
        <Tag name='luggage_numbers' control={control} options={suitcases} height='h-10' errors={errors} />
      </div>
      <Divider />
      <div className='flex justify-between my-10 flex-col items-baseline md:items-center md:flex-row'>
        <Typography type='h5' weight='normal' className=' mb-4 md:mb-0'>
            {t('door_types')}*
        </Typography>
        <div className='flex w-max gap-2'>
          {isProductDetailsLoading ? (
            <>Loading</>
          ) : (
            <Tag
              name='door_type_id'
              control={control}
              options={productDetails?.door_types}
              height='h-12'
              outlined
              errors={errors}
            />
          )}
        </div>
      </div>

      <Divider />

      <div className='flex justify-between my-10 flex-col items-baseline md:items-center md:flex-row'>
        <Typography type='h5' weight='normal' className='mb-4 md:mb-0'>
            {t('drive_tyres')}*
        </Typography>
        <div className='flex w-max gap-2'>
          {isProductDetailsLoading ? (
            <>Loading</>
          ) : (
            <Tag
              name='drive_tires_id'
              control={control}
              options={productDetails?.drive_tires}
              height='h-12'
              errors={errors}
            />
          )}
        </div>
      </div>
      <Divider />

      <div className='flex justify-between my-10 flex-col items-baseline md:items-center md:flex-row'>
        <Typography type='h5' weight='normal' className='mb-4 md:mb-0'>
            {t('steering_wheel')}*
        </Typography>
        <div className='flex w-max gap-2'>
          {isProductDetailsLoading ? (
            <>Loading</>
          ) : (
            <Tag
              name='steering_wheel'
              control={control}
              options={steeringWheel}
              height='h-12'
              errors={errors}
            />
          )}
        </div>
      </div>
      <Divider />

      <div className='flex justify-between my-10 flex-col items-baseline md:items-center md:flex-row'>
        <Typography type='h5' weight='normal' className='mb-4 md:mb-0'>
            {t('transmission')}*
        </Typography>
        <div className='flex w-max gap-2'>
          {isProductDetailsLoading ? (
            <>Loading</>
          ) : (
            <Tag
              name='transmission_type_id'
              control={control}
              options={productDetails?.transmission_types}
              height='h-12'
              errors={errors}
            />
          )}
        </div>
      </div>
      <Divider />

      <Typography type='h5' weight='normal' className='mt-6'>
          {t('additional_parameters')}
      </Typography>
      <Typography type='body' color='light'>
          {t('select_one_or_more_parameter')}
      </Typography>
      <div className='py-9 grid grid-cols-1'>
        {isAdditionalParamsLoading ? (
          <>Loading</>
        ) : (
          <CheckboxField
            name={`additional_options`}
            control={control}
            options={additionalParams}
            append={() => appendAdditionalParam(appendAdditionalParam)}
            className='my-2'
            cols
          />
        )}
      </div>
    </div>
  )
}

export default StepTwo
