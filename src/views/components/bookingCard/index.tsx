import Typography from "../typography";
import Image from "next/image";

const BookingCard = ()  => {


    return (
        <div className="bg-white rounded-[20px] px-6 py-5 w-[400px]">
            <Typography type='body' className="text-md mb-10">
                იაკობ ცურტაველის #222
            </Typography>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 mr-4">
                        <Image src='/icons/check.svg' alt='' height={12} width={16} />
                    </div>
                    <Image src='/icons/start.svg' alt='' height={24} width={24} className="mr-4" />
                    წაყვანა
                </div>
                <div className="flex items-center text-2sm">
                    <Image src='/icons/booking-time.svg' alt='' height={24} width={24} className="mr-3" />
                    13:00
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full border border-black mr-4">
                    </div>
                    <Image src='/icons/stop.svg' alt='' height={24} width={24} className="mr-4" />
                    დაბრუნება
                </div>
                <div className="flex items-center text-2sm">
                    <Image src='/icons/booking-time.svg' alt='' height={24} width={24} className="mr-3" />
                    13:00
                </div>
            </div>
        </div>
    )
}

export default BookingCard
