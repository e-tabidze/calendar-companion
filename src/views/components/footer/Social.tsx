import React from 'react'
import Icon from "src/views/app/Icon";


const Social = () => {

    return (
            <>
                <a href="https://www.facebook.com/MyAuto.GE/"
                   target="_blank" rel="noreferrer"><span
                    className="flex items-center justify-center rounded-full bg-grey-100 hover:bg-grey-110 w-[48px] h-[48px] mr-3 lg:mr-4 lg:mt-4 transition-all">
                    <Icon svgPath='facebook' width={8} height={17}/>
                                                               </span></a>
                <a href="https://www.instagram.com/myauto.ge/"
                   target="_blank" rel="noreferrer"><span
                    className="flex items-center justify-center rounded-full bg-grey-100 hover:bg-grey-110 w-[48px] h-[48px] mr-3 lg:mr-4 lg:mt-4 transition-all">
                     <Icon svgPath='instagram' width={18} height={18}/>
                                                                          </span></a>
                <a
                    href="https://www.linkedin.com/company/my.ge/" target="_blank" rel="noreferrer"><span
                    className="flex items-center justify-center rounded-full bg-grey-100 hover:bg-grey-110 w-[48px] h-[48px] mr-3 lg:mr-4 lg:mt-4 transition-all">
                       <Icon svgPath='linkedin' width={16} height={15}/>
                      </span></a>
                </>
    )
}

export default Social
