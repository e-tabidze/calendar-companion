import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'

const PriceCalcCard = () => {
  return (
    <div className='shadow-2xl w-full rounded-3xl pt-5 px-4 laptop:px-6 pb-10'>
      <div className='flex items-center gap-2'>
        <Typography type='h3' className='font-bold'>
          27₾
        </Typography>
        <Typography type='h5' weight='normal'>
          / დღე
        </Typography>
      </div>
      <Typography type='body' className='text-green-100 mb-8'>
        Free cancellation
      </Typography>

      <div className='flex gap-3 laptop:items-center mb-6 flex-col laptop:flex-row'>
        <div className='flex gap-2'>
          <Typography type='body' className='text-2sm'>
            June 17 - June 22
          </Typography>
          <Typography type='body' color='light' className='text-2sm'>
            | 6 days
          </Typography>
        </div>
        <div>
          <button className='border border-raisin-100 rounded-xl p-1 text-sm'>შეცვლა</button>
        </div>
      </div>

      <div className='w-full h-px bg-raisin-10' />
      <Typography type='h5' weight='medium' className='mt-8 mb-5 font-bold'>
        ფასების დეტალები
      </Typography>

      <div className='flex gap-2 flex-col justify-between py-2 laptop:items-center laptop:flex-row'>
        <div className='flex gap-2'>
          <Typography type='body' className='text-raisin-100'>
            მანქანის ქირაობის საკომისიო
          </Typography>
          <Typography type='body' color='light'>
            | 6 დღე
          </Typography>
        </div>
        <Typography type='h5' weight='normal'>
          233$
        </Typography>
      </div>

      <div className='flex gap-2 flex-col justify-between py-2 laptop:items-center laptop:flex-row'>
        <Typography type='body' className='text-raisin-100'>
          დაზღვევა - საბაზისო პაკეტი
        </Typography>
        <Typography type='body'>უფასო</Typography>
      </div>

      <div className='flex gap-2 flex-col justify-between py-2 laptop:items-center laptop:flex-row'>
        <Typography type='body' className='text-raisin-100'>
          Taxes and fees
        </Typography>
        <Typography type='body'>უფასო</Typography>
      </div>

      <div className='w-full h-px bg-raisin-10 mt-7' />

      <div className='flex justify-between py-1 pt-4 pb-7'>
        <Typography type='h5' weight='medium' className='font-bold'>
          ჯამი
        </Typography>
        <Typography type='h5' weight='normal' className='text-orange-100'>
          233$
        </Typography>
      </div>

      <DefaultButton bg='bg-orange-100' text='ჯავშნის დაწყება' className='w-full' textColor="text-white" />
    </div>
  )
}

export default PriceCalcCard
