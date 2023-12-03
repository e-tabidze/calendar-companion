import { useWatch } from 'react-hook-form'
import { generateTimeOptions } from 'src/utils/timeValues'
import Icon from 'src/views/app/Icon'
import SelectField from 'src/views/components/selectField'
import Typography from 'src/views/components/typography'

interface Props {
  control: any
  toggleEditModal: () => void
}

const TakeAway: React.FC<Props> = ({ control, toggleEditModal }) => {
  const formsState = useWatch({ control })

  console.log(formsState, 'formsTate')

  return (
    <div className='pl-[52px] mt-4'>
      <div className='flex items-center'>
        <div className='w-2/12 flex items-start'>
          <Icon svgPath='start' height={24} width={24} />

          <div className='flex flex-col ml-[12px]'>
            <span className='text-[12px]'>წაყვანა</span>
            <span className='text-[12px] text-black/60'>15 ივნ</span>
          </div>
        </div>
        <div className='w-6/12'>
          <Typography type='body' className='text-[14px] ml-[40px]'>
            {formsState?.start_address}
          </Typography>
        </div>
        <div className='w-4/12 flex justify-between'>
          <SelectField
            control={control}
            valueKey='vaue'
            labelKey='label'
            name='start_time'
            options={generateTimeOptions()}
            placeholder='დრო'
            className='bg-transparent border-green-100'
          />
          <button
            onClick={toggleEditModal}
            className='ml-[16px] border border-black flex items-center justify-center h-[48px] rounded-[12px] text-[12px] px-[24px]'
          >
            შეცვლა
          </button>
        </div>
      </div>
      <div className='flex items-center mt-[12px]'>
        <div className='w-2/12 flex items-start'>
          <Icon svgPath='stop' height={24} width={24} />

          <div className='flex flex-col ml-[12px]'>
            <span className='text-[12px]'>დაბრუნება</span>
            <span className='text-[12px] text-black/60'>20 ივნ</span>
          </div>
        </div>
        <div className='w-6/12'>
          <Typography type='body' className='text-[14px] ml-[40px]'>
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
        </div>
      </div>
    </div>
  )
}

export default TakeAway
