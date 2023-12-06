import React, { useState } from 'react'
import Image from "src/views/components/image";
import Typography from "src/views/components/typography";


const Tnet = () => {
    const [active, setActive] = useState(false)

    const handleSetActive = () => {
        setActive(!active)
    }

    return (
        <div className="mx-auto">
            <div
                className="flex flex-col xl:flex-row items-center px-[32px] py-[24px] xl:p-0 border border-[#E9EAEB] rounded-[24px] xl:rounded-[64px] bg-[#F4F4F5] xl:bg-[#ffffff]">
                <div className="hidden xl:flex bg-[#3c74ff] rounded-[64px] py-[20px] px-[24px] mr-[32px]">
                    <Image src='/icons/tnet/tineti-white.svg' alt='img' width={80} height={22}/>
                </div>
                <div
                    className="xl:hidden flex justify-between items-center w-full cursor-pointer" onClick={handleSetActive}>
                        <span className="icon-h-22px icon-h-md-26px">
                               <Image src='/icons/tnet/tineti.svg' alt='img' width={104} height={27}/>
                        </span>
                    <span className={`${active? 'rotate-180':''} flex xl:hidden transition-all`}>
                           <Image src='/icons/tnet-arrow.svg' alt='img' width={12} height={8}/>
                     </span>
                </div>
                <div
                    className={`${active? 'block':'hidden'} xl:block pt-[24px] xl:pr-[4px] xl:pt-0 flex-wrap xl:w-full`}>
                    <div className="flex flex-wrap xl:justify-between"><a
                        className="icon-h-20px w-1/3 sm:w-1/4 md:w-1/6 lg:w-auto flex lg:mr-[28px] py-[16px] md:py-[20px] xl:py-0 hover:opacity-70 transition-all"
                        href="https://www.myauto.ge/ka/" target="_blank" rel="noreferrer">
                        <Image src='/icons/tnet/myauto.svg' alt='img' width={66} height={20}/>
                    </a><a
                        className="icon-h-20px w-1/3 sm:w-1/4 md:w-1/6 lg:w-auto flex lg:mr-[28px] py-[16px] md:py-[20px] xl:py-0 hover:opacity-70 transition-all"
                        href="https://www.myparts.ge/ka/" target="_blank" rel="noreferrer">
                        <Image src='/icons/tnet/myparts.svg' alt='img' width={68} height={20}/>
                    </a><a
                        className="icon-h-20px w-1/3 sm:w-1/4 md:w-1/6 lg:w-auto flex lg:mr-[28px] py-[16px] md:py-[20px] xl:py-0 hover:opacity-70 transition-all"
                        href="https://www.myhome.ge/ka/" target="_blank" rel="noreferrer">
                        <Image src='/icons/tnet/myhome.svg' alt='img' width={67} height={20}/>
                    </a><a
                        className="icon-h-20px w-1/3 sm:w-1/4 md:w-1/6 lg:w-auto flex lg:mr-[28px] py-[16px] md:py-[20px] xl:py-0 hover:opacity-70 transition-all"
                        href="https://www.mymarket.ge/ka/" target="_blank" rel="noreferrer">
                        <Image src='/icons/tnet/mymarket.svg' alt='img' width={78} height={20}/>
                    </a><a
                        className="icon-h-20px w-1/3 sm:w-1/4 md:w-1/6 lg:w-auto flex lg:mr-[28px] py-[16px] md:py-[20px] xl:py-0 hover:opacity-70 transition-all"
                        href="https://superapp.tnet.ge/" target="_blank" rel="noreferrer">
                        <Image src='/icons/tnet/super-app.svg' alt='img' width={65} height={20}/>
                    </a><a
                        className="icon-h-12px w-1/3 sm:w-1/4 md:w-1/6 lg:w-auto flex lg:mr-[28px] py-[16px] md:py-[20px] xl:py-0 hover:opacity-70 transition-all"
                        href="https://myshop.ge/" target="_blank" rel="noreferrer">
                        <Image src='/icons/tnet/myshop.svg' alt='img' width={69} height={12}/>
                    </a><a
                        className="icon-h-16px w-1/3 sm:w-1/4 md:w-1/6 lg:w-auto flex lg:mr-[28px] py-[16px] md:py-[20px] xl:py-0 hover:opacity-70 transition-all"
                        href="https://vendoo.ge/" target="_blank" rel="noreferrer">
                        <Image src='/icons/tnet/vendoo.svg' alt='img' width={82} height={18}/>
                    </a><a
                        className="icon-h-16px w-1/3 sm:w-1/4 md:w-1/6 lg:w-auto flex lg:mr-[28px] py-[16px] md:py-[20px] xl:py-0 hover:opacity-70 transition-all"
                        href="https://www.tkt.ge/" target="_blank" rel="noreferrer">
                        <Image src='/icons/tnet/tkt.svg' alt='img' width={67} height={18}/>
                    </a><a
                        className="icon-h-18px w-1/3 sm:w-1/4 md:w-1/6 lg:w-auto flex lg:mr-[28px] py-[16px] md:py-[20px] xl:py-0 hover:opacity-70 transition-all"
                        href="https://www.swoop.ge/" target="_blank" rel="noreferrer">
                        <Image src='/icons/tnet/swoop.svg' alt='img' width={85} height={18}/>
                    </a><a
                        className="icon-h-18px w-1/3 sm:w-1/4 md:w-1/6 lg:w-auto flex lg:mr-[28px] py-[16px] md:py-[20px] xl:py-0 hover:opacity-70 transition-all"
                        href="https://livo.ge/" target="_blank" rel="noreferrer">
                        <Image src='/icons/tnet/livo.svg' alt='img' width={53} height={18}/>
                    </a></div>
                </div>
            </div>
            <div className="flex justify-center pt-[24px] pb-[32px]">
                <Typography type='body' className="font-normal text-[#686A73] text-[12px] text-center">
                    © 2023 ყველა უფლება დაცულია
                </Typography>
            </div>
        </div>
    )
}

export default Tnet
