import useProductInfo from '../useProductInfo'
import IncomingOrders from './incomingOrders'
import SumUp from './sumUp'
import Vehicles from './vehicles'
import {useTranslation} from "next-i18next";

const CompanyDashboard = () => {
  const { dashboardData } = useProductInfo()
    const {t} = useTranslation()

  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8 mt-8 lg:mt-0'>
        <SumUp
          bg='bg-blue-10'
          border='border-blue-100'
          sum={dashboardData?.today_income}
          description={t('today_income')}
          icon='gel2x'
        />
        <SumUp
          bg='bg-green-10'
          border='border-green-100'
          sum={dashboardData?.last_month}
          description={t('last_month_income')}
          icon='gel2x'
        />
        <SumUp
          bg='bg-yellow-10'
          border='border-yellow-100'
          sum={dashboardData?.total_views}
          description={t('total_views')}
          icon='eye'
        />
      </div>
      <IncomingOrders />
      <Vehicles />
    </div>
  )
}

export default CompanyDashboard
