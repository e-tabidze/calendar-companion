import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'

const Vehicles = () => {
  const { width } = useWindowDimensions()

  return (
    <div className='border border-raisin-10 rounded-2xl mt-11 md:px-8'>
      <div className='flex justify-between items-center my-4 px-2'>
        <Typography type='h3' className='text-md md:text-2lg'>
          ავტომობილები
        </Typography>
        <div className='flex md:hidden gap-4 md:gap-8'>
          <IconTextButton label={width > 779 ? 'ფილტრი' : ''} icon='filters' width={22} height={20}/>
          <IconTextButton label={width > 779 ? 'სორტირება' : ''} icon='sort' width={20} height={12} />
        </div>
      </div>
      <Divider />
      <div className='hidden lg:flex gap-3 mt-8'>

        {/* {filters.map(filter => (
          <Tag label={filter.label} height='h-10' key={filter.id} className='rounded-xl' />
        ))} */}
      </div>
      <div>
        ASDFGH

        {/* <VehicleListComponent />
        <VehicleListComponent />
        <VehicleListComponent /> */}
      </div>
    </div>
  )
}

export default Vehicles
