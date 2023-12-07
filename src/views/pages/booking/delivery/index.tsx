import Image from 'next/image'
import Typography from '../../../components/typography'
import SelectField from '../../../components/selectField'
import { DefaultInput } from 'src/views/components/input'
import { generateTimeOptions } from 'src/utils/timeValues'
import { useWatch } from 'react-hook-form'

interface Props {
  control?: any
  toggleEditModal: any
}

const Delivery: React.FC<Props> = ({ control, toggleEditModal }) => {
  const formsState = useWatch({ control })

  return (
    <div className='pl-13 mt-4'>
      <div className='flex items-center'>
        <div className='w-3/12 flex items-start'>
          <Image src='/icons/start.svg' alt='' height={24} width={24} />
          <div className='flex flex-col ml-3'>
            <span className='text-sm'>მიწოდება</span>

            {/* <span className='text-sm text-black/60'>15 ივნ</span> */}
          </div>
        </div>
        <div className='w-8/12 pr-4'>
          <DefaultInput name='start_address' control={control} />
        </div>
        <div className='w-2/12'>
          <SelectField
            control={control}
            valueKey='value'
            labelKey='label'
            name='start_time'
            options={generateTimeOptions()}
            placeholder='დრო'
            className='bg-transparent border-green-100'
          />
        </div>
      </div>
      <div className='flex items-center mt-3'>
        <div className='w-2/12 flex items-start'>
          <Image src='/icons/stop.svg' alt='' height={24} width={24} />

          <div className='flex flex-col ml-3'>
            <span className='text-sm'>დაბრუნება</span>
            <span className='text-sm text-black/60'>20 ივნ</span>
          </div>
        </div>
        <div className='w-6/12'>
          <Typography type='body' className='text-2sm ml-10'>
            {formsState?.end_address}
          </Typography>
        </div>
        <div className='w-4/12 flex justify-between'>
          <SelectField
            control={control}
            valueKey='value'
            labelKey='label'
            name='end_time'
            options={generateTimeOptions()}
            placeholder='დრო'
            className='bg-transparent border-green-100'
          />
          <button
            onClick={toggleEditModal}
            className='ml-4 border border-black flex items-center justify-center h-[48px] rounded-xl text-sm px-6'
          >
            შეცვლა
          </button>
        </div>
      </div>
    </div>
  )
}

export default Delivery
