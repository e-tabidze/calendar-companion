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
        <footer className="rounded-3xl lg:rounded-none bg-white mt-8 pb-20 lg:pb-0 px-5 lg:px-8 2xl:px-0">
            <div className="lg:border-b-[1px] lg:border-raisin-10 pb-8 pt-8 lg:pt-10 lg:[pb-56px]">
                    <div className="max-w-[1470px] mx-auto">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                          <Apps/>
                            <div className="flex lg:hidden">
                                <Social/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto">
                    <div className="border-t-[1px] border-raisin-10 lg:border-0 lg:pt-[56px] lg:pb-10">
                        <div className="max-w-[1470px] mx-auto lg:flex">
                            <div className="lg:w-1/2 lg:flex">
                                <Navigation/>
                                <Help/>
                            </div>
                            <div className="lg:w-1/2">
                                <Categories/>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="lg:border-t-[1px] lg:border-raisin-10">
                    <div className="max-w-[1470px] mx-auto">
                        <div className="flex flex-col lg:flex-row lg:items-center 2xl:justify-between py-6">
                            <div className="2xl:w-1/2 flex shrink-0 flex-col lg:flex-row lg:items-center">
                               <Rules/>
                            </div>
                            <div className="2xl:w-1/2 w-full flex justify-between items-center mt-5 lg:mt-0">
                                <LanguagePicker dropdownUp/>
                                <div>TOP.GE</div>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="max-w-[1470px] mx-auto">
                <Tnet/>
            </div>

        </footer>
    )
}

export default Footer
