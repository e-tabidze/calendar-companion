import Carousel from '../../../../components/carousel'
import BookingCard from '../../../../components/bookingCard'

const bookingsArray = [
  <BookingCard key={1} />,
  <BookingCard key={2} />,
  <BookingCard key={3} />,
  <BookingCard key={4} />
]
const BookingMap = () => {
  return (
    <div className='relative'>
      {/*TODO: map*/}
      <div className='bg-raisin-10 h-[550px] w-full'></div>
      <div className='sticky bottom-[30px] left-0 w-full'>
        <Carousel itemsArray={bookingsArray} type='products' />
      </div>
    </div>
  )
}

export default BookingMap
