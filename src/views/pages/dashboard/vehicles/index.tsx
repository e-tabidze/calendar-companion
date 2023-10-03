import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Pagination from 'src/views/components/pagination'
import Tag from 'src/views/components/tag'
import Typography from 'src/views/components/typography'
import VehicleListComponent from 'src/views/pages/dashboard/components/vehicleListComponent'

const filters = [
  {
    label: 'ყველა',
    id: '1'
  },
  {
    label: 'აქტიური',
    id: '2'
  },
  {
    label: 'გამორთული',
    id: '3'
  },
  {
    label: 'შენახული',
    id: '4'
  },
  {
    label: 'დაბლოკილი',
    id: '5'
  }
]
const Vehicles = () => {
  const { width } = useWindowDimensions()
  
  return (
    <div>
      <div className='border border-raisin-10 rounded-2xl mt-11 md:px-8'>
        <div className='flex justify-between items-center my-4 px-2'>
          <Typography type='h3' className='text-md md:text-2lg'>
            ავტომობილები
          </Typography>
          <div className='flex md:hidden'>
            <IconTextButton label={width > 779 ? 'ფილტრი' : ''} icon={'/icons/filters.svg'} />
            <IconTextButton label={width > 779 ? 'სორტირება' : ''} icon={'/icons/sort.svg'} />
          </div>
        </div>
        <Divider />
        <div className='hidden lg:flex gap-3 mt-8'>
          {filters.map(filter => (
            <Tag label={filter.label} height='h-10' key={filter.id} className='rounded-xl' />
          ))}
        </div>
        <div>
          <VehicleListComponent />
          <VehicleListComponent />
          <VehicleListComponent />
        </div>
      </div>
      <Pagination totalPages={6} onPageChange={() => console.log('change Page')} />
    </div>
  )
}

export default Vehicles
