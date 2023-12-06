import React from 'react'
import Image from "src/views/components/image";
import Typography from "src/views/components/typography";


const Apps = () => {

    return (

        <div className="flex flex-col lg:flex-row lg:items-center xl:w-6/12 2xl:w-5/12">
            <div className="flex">
                <a target="_blank" rel="noreferrer" className="flex mr-4"
                   href="https://play.google.com/store/apps/details?id=ge.my.myauto">
                    <Image src='/icons/google-play.svg' alt='img' className='max-w-none' width={130} height={40}/>

                </a>
                <a target="_blank" rel="noreferrer" className="flex mr-4"
                   href="https://apps.apple.com/us/app/myauto-ge/id1527978614">
                    <Image src='/icons/app-store.svg' alt='img' className='max-w-none' width={130} height={40}/>
                </a>
            </div>
            <Typography type='body' className="font-normal text-[#686A73] hover:text-[#272A37] transition-all text-sm lg:ml-8 xl:ml-10 mt-4 mb-6 lg:mt-0 lg:mb-0">
                გადმოწერე აპლიკაცია და მიიღე მუდმივად განახლებული ინფორმაცია
            </Typography>
        </div>
    )
}

export default Apps
