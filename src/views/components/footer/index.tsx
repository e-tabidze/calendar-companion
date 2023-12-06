import React from 'react'
import LanguagePicker from "src/views/components/defaultHeader/languagePicker";
import Tnet from "src/views/components/footer/Tnet";
import Navigation from "src/views/components/footer/Navigation";
import Help from "src/views/components/footer/Help";
import Categories from "src/views/components/footer/Catetgories";
import Social from "src/views/components/footer/Social";
import Rules from "src/views/components/footer/Rules";
import Apps from "src/views/components/footer/Apps";

const Footer = () => {
    return (
        <footer className="max-w-[1470px] mx-auto rounded-[24px] lg:rounded-none bg-[#ffffff] mt-[32px] pb-[80px] lg:pb-0 px-5 lg:px-8 2xl:px-0">
            <div className="lg:border-b-[1px] lg:border-[#E9EAEB] pb-[32px] pt-[32px] lg:pt-[40px] lg:[pb-56px]">
                    <div className="mx-auto">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <Apps/>
                            <div className="flex lg:hidden">
                                <Social/>
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
                               <Rules/>
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
