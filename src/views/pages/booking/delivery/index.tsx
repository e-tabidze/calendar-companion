import Typography from '../../../components/typography'
import SelectField from '../../../components/selectField'
import { DefaultInput } from 'src/views/components/input'
import { generateTimeOptions } from 'src/utils/timeValues'
import { useWatch } from 'react-hook-form'
import Icon from "src/views/app/Icon";

interface Props {
  control?: any
  toggleEditModal: any
}

const Delivery: React.FC<Props> = ({ control, toggleEditModal }) => {
  const formsState = useWatch({ control })

  return (
    <div className='pl-13 mt-4'>
      <div className='flex lg:gap-4 flex-col lg:flex-row lg:items-center pb-6 border-b-1 border-green-40'>
        <div className='lg:w-2/12 flex items-center lg:items-start'>
          <Icon svgPath='booking-start' height={24} width={24} className='fill-transparent flex shrink-0'/>
          <div className='flex flex-col ml-3'>
            <span className='text-sm'>წაყვანა</span>
            <span className='hidden lg:flex text-sm text-black/60'>20 ივნ</span>
          </div>
        </div>
        <div className='lg:w-8/12 pl-9 lg:pl-0 mb-3 lg:mb-0'>
          <DefaultInput name='start_address' control={control} label='შეიყვანე მისამართი' />
        </div>
        <div className='lg:w-2/12 flex items-center pl-9 lg:pl-0'>
          <span className='flex lg:hidden text-sm text-black/60 mr-3'>20 ივნ</span>
          <SelectField
            control={control}
            valueKey='value'
            labelKey='label'
            name='start_time'
            options={generateTimeOptions()}
            placeholder='დრო'
            className='bg-transparent border-green-100 flex shrink-0 w-full'
          />
        </div>
      </div>
      <div className='flex lg:gap-4 flex-col lg:flex-row lg:items-center mt-3 pb-6 lg:pb-0 border-b-1 border-green-40 lg:border-none'>
        <div className='lg:w-2/12 flex items-start'>
          <Icon svgPath='booking-stop' width={24} height={24} className='fill-transparent flex shrink-0' />
          <div className='flex flex-col ml-3'>
            <span className='text-sm'>დაბრუნება</span>
            <span className='hidden lg:flex text-sm text-black/60'>20 ივნ</span>
          </div>
        </div>
        <div className='lg:w-8/12 flex flex-col lg:flex-row lg:items-center lg:justify-between'>
          <Typography type='body' className='text-2sm ml-10 mb-3 lg:mb-0'>
            {formsState?.end_address}
          </Typography>
          <div className="flex items-center pl-9 lg:pl-0">
            <span className='flex lg:hidden text-sm text-black/60 mr-3'>20 ივნ</span>
            <SelectField
                control={control}
                valueKey='value'
                labelKey='label'
                name='end_time'
                options={generateTimeOptions()}
                placeholder='დრო'
                className='bg-transparent border-green-100 flex shrink-0'
            />
          </div>
        </div>
        <div className='lg:w-2/12 flex items-center lg:justify-between pl-9 lg:pl-0'>

          <button
            onClick={toggleEditModal}
            className='hidden lg:flex border border-black items-center justify-center h-12 rounded-xl text-sm px-6'
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
