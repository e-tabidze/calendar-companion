import SelectField from '../../../components/selectField'
import { DefaultInput } from 'src/views/components/input'
import { generateTimeOptions } from 'src/utils/timeValues'
import { useWatch } from 'react-hook-form'
import dynamic from 'next/dynamic'
import { format } from 'date-fns'
import { ka } from 'date-fns/locale'

const Typography = dynamic(() => import('../../../components/typography'), { ssr: false })
const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })

interface Props {
  control?: any
  toggleEditModal: any
  errors: any
}

const Delivery: React.FC<Props> = ({ control, toggleEditModal, errors }) => {
  const formState = useWatch({ control })

  return (
    <div className='pl-13 mt-4'>
      <div className='flex flex-col lg:flex-row lg:items-center pb-6 border-b-1 border-green-40'>
        <div className='lg:w-2/12 flex items-center lg:items-start'>
          <Icon svgPath='booking-start' height={24} width={24} className='fill-transparent flex shrink-0' />
          <div className='flex flex-col ml-3'>
            <span className='text-sm'>წაყვანა</span>
            <span className='hidden lg:flex text-sm text-black/60'>
              {formState.booking.book_from &&
                format(new Date(String(formState.booking.book_from)), 'd MMM yyyy', { locale: ka })}
            </span>
          </div>
        </div>
        <div className='lg:w-8/12 pl-9 lg:pl-0 mb-3 lg:mb-0'>
          <DefaultInput name='start_address' control={control} label='შეიყვანე მისამართი' />
        </div>
        <div className='lg:w-2/12 flex items-center pl-9 lg:pl-4'>
          <span className='flex lg:hidden text-sm text-black/60 mr-3'>
            {formState.booking.book_from &&
              format(new Date(String(formState.booking.book_from)), 'd MMM yyyy', { locale: ka })}
          </span>
          <SelectField
            control={control}
            valueKey='value'
            labelKey='label'
            name='start_time'
            options={generateTimeOptions()}
            placeholder='დრო*'
            className='bg-transparent border-green-100 shrink-0 w-full'
            errors={errors}
            errorAbsolute
            errorRight
          />
        </div>
      </div>
      <div className='flex flex-col lg:flex-row lg:items-center mt-3 pb-6 lg:pb-0 border-b-1 border-green-40 lg:border-none'>
        <div className='lg:w-2/12 flex items-start'>
          <Icon svgPath='booking-stop' width={24} height={24} className='fill-transparent flex shrink-0' />
          <div className='flex flex-col ml-3'>
            <span className='text-sm'>დაბრუნება</span>
            <span className='hidden lg:flex text-sm text-black/60'>
              {formState.booking.book_to &&
                format(new Date(String(formState.booking.book_to)), 'd MMM yyyy', { locale: ka })}
            </span>
          </div>
        </div>
        <div className='lg:w-8/12 flex flex-col lg:flex-row lg:items-center lg:justify-between'>
          <Typography type='body' className='text-2sm ml-10 lg:ml-0 mb-3 lg:mb-0'>
            {formState?.end_address}
          </Typography>
          <div className='flex shrink-0 items-center pl-9 lg:pl-0'>
            <span className='flex lg:hidden text-sm text-black/60 mr-3'>
              {formState.booking.book_to &&
                format(new Date(String(formState.booking.book_to)), 'd MMM yyyy', { locale: ka })}
            </span>
            <SelectField
              control={control}
              valueKey='value'
              labelKey='label'
              name='end_time'
              options={generateTimeOptions()}
              placeholder='დრო*'
              className='bg-transparent border-green-100'
              errors={errors}
              errorAbsolute
            />
          </div>
        </div>
        <div className='lg:w-2/12 flex items-center lg:justify-between pl-9 lg:pl-4'>
          <button
            onClick={toggleEditModal}
            className='hidden lg:flex border border-black items-center justify-center h-14 rounded-xl text-sm px-6'
          >
            შეცვლა
          </button>
        </div>
      </div>
      <button
        onClick={toggleEditModal}
        className='flex lg:hidden mt-5 ml-auto border border-black items-center justify-center h-6 rounded-lg text-sm px-2'
      >
        შეცვლა
      </button>
    </div>
  )
}

export default Delivery
