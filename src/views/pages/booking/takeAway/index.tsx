import { useWatch } from 'react-hook-form'
import { generateTimeOptions } from 'src/utils/timeValues'
import SelectField from 'src/views/components/selectField'
import dynamic from 'next/dynamic'
import {useTranslation} from "next-i18next";

const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
interface Props {
  control: any
  toggleEditModal: () => void
  errors: any
  startDate: any
  endDate: any
}

const TakeAway: React.FC<Props> = ({ control, toggleEditModal, errors, startDate, endDate }) => {
  const formState = useWatch({ control })
  const {t} = useTranslation()

  return (
    <div className='pl-13 mt-4'>
      <div className='flex flex-col lg:flex-row lg:items-center pb-6 border-b-1 border-green-40'>
        <div className='lg:w-2/12 flex items-center lg:items-start'>
          <Icon svgPath='booking-start' height={24} width={24} className='fill-transparent flex shrink-0' />
          <div className='ml-3'>
            <Typography type='body' color='dark'>
              წაყვანა
            </Typography>
            <div className='absolute'>
              <Typography type='subtitle' color='light' className='hidden lg:flex'>
                {startDate}
              </Typography>
            </div>
          </div>
        </div>
        <div className='lg:w-8/12 flex flex-col lg:flex-row lg:items-center lg:justify-between'>
          <Typography type='body' className='text-2sm ml-9 mt-2 md:mt-0  mb-3 lg:mb-0'>
            {formState?.start_address}
          </Typography>
          <div className='flex gap-6 shrink-0 items-center pl-9 lg:pl-0'>
            <Typography type='subtitle' color='light' className='flex lg:hidden'>
              {startDate}
            </Typography>
            <SelectField
              icon
              control={control}
              valueKey='value'
              labelKey='label'
              name='start_time'
              options={generateTimeOptions()}
              placeholder='დრო*'
              className='bg-transparent fill-transparent border-green-100 group-color'
              errors={errors}
              errorAbsolute
            />
          </div>
        </div>
        <div className='lg:w-2/12 flex items-center pl-4'>
          <button
            onClick={toggleEditModal}
            className='hidden lg:flex border border-black items-center justify-center h-12 rounded-xl text-sm px-6'
          >
            {t('change')}
          </button>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row lg:items-center mt-5 lg:mt-3 pb-6 lg:pb-0 border-b-1 border-green-40 lg:border-none'>
        <div className='lg:w-2/12 flex items-start'>
          <Icon svgPath='booking-stop' height={24} width={24} className='fill-transparent flex shrink-0' />
          <div className='ml-3'>
            <Typography type='body' color='dark'>
              დაბრუნება
            </Typography>
            <div className='absolute'>
              <Typography type='body' color='light' className='hidden lg:flex'>
                {endDate}
              </Typography>
            </div>
          </div>
        </div>
        <div className='lg:w-8/12 flex flex-col lg:flex-row lg:items-center lg:justify-between'>
          <Typography type='body' className='text-2sm ml-9 mt-2 md:mt-0 mb-3 lg:mb-0'>
            {formState?.end_address}
          </Typography>
          <div className='flex gap-6 shrink-0 items-center pl-9 lg:pl-0'>
            <Typography type='body' color='light' className='flex lg:hidden'>
              {endDate}
            </Typography>
            <SelectField
              control={control}
              icon
              valueKey='value'
              labelKey='label'
              name='end_time'
              options={generateTimeOptions()}
              placeholder='დრო*'
              className='bg-transparent fill-transparent border-green-100 group-color'
              errors={errors}
              errorAbsolute
            />
          </div>
        </div>
        <div className='lg:w-2/12'></div>
      </div>
      <button
        onClick={toggleEditModal}
        className='flex lg:hidden mt-5 ml-auto border border-black items-center justify-center h-8 rounded-lg text-sm px-2'
      >
        {t('change')}
      </button>
    </div>
  )
}

export default TakeAway
