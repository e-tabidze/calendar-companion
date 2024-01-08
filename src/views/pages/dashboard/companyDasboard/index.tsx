import useProductInfo from '../useProductInfo'
import IncomingOrders from './incomingOrders'
import SumUp from './sumUp'
import Vehicles from './vehicles'

const CompanyDashboard = () => {
  const { dashboardData } = useProductInfo()

  return (
    <div className='md:px-10 lg:px-0'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8 mt-8 lg:mt-0'>
        <SumUp
          bg='bg-blue-10'
          border='border-blue-100'
          sum={dashboardData?.today_income}
          description='დღევანდელი შემოსავალი'
          icon='gel2x'
        />
        <SumUp
          bg='bg-green-10'
          border='border-green-100'
          sum={dashboardData?.last_month}
          description='ბოლო თვის შემოსავალი'
          icon='gel2x'
        />
        <SumUp
          bg='bg-yellow-10'
          border='border-yellow-100'
          sum={dashboardData?.total_views}
          description='სულ ნახვები'
          icon='eye'
        />
      </div>
      <IncomingOrders />
      <Vehicles />
    </div>
  )
}

export default CompanyDashboard
