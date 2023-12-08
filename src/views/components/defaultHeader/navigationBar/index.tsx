import Image from "../../image";
import {useState} from "react";
import BurgerMenu from "src/views/components/defaultHeader/burgerMenu";
import useProfile from "../../../../hooks/useProfile";

const NavigationBar = () => {
    const [burger, toggleBurger] = useState(false)
    const {activeCompany } = useProfile()

    return (
        <div className="lg:hidden bg-[#ffffff] py-4 fixed bottom-0 left-0 w-full z-[111] box-shadow-sm">
            <ul className="flex justify-around">
                <li>
                    <a href={`${activeCompany ? 'dashboard':'main'}`}>
                        <div className="flex flex-col items-center text-[10px]">
                            <span className="flex">
                              <Image src='/icons/home.svg' alt='' width={24} height={24} />
                            </span>
                            {activeCompany ?
                            <span className="mt-1">დეშბორდი</span> :
                            <span className="mt-1">მთავარი</span>
                            }
                        </div>
                    </a>
                </li>
                {activeCompany && (
                <li>
                    <a href="">
                        <div className="flex flex-col items-center text-[10px]">
                            <span className="flex">
                                <Image src='/icons/add-outline.svg' alt='' width={24} height={24}/>
                            </span>
                            <span className="mt-1">დამატება</span>
                        </div>
                    </a>
                </li>
                )}

                {!activeCompany && (
                <li>
                    <a href="https://www.myauto.ge/ka/mypage/favorites">
                        <div className="flex flex-col items-center text-[#686A73]">
                                <span className="flex">
                                    <Image src='/icons/favorite.svg' alt='' width={24} height={24}/>
                                </span>
                            <span className="text-[10px] mt-1">ფავორიტები</span>
                        </div>
                    </a>
                </li>
                )}
                <li>
                    <a href="">
                        <div className="flex flex-col items-center text-[#686A73]">
                            <span className="flex">
                                <Image src='/icons/bell.svg' alt='' width={24} height={24}/>
                            </span>
                            <span className="text-[10px] mt-1">შეტყობინებები</span>
                        </div>
                    </a>
                </li>

                <li>
                    <button onClick={() => toggleBurger(!burger)}>
                        <div className="flex flex-col items-center text-[#686A73]">
                            <span className="w-6 h-6 relative flex items-center justify-center rounded-full overflow-hidden">
                                <Image src='/images/avatar.png' alt='' width={24} height={24} />
                            </span>
                            <span className="text-[10px] mt-1">პროფილი</span>
                        </div>
                    </button>
                    <BurgerMenu open={burger} setOpen={() => toggleBurger(!burger)} />
                </li>
                {/*TODO autharization btn*/}
                {/*<li>*/}
                {/*    <button*/}
                {/*        className="flex flex-col items-center text-[#686A73] text-[10px]"*/}
                {/*    >*/}
                {/*        <Image src='/icons/auth.svg' alt='' width={24} height={24}/>*/}
                {/*        შესვლა*/}
                {/*    </button>*/}
                {/*</li>*/}
            </ul>
        </div>
    )
}

export default NavigationBar
