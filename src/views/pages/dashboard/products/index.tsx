import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { Product } from 'src/types/Product'
import { IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Pagination from 'src/views/components/pagination'
import Tag from 'src/views/components/tag'
import Typography from 'src/views/components/typography'
import VehicleListComponent from 'src/views/pages/dashboard/components/vehicleListComponent'
import useProducts from './useProducts'

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
const Products = () => {
  const { width } = useWindowDimensions()
  const { companyProducts } = useProducts()

  console.log(companyProducts, 'companyProducts')

  return (
    <div>
      <div className='border border-raisin-10 rounded-2xl md:px-8'>
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
          {companyProducts?.map((product: any) => (
            <VehicleListComponent
              price={product.price}
              startCity={product.start_city}
              prodYear={product.prod_year}
              modelId={product.model_id}
              manufacturerId={product.man_id}
              active={product.is_active}
            />
          ))}
        </div>
      </div>
      <Pagination totalPages={6} onPageChange={() => console.log('change Page')} />
    </div>
  )
}

export default Products
