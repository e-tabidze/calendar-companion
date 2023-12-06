import React from 'react'
import Image from "src/views/components/image";
import Typography from "src/views/components/typography";


const Apps = () => {

    return (

        <div className="flex flex-col lg:flex-row lg:items-center xl:w-6/12 2xl:w-5/12">
            <div className="flex">
                <a target="_blank" rel="noreferrer" className="flex mr-[16px]"
                   href="https://play.google.com/store/apps/details?id=ge.my.myauto">
                    <Image src='/icons/google-play.svg' alt='img' className='max-w-none' width={130} height={40}/>

                </a>
                <a target="_blank" rel="noreferrer" className="flex mr-[16px]"
                   href="https://apps.apple.com/us/app/myauto-ge/id1527978614">
                    <Image src='/icons/app-store.svg' alt='img' className='max-w-none' width={130} height={40}/>
                </a>
            </div>
            <Typography type='body' className="font-normal text-[#686A73] hover:text-[#272A37] transition-all text-[12px] lg:ml-[32px] xl:ml-[40px] mt-[16px] mb-[24px] lg:mt-0 lg:mb-0">
                გადმოწერე აპლიკაცია და მიიღე მუდმივად განახლებული ინფორმაცია
            </Typography>
        </div>
    )
}

export default Apps
