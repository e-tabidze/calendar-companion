import Image from 'next/image'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import Action from './action'

const VehicleListComponent: React.FC = ({}) => {
  const { width } = useWindowDimensions()

  return (
    <div className='relative'>
      <div className='flex flex-col px-2 py-4 md:w-full justify-between gap-6 md:px-0 md:flex-row md:items-center'>
        <div className='flex gap-6 2xl:gap-6 min-w-max'>
          <Image
            src='/images/car.png'
            alt=''
            height={width > 779 ? 150 : 50}
            width={width > 779 ? 250 : 82}
            className='rounded-lg object-cover'
          />
          <div className='min-w-max'>
            <Typography type='body' color='light'>
              თბილისი
            </Typography>
            <Typography type='subtitle'>Mercedes E Class 2022</Typography>
            <div className='flex items-center gap-10 md:mt-10'>
              <Typography type='h4' weight={width > 779 ? 'medium' : 'normal'} color='dark'>
                27₾ დღე
              </Typography>
              <Typography type='subtitle' className=''>
                გამორთული
              </Typography>
            </div>
          </div>
        </div>
        <div className='hidden md:flex gap-4'>
          <Action bg='bg-green-10' label='ჩართვა' icon='/icons/play.svg' />
          <Action bg='bg-raisin-10' label='რედაქტირება' icon='/icons/edit.svg' />
          <Action bg='bg-raisin-10' label='წაშლა' icon='/icons/trash.svg' />
        </div>
      </div>
      <Image src='/icons/more.svg' alt='' height={13} width={3} className='absolute right-5 top-5 md:hidden' />
      <Divider />
    </div>
  )
}

export default VehicleListComponent
