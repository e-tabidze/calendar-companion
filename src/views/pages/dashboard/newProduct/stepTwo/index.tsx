import useWindowDimensions from 'src/hooks/useWindowDimensions'
import CategoryCard from 'src/views/components/categoryCard'
import CheckboxField from 'src/views/components/checkboxField'
import Divider from 'src/views/components/divider'
import SelectField from 'src/views/components/selectField'
import Tag from 'src/views/components/tag'
import Typography from 'src/views/components/typography'
import useProductInfo from '../useProductInfo'

interface Props {
  control: any
  appendAdditionalParam: any
  step: number
}

const suitcases = [
  { title: 1, id: 1 },
  { title: 2, id: 2 },
  { title: 3, id: 3 },
  { title: 4, id: 4 },
  { title: 5, id: 5 }
]

const StepTwo: React.FC<Props> = ({ control, appendAdditionalParam, step }) => {
  const { width } = useWindowDimensions()
  const { productDetails, additionalParams, isProductDetailsLoading, isAdditionalParamsLoading } = useProductInfo(step)

  return (
    <div>
      <Typography type='h4' color='dark'>
        ავტომობილის კატეგორია
      </Typography>
      {isProductDetailsLoading ? (
        <>Loading</>
      ) : (
        <>
          {width > 779 ? (
            <div className='flex flex-wrap gap-4 my-6'>
              <CategoryCard name='category_id' control={control} options={productDetails?.categories} border />
            </div>
          ) : (
            <SelectField
              control={control}
              name='category_id'
              options={productDetails?.categories}
              placeholder='კატეგორია'
              valueKey='id'
              labelKey='title'
            />
          )}
        </>
      )}

      <Typography type='h4' color='dark' className='mt-14'>
        საწვავის ტიპი
      </Typography>
      <div className='flex flex-wrap gap-3 my-6'>
        {isProductDetailsLoading ? (
          <>Loading</>
        ) : (
          <Tag name='fuel_type_id' control={control} options={productDetails?.fuel_types} height='h-12' outlined />
        )}
      </div>
      <Typography type='h5' weight='normal' className=' mt-14'>
        ადგილების რაოდენობა
      </Typography>
      <div className='flex flex-wrap gap-4 my-6'>
        {isProductDetailsLoading ? (
          <>Loading</>
        ) : (
          <Tag name='seat_type_id' control={control} options={productDetails?.seat_types} height='h-12' />
        )}
      </div>
      <Typography type='h5' weight='normal' className=' mt-14'>
        ჩემოდნების რაოდენობა
      </Typography>
      <div className='flex flex-wrap gap-4 my-6'>
        <Tag name='suitcases' control={control} options={suitcases} height='h-10' />
      </div>
      <Divider />
      <div className='flex justify-between my-10 flex-col items-baseline md:items-center md:flex-row'>
        <Typography type='h5' weight='normal' className=' mb-4 md:mb-0'>
          კარის რაოდენობა
        </Typography>
        <div className='flex w-max gap-2'>
          {isProductDetailsLoading ? (
            <>Loading</>
          ) : (
            <Tag name='door_type_id' control={control} options={productDetails?.door_types} height='h-12' outlined />
          )}
        </div>
      </div>

      <Divider />

      <div className='flex justify-between my-10 flex-col items-baseline md:items-center md:flex-row'>
        <Typography type='h5' weight='normal' className='mb-4 md:mb-0'>
          წამყვანი საბურავები
        </Typography>
        <div className='flex w-max gap-2'>
          {isProductDetailsLoading ? (
            <>Loading</>
          ) : (
            <Tag name='drive_tires_id' control={control} options={productDetails?.drive_tires} height='h-12' />
          )}
        </div>
      </div>
      <Divider />

      <div className='flex justify-between my-10 flex-col items-baseline md:items-center md:flex-row'>
        <Typography type='h5' weight='normal' className='mb-4 md:mb-0'>
          ტრანსმისია
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
          <div className='my-2'>
            <CheckboxField
              name={`additional_options`}
              control={control}
              options={additionalParams}
              append={() => appendAdditionalParam(appendAdditionalParam)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default StepTwo
