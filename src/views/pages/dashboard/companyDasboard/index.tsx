import IncomingOrders from './incomingOrders'
import SumUp from './sumUp'
import Vehicles from './vehicles'

const CompanyDashboard = () => {
  return (
    <div className='p-4 large:p-0'>
      <div className='grid grid-cols-1 tablet:grid-cols-3 gap-4'>
        <SumUp
          bg='bg-blue-10'
          border='border-blue-100'
          sum={1503}
          description='დღევანდელი შემოსავალი'
          icon='/icons/euro.svg'
        />
        <SumUp
          bg='bg-green-10'
          border='border-green-100'
          sum={22114}
          description='ბოლო თვის შემოსავალი'
          icon='/icons/euro.svg'
        />
        <SumUp bg='bg-yellow-10' border='border-yellow-100' sum={881} description='სულ ნახვები' icon='/icons/eye.svg' />
      </div>
      <IncomingOrders />
      <Vehicles />
    </div>
  )
}

export default CompanyDashboard
