import React, { useState } from 'react'
import Image from "src/views/components/image";
import Typography from "src/views/components/typography";


const Navigation = () => {
    const [active, setActive] = useState(false)

    const handleSetActive = () => {
        setActive(!active)
    }

    return (
        <div className="py-4 lg:py-0 border-b-[1px] border-raisin-10 lg:border-0 lg:w-5/12">
            <Typography type='h5' weight='medium' className="flex items-center justify-between font-medium text-md text-raisin-100" onClick={handleSetActive}>
                ნავიგაცია
                <span className={`${active?'rotate-180':''} flex lg:hidden transition-all`}>
                   <Image src='/icons/footer-arrow.svg' alt='img' width={24} height={24}/>
               </span>
            </Typography>
            <ul className={`${active?'block':'hidden'} lg:block mt-4 lg:mt-6`}>
                <li className="mb-2"><a
                    className="font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm hover:underline"
                    href="https://www.myauto.ge/ka/mypage">ჩემი გვერდი</a></li>
                <li className="mb-2"><a
                    className="font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm hover:underline"
                    target="_blank" rel="noreferrer" href="https://www.myauto.ge/ka/vin">VIN-ის შემოწმება</a></li>
                <li className="mb-2"><a
                    className="font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm hover:underline"
                    href="https://www.myparts.ge/ka/search?pr_type_id=2" target="_blank" rel="noreferrer">ავტოსერვისი</a>
                </li>
                <li className="mb-2"><a
                    className="font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm hover:underline"
                    href="https://www.myparts.ge/ka/search?pr_type_id=4" target="_blank" rel="noreferrer">დაშლილი
                    ავტომობილები</a></li>
                <li className="mb-2"><a
                    className="font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm hover:underline"
                    href="http://videos.police.ge" target="_blank" rel="noreferrer">ვიდეო ჯარიმები</a></li>
                <li className="mb-2"><a
                    className="font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm hover:underline"
                    href="https://parking.tbilisi.gov.ge/" target="_blank" rel="noreferrer">თბილისის
                    პარკინგი</a></li>
                <li className="mb-2"><a
                    className="font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm hover:underline"
                    href="http://martva.myauto.ge" target="_blank" rel="noreferrer">მართვის მოწმობა</a></li>
                <li className="mb-2"><a
                    className="font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm hover:underline"
                    href="https://www.myauto.ge/ka/calculator/maps">ელექტროსატენების რუკა</a></li>
                <li className="mb-2"><a
                    className="font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm hover:underline"
                    href="https://www.myauto.ge/ka/calculator">გაფორმების&nbsp;კალკულატორი</a></li>
                <li className="mb-2"><a
                    className="font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm hover:underline"
                    href="https://www.myauto.ge/ka/calculator/inspection">ინსპექტირების კალკულატორი</a>
                </li>
                <li className="mb-2"><a
                    className="font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm hover:underline"
                    href="https://www.myads.ge/ka/adsmyauto" target="_blank" rel="noreferrer">რეკლამა</a></li>
            </ul>
        </div>
    )
}

export default Navigation
