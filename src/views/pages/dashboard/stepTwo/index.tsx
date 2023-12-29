import useWindowDimensions from 'src/hooks/useWindowDimensions'
import CategoryCard from 'src/views/components/categoryCard'
import useProductInfo from '../useProductInfo'
import dynamic from 'next/dynamic'
import useFilters from 'src/hooks/useFilters'

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

  return (
    <div>
      <Typography type='h4' color='dark'>
        ავტომობილის კატეგორია*
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
        საწვავის ტიპი*
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
        ადგილების რაოდენობა*
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
        ჩემოდნების რაოდენობა*
      </Typography>
      <div className='flex flex-wrap gap-4 my-6'>
        <Tag name='luggage_numbers' control={control} options={suitcases} height='h-10' errors={errors} />
      </div>
      <Divider />
      <div className='flex justify-between my-10 flex-col items-baseline md:items-center md:flex-row'>
        <Typography type='h5' weight='normal' className=' mb-4 md:mb-0'>
          კარის რაოდენობა*
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
          წამყვანი საბურავები*
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
          საჭე*
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
          ტრანსმისია*
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
        დამატებითი პარამეტრები
      </Typography>
      <Typography type='body' color='light'>
        შეგიძლია მონიშნო ერთი ან რამდენიმე პარამეტრი
      </Typography>
      <div className='py-9 grid grid-cols-1 md:grid-cols-2'>
        {isAdditionalParamsLoading ? (
          <>Loading</>
        ) : (
          <CheckboxField
            name={`additional_options`}
            control={control}
            options={additionalParams}
            append={() => appendAdditionalParam(appendAdditionalParam)}
            className='my-2'
          />
        )}
      </div>
    </div>
  )
}

export default StepTwo
