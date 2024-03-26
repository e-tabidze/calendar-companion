import useProductInfo from '../../useProductInfo'
import dynamic from 'next/dynamic'
import DataPlaceHolder from 'src/views/components/dataPlaceholder'
import {useTranslation} from "next-i18next";

const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const VehicleListComponent = dynamic(() => import('../../components/vehicleListComponent'), { ssr: false })

const Vehicles = () => {
  const { dashboardData } = useProductInfo()
    const {t} = useTranslation()

  return (
    <div className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl mt-8'>
      <Typography type='h3' className='text-md md:text-2lg mb-6'>
          {t('cars')}
      </Typography>
      <Divider />
      <div>
        {dashboardData?.products?.length > 0 ? (
          dashboardData?.products?.map((product: any) => (
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
          ))
        ) : (
          <DataPlaceHolder label={t('no_cars_yet')} />
        )}
      </div>
    </div>
  )
}

export default Vehicles
