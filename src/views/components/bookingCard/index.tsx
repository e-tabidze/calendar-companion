import Typography from "../typography";
import Image from "next/image";

const BookingCard = ()  => {


    return (
        <div className="bg-white rounded-[20px] px-[24px] py-[20px] w-[400px]">
            <Typography type='body' className="text-[16px] mb-[40px]">
                იაკობ ცურტაველის #222
            </Typography>
            <div className="flex items-center justify-between mb-[16px]">
                <div className="flex items-center text-[12px]">
                    <div className="w-[24px] h-[24px] flex items-center justify-center rounded-full bg-green-100 mr-[16px]">
                        <Image src='/icons/check.svg' alt='' height={12} width={16} />
                    </div>
                    <Image src='/icons/start.svg' alt='' height={24} width={24} className="mr-[16px]" />
                    წაყვანა
                </div>
                <div className="flex items-center text-[14px]">
                    <Image src='/icons/booking-time.svg' alt='' height={24} width={24} className="mr-[12px]" />
                    13:00
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center text-[12px]">
                    <div className="w-[24px] h-[24px] flex items-center justify-center rounded-full border border-black mr-[16px]">
                    </div>
                    <Image src='/icons/stop.svg' alt='' height={24} width={24} className="mr-[16px]" />
                    დაბრუნება
                </div>
                <div className="flex items-center text-[14px]">
                    <Image src='/icons/booking-time.svg' alt='' height={24} width={24} className="mr-[12px]" />
                    13:00
                </div>
            </div>
        </div>
    )
}

export default BookingCard
