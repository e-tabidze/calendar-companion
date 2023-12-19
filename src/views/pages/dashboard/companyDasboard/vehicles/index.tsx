import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import VehicleListComponent from '../../components/vehicleListComponent'
import useProductInfo from '../../useProductInfo'

const Vehicles = () => {
  const { dashboardData } = useProductInfo()

  return (
    <div className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl mt-8'>
      <Typography type='h3' className='text-md md:text-2lg mb-6'>
        ავტომობილები
      </Typography>
      <Divider />
      <div>
        {dashboardData?.products?.map((product: any) => (
          <VehicleListComponent
            key={product.id}
            id={product.id}
            price={product.price}
            startCity={product.start_city}
            prodYear={product.prod_year}
            model={product?.manufacturer_model?.title}
            manufacturer={product.manufacturer?.title}
            active={product.is_active}
            filter={''}
            images={product?.images}
          />
        ))}
      </div>
    </div>
  )
}

export default Vehicles
