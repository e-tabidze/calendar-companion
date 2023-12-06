import React from 'react'
import Image from "src/views/components/image";


const Social = () => {

    return (
            <>
                <a href="https://www.facebook.com/MyAuto.GE/"
                   target="_blank" rel="noreferrer"><span
                    className="flex items-center justify-center rounded-full bg-[#F2F3F6] hover:bg-[#DADBDD] w-[48px] h-[48px] mr-3 lg:mr-4 lg:mt-4 transition-all">
                                <Image src='/icons/facebook.svg' alt='img' width={8} height={17}/>
                                                               </span></a>
                <a href="https://www.instagram.com/myauto.ge/"
                   target="_blank" rel="noreferrer"><span
                    className="flex items-center justify-center rounded-full bg-[#F2F3F6] hover:bg-[#DADBDD] w-[48px] h-[48px] mr-3 lg:mr-4 lg:mt-4 transition-all">
                                    <Image src='/icons/instagram.svg' alt='img' width={18} height={18}/>
                                                                          </span></a>
                <a
                    href="https://www.linkedin.com/company/my.ge/" target="_blank" rel="noreferrer"><span
                    className="flex items-center justify-center rounded-full bg-[#F2F3F6] hover:bg-[#DADBDD] w-[48px] h-[48px] mr-3 lg:mr-4 lg:mt-4 transition-all">
                                   <Image src='/icons/linkedin.svg' alt='img' width={16} height={15}/>
                                </span></a>
                </>
    )
}

export default Social
