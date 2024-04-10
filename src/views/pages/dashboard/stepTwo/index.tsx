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
      {isProductDetailsLoading ? (
        <>Loading</>
      ) : (
        <>
          {width > 779 ? (
              <CategoryCard
                name='category_id'
                control={control}
                options={productDetails?.categories}
                border
                errors={errors}
                title={t('category') + '*'}
              />

          ) : (
            <SelectField
              control={control}
              name='category_id'
              options={productDetails?.categories}
              placeholder={t('category')}
              valueKey='id'
              labelKey='title'
            />
          )}
        </>
      )}
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
            title={t('fuel_type') + '*'}
          />
        )}
      </div>
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
            title={t('seat_type') + '*'}
          />
        )}
      </div>
      <div className='flex flex-wrap gap-4 my-6'>
        <Tag
            name='luggage_numbers'
            control={control}
            options={suitcases}
            height='h-10'
            errors={errors}
            title={t('luggage_type') + '*'}
          />
      </div>
      <Divider />
      <div className='flex justify-between my-6 flex-col items-baseline md:items-center md:flex-row'>
        <div className='flex w-full gap-2'>
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
              title={t('door_types') + '*'}
              fullWidth
            />
          )}
        </div>
      </div>

      <Divider />

      <div className='flex justify-between my-6 flex-col items-baseline md:items-center md:flex-row'>
        <div className='flex w-full gap-2'>
          {isProductDetailsLoading ? (
            <>Loading</>
          ) : (
            <Tag
              name='drive_tires_id'
              control={control}
              options={productDetails?.drive_tires}
              height='h-12'
              errors={errors}
              title={t('drive_wheels') + '*'}
              fullWidth
            />
          )}
        </div>
      </div>
      <Divider />

      <div className='flex justify-between my-6 flex-col items-baseline md:items-center md:flex-row'>
        <div className='flex w-full gap-2'>
          {isProductDetailsLoading ? (
            <>Loading</>
          ) : (
            <Tag
              name='steering_wheel'
              control={control}
              options={steeringWheel}
              height='h-12'
              errors={errors}
              title={t('steering_wheel') + '*'}
              fullWidth
            />
          )}
        </div>
      </div>
      <Divider />

      <div className='flex justify-between my-6 flex-col items-baseline md:items-center md:flex-row'>
        <div className='flex w-full gap-2'>
          {isProductDetailsLoading ? (
            <>Loading</>
          ) : (
            <Tag
              name='transmission_type_id'
              control={control}
              options={productDetails?.transmission_types}
              height='h-12'
              errors={errors}
              title={t('transmission') + '*'}
              fullWidth
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
