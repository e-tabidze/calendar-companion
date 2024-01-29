import React from 'react'

// import LanguagePicker from "src/views/components/defaultHeader/languagePicker";
import Tnet from "src/views/components/footer/Tnet";
import Navigation from "src/views/components/footer/Navigation";
import Help from "src/views/components/footer/Help";
import Categories from "src/views/components/footer/Categories";

// import Social from "src/views/components/footer/Social";
import Rules from "src/views/components/footer/Rules";
import {useRouter} from "next/router";
import Cities from "src/views/components/footer/Cities";

const Footer = () => {
    const router = useRouter()

    return (
        <footer className={`${router?.asPath?.startsWith('/details')?'pb-[142px]':'pb-20'} border-t-0 lg:border-t-1 border-raisin-10 rounded-3xl lg:rounded-none bg-white mt-8 lg:pb-0 sm:px-5 lg:px-8 2xl:px-0`}>
                {/*<div className="px-5 sm:px-0 lg:border-b-[1px] lg:border-raisin-10 pb-8 pt-8 lg:pt-10 lg:pb-14">*/}
                {/*    <div className="max-w-[1240px] 2xl:max-w-[1470px] mx-auto">*/}
                {/*        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">*/}
                {/*            <div className="flex lg:hidden">*/}
                {/*                <Social/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="px-5 sm:px-0 mx-auto">
                    <div className="border-t-[1px] border-raisin-10 lg:border-0 lg:pt-14 lg:pb-10">
                        <div className="max-w-[1240px] 2xl:max-w-[1470px] mx-auto lg:flex">
                            <div className="lg:w-1/2 lg:flex">
                                <Navigation/>
                                <Help/>
                            </div>
                            <div className="lg:w-1/4">
                                <Categories/>
                            </div>
                            <div className="lg:w-1/4">
                                <Cities/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-5 sm:px-0 lg:border-t-[1px] lg:border-raisin-10">
                    <div className="max-w-[1240px] 2xl:max-w-[1470px] mx-auto">
                        <div className="flex flex-col lg:flex-row lg:items-center 2xl:justify-between py-6">
                            <div className="2xl:w-1/2 flex shrink-0 flex-col lg:flex-row lg:items-center">
                                <Rules/>
                            </div>
                            <div className="2xl:w-1/2 w-full flex justify-between items-center mt-5 lg:mt-0">

                                {/*<LanguagePicker dropdownUp/>*/}
                                {/*<div>TOP.GE</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            <div className="max-w-[1240px] 2xl:max-w-[1470px] mx-auto">
                <Tnet/>
            </div>

        </footer>
    )
}

export default Footer
