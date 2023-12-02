import Image from 'next/image'
import Typography from '../../../components/typography'
import SelectField from '../../../components/selectField'

interface Props {
  control?: any
  toggleEditModal: any
}

const times = [
  { id: 0, time: '13:00' },
  { id: 1, time: '14:00' }
]

const Delivery: React.FC<Props> = ({ control, toggleEditModal }) => {
  return (
    <div className='pl-[52px] mt-[16px]'>
      <div className='flex items-center'>
        <div className='w-3/12 flex items-start'>
          <Image src='/icons/start.svg' alt='' height={24} width={24} />
          <div className='flex flex-col ml-[12px]'>
            <span className='text-[12px]'>მიწოდება</span>
            <span className='text-[12px] text-black/60'>15 ივნ</span>
          </div>
        </div>
        <div className='w-8/12 pr-[16px]'>
          <input className='bg-white h-[48px] rounded-[12px] w-full px-[16px]' placeholder='შეოყვანე მისამართი' />
        </div>
        <div className='w-2/12'>
          <SelectField
            control={control}
            valueKey='id'
            labelKey='time'
            name='time'
            options={times}
            placeholder='დრო'
            className='bg-transparent border-green-100'
          />
        </div>
      </div>
      <div className='flex items-center mt-[12px]'>
        <div className='w-2/12 flex items-start'>
          <Image src='/icons/stop.svg' alt='' height={24} width={24} />

          <div className='flex flex-col ml-[12px]'>
            <span className='text-[12px]'>დაბრუნება</span>
            <span className='text-[12px] text-black/60'>20 ივნ</span>
          </div>
        </div>
        <div className='w-6/12'>
          <Typography type='body' className='text-[14px] ml-[40px]'>
            თბილისი, იაკობ წურტაველის 72
          </Typography>
        </div>
        <div className='w-4/12 flex justify-between'>
          <SelectField
            control={control}
            valueKey='id'
            labelKey='time'
            name='time'
            options={times}
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
    </div>
  )
}

export default Delivery
