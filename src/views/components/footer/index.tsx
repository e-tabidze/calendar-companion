import React from 'react'
import Image from "src/views/components/image";
import LanguagePicker from "src/views/components/defaultHeader/languagePicker";
import Tnet from "src/views/components/footer/Tnet";
import Navigation from "src/views/components/footer/Navigation";
import Help from "src/views/components/footer/Help";
import Categories from "src/views/components/footer/Catetgories";
import Typography from "src/views/components/typography";

const Footer = () => {
    return (
        <footer className="rounded-[24px] lg:rounded-none bg-[#ffffff] mt-[32px] pb-[80px] lg:pb-0 px-5 lg:px-8 2xl:px-0">
            <div className="lg:border-b-[1px] lg:border-[#E9EAEB] pb-[32px] pt-[32px] lg:pt-[40px] lg:[pb-56px]">
                    <div className="mx-auto">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
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
                            <div className="flex lg:hidden">
                                <a href="https://www.facebook.com/MyAuto.GE/"
                                                               target="_blank" rel="noreferrer">
                                    <span
                                className="flex items-center justify-center rounded-full bg-[#F2F3F6] hover:bg-[#DADBDD] w-[48px] h-[48px] mr-[12px] lg:mr-[16px] lg:mt-[16px] transition-all">
                                  <Image src='/icons/facebook.svg' alt='img' width={8} height={17}/>
                                </span></a>
                                <a href="https://www.instagram.com/myauto.ge/"
                                   target="_blank" rel="noreferrer">
                                    <span
                                        className="flex items-center justify-center rounded-full bg-[#F2F3F6] hover:bg-[#DADBDD] w-[48px] h-[48px] mr-[12px] lg:mr-[16px] lg:mt-[16px] transition-all">
                                  <Image src='/icons/instagram.svg' alt='img' width={18} height={18}/>
                                </span></a>
                                <a href="https://www.linkedin.com/company/tnetgeorgia/posts/?feedView=all"
                                   target="_blank" rel="noreferrer">
                                    <span
                                        className="flex items-center justify-center rounded-full bg-[#F2F3F6] hover:bg-[#DADBDD] w-[48px] h-[48px] mr-[12px] lg:mr-[16px] lg:mt-[16px] transition-all">
                                  <Image src='/icons/linkedin.svg' alt='img' width={16} height={15}/>
                                </span></a>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="mx-auto">
                    <div className="border-t-[1px] border-[#E9EAEB] lg:border-0 lg:flex lg:pt-[56px] lg:pb-[40px]">
                        <div className="lg:w-1/2 lg:flex">
                            <Navigation/>
                            <Help/>
                        </div>
                        <div className="lg:w-1/2">
                            <Categories/>
                        </div>
                    </div>
                </div>
            <div className="lg:border-t-[1px] lg:border-[#E9EAEB]">
                    <div className="mx-auto">
                        <div className="flex flex-col lg:flex-row lg:items-center 2xl:justify-between py-[24px]">
                            <div className="2xl:w-1/2 flex shrink-0 flex-col lg:flex-row lg:items-center">
                                <ul className="flex flex-col lg:flex-row">
                                    <li className="mr-[24px] xl:mr-[32px]"><a
                                        className="font-normal text-[12px] text-[#686A73] hover:text-[#272A37] transition-all underline"
                                        href="https://auth.my.ge/ka/rules" target="_blank" rel="noreferrer">წესები და პირობები</a></li>
                                    <li className="mr-[24px] xl:mr-[32px]"><a
                                        className="font-normal text-[12px] text-[#686A73] hover:text-[#272A37] transition-all underline"
                                        href="https://auth.my.ge/ka/usageagreement" target="_blank" rel="noreferrer">კონფიდენციალურობის
                                        პოლიტიკა</a></li>
                                    <li className="mr-[24px] xl:mr-[32px]"><a
                                        className="font-normal text-[12px] text-[#686A73] hover:text-[#272A37] transition-all underline"
                                        href="https://auth.my.ge/ka/environmental" target="_blank" rel="noreferrer">გარემოსდაცვითი
                                        პოლიტიკა</a></li>
                                </ul>
                            </div>
                            <div className="2xl:w-1/2 w-full flex justify-between items-center mt-[20px] lg:mt-0">
                                <LanguagePicker dropdownUp/>
                                <div>TOP.GE</div>
                            </div>
                        </div>
                    </div>
                </div>
            <Tnet/>
        </footer>
    )
}

export default Footer
