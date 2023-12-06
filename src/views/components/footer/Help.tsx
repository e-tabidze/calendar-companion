import React, { useState } from 'react'
import Image from "src/views/components/image";
import Typography from "src/views/components/typography";


const Help = () => {
    const [active, setActive] = useState(false)

    const handleSetActive = () => {
        setActive(!active)
    }

    return (
        <div className="py-[16px] lg:py-0 border-b-[1px] border-[#E9EAEB] lg:border-0">
            <Typography type='h5' weight='medium' className="flex items-center justify-between font-medium text-[16px] text-[#272A37]" onClick={handleSetActive}>
                დახმარება
                <span className={`${active?'rotate-180':''} flex lg:hidden transition-all`}>
                   <Image src='/icons/footer-arrow.svg' alt='img' width={24} height={24}/>
               </span>
            </Typography>
            <ul className={`${active ? 'block':'hidden'} lg:block mt-[16px] lg:mt-[24px]`}>
                <li className="mb-[8px]"><a
                    className="font-normal text-[#686A73] hover:text-[#272A37] transition-all text-[12px] hover:underline"
                    href="https://www.myauto.ge/ka/help">ხშირად დასმული კითხვები</a></li>
                <li className="mb-[8px]"><a
                    className="font-normal text-[#686A73] hover:text-[#272A37] transition-all text-[12px] hover:underline"
                    href="tel:+995 32 280 00 45">+995 32 280 00 45</a></li>
                <li className="mb-[8px]"><a
                    className="font-normal text-[#686A73] hover:text-[#272A37] transition-all text-[12px] hover:underline"
                    href="mailto:info@myauto.ge">info@myauto.ge</a></li>
            </ul>
            <div className="hidden lg:flex">
                <a href="https://www.facebook.com/MyAuto.GE/"
                   target="_blank" rel="noreferrer"><span
                    className="flex items-center justify-center rounded-full bg-[#F2F3F6] hover:bg-[#DADBDD] w-[48px] h-[48px] mr-[12px] lg:mr-[16px] lg:mt-[16px] transition-all">
                                <Image src='/icons/facebook.svg' alt='img' width={8} height={17}/>
                                                               </span></a>
                <a href="https://www.instagram.com/myauto.ge/"
                   target="_blank" rel="noreferrer"><span
                    className="flex items-center justify-center rounded-full bg-[#F2F3F6] hover:bg-[#DADBDD] w-[48px] h-[48px] mr-[12px] lg:mr-[16px] lg:mt-[16px] transition-all">
                                    <Image src='/icons/instagram.svg' alt='img' width={18} height={18}/>
                                                                          </span></a>
                <a
                    href="https://www.linkedin.com/company/my.ge/" target="_blank" rel="noreferrer"><span
                    className="flex items-center justify-center rounded-full bg-[#F2F3F6] hover:bg-[#DADBDD] w-[48px] h-[48px] mr-[12px] lg:mr-[16px] lg:mt-[16px] transition-all">
                                   <Image src='/icons/linkedin.svg' alt='img' width={16} height={15}/>
                                </span></a></div>
        </div>
    )
}

export default Help
