import React, { useState } from 'react'
import Typography from "src/views/components/typography";

// import Social from "src/views/components/footer/Social";
import Icon from "src/views/app/Icon";


const Help = () => {
    const [active, setActive] = useState(false)

    const handleSetActive = () => {
        setActive(!active)
    }

    return (
        <div className="py-4 lg:py-0 border-b-[1px] border-raisin-10 lg:border-0">
            <Typography type='h5' weight='medium' className="flex items-center justify-between font-medium text-md lg:text-3md text-raisin-100" onClick={handleSetActive}>
                დახმარება
                <span className={`${active?'rotate-180':''} flex lg:hidden transition-all`}>
                    <Icon svgPath='footer-arrow' width={24} height={24}/>
               </span>
            </Typography>
            <ul className={`${active ? 'block':'hidden'} lg:block mt-4 lg:mt-6`}>
                <li className="mb-2"><a
                    className="font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm lg:text-2sm hover:underline"
                    href="https://www.myauto.ge/ka/help">ხშირად დასმული კითხვები</a></li>
                <li className="mb-2"><a
                    className="font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm lg:text-2sm hover:underline"
                    href="tel:+995 32 280 00 45">+995 32 280 00 45</a></li>
                <li className="mb-2"><a
                    className="font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm lg:text-2sm hover:underline"
                    href="mailto:info@myauto.ge">info@myauto.ge</a></li>
            </ul>
            {/*<div className="hidden lg:flex">*/}
            {/*    <Social/>*/}
            {/*</div>*/}
        </div>
    )
}

export default Help
