import Image from "../../image";

const NavigationBar = () => {
    return (
        <div className="lg:hidden bg-[#ffffff] py-[16px] fixed bottom-0 left-0 w-full z-[3] box-shadow-sm">
            <ul className="flex justify-around">
                <li><a title="MyAuto.ge" href="https://www.myauto.ge/ka">
                    <div className="flex flex-col items-center text-[10px]"><span className="flex">
                          <Image src='/icons/home.svg' alt='' width={24} height={24} />
                    </span><span
                        className="mt-[4px]">მთავარი</span></div>
                </a></li>
                <li><a href="https://www.myauto.ge/ka/add">
                    <div className="flex flex-col items-center text-[10px]"><span className="flex">
                       <Image src='/icons/add-outline.svg' alt='' width={24} height={24} />
                    </span><span
                        className="mt-[4px]">დამატება</span></div>
                </a></li>
                <li><a href="https://www.myauto.ge/ka/mypage/favorites">
                    <div className="flex flex-col items-center text-[#686A73]"><span className="flex">
                          <Image src='/icons/favorite.svg' alt='' width={24} height={24} />
                    </span><span className="text-[10px] mt-[4px]">
           ფავორიტები
        </span></div>
                </a></li>
                <li><a href="https://www.myauto.ge/ka/mypage/myads">
                    <div className="flex flex-col items-center text-[#686A73] "><span
                        className="w-[24px] h-[24px] relative flex items-center justify-center rounded-full overflow-hidden">
                        <Image src='/images/avatar.png' alt='' width={24} height={24} />
                    </span><span
                        className="text-[10px] mt-[4px]">პროფილი</span></div>
                </a></li>
            </ul>
        </div>
    )
}

export default NavigationBar
