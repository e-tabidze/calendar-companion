import IncomingOrders from './incomingOrders'
import SumUp from './sumUp'
import Vehicles from './vehicles'

const CompanyDashboard = () => {
  return (
    <div className='md:px-10 lg:px-0'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <SumUp
          bg='bg-blue-10'
          border='border-blue-100'
          sum={1503}
          description='დღევანდელი შემოსავალი'
          icon='euro'
        />
        <SumUp
          bg='bg-green-10'
          border='border-green-100'
          sum={22114}
          description='ბოლო თვის შემოსავალი'
          icon='euro'
        />
        <SumUp bg='bg-yellow-10' border='border-yellow-100' sum={881} description='სულ ნახვები' icon='eye' />
      </div>
      <IncomingOrders />
      <Vehicles />
    </div>
  )
}

export default CompanyDashboard
