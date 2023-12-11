import Typography from "../typography";
import Icon from "src/views/app/Icon";

const BookingCard = ()  => {


    return (
        <div className="bg-white rounded-[20px] px-6 py-5 w-[400px]">
            <Typography type='body' className="text-md mb-10">
                იაკობ ცურტაველის #222
            </Typography>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 mr-4">
                        <Icon svgPath='check' width={14} height={10} className='fill-transparent'/>
                    </div>
                    <Icon svgPath='start' width={24} height={24} className='fill-transparent mr-4' />
                    წაყვანა
                </div>
                <div className="flex items-center text-2sm">
                    <Icon svgPath='booking-time' width={24} height={24} className='fill-transparent mr-3' />
                    13:00
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full border border-black mr-4">
                    </div>
                    <Icon svgPath='stop' width={24} height={24} className='fill-transparent mr-4' />
                    დაბრუნება
                </div>
                <div className="flex items-center text-2sm">
                    <Icon svgPath='booking-time' width={24} height={24} className='fill-transparent mr-3' />
                    13:00
                </div>
            </div>
        </div>
    )
}

export default BookingCard
