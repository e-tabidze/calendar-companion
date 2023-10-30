import Image from "../../image";
import {useState} from "react";
import BurgerMenu from "src/views/components/defaultHeader/burgerMenu";

interface Props {
    user: any
}

const NavigationBar:React.FC<Props> = ({user}) => {
    const [burger, toggleBurger] = useState(false)

    return (
        <div className="lg:hidden bg-[#ffffff] py-[16px] fixed bottom-0 left-0 w-full z-[3] box-shadow-sm">
            <ul className="flex justify-around">
                <li>
                    <a href={`${user == 1 ? 'dashboard':'main'}`}>
                        <div className="flex flex-col items-center text-[10px]">
                            <span className="flex">
                              <Image src='/icons/home.svg' alt='' width={24} height={24} />
                            </span>
                            {user == 1 ?
                            <span className="mt-[4px]">დეშბორდი</span> :
                            <span className="mt-[4px]">მთავარი</span>
                            }
                        </div>
                    </a>
                </li>
                {user == 1 &&
                <li>
                    <a href="">
                        <div className="flex flex-col items-center text-[10px]">
                            <span className="flex">
                                <Image src='/icons/add-outline.svg' alt='' width={24} height={24}/>
                            </span>
                            <span className="mt-[4px]">დამატება</span>
                        </div>
                    </a>
                </li>
                }

                {user == 0 &&
                <li>
                    <a href="https://www.myauto.ge/ka/mypage/favorites">
                        <div className="flex flex-col items-center text-[#686A73]">
                                <span className="flex">
                                    <Image src='/icons/favorite.svg' alt='' width={24} height={24}/>
                                </span>
                            <span className="text-[10px] mt-[4px]">ფავორიტები</span>
                        </div>
                    </a>
                </li>
                }
                <li>
                    <a href="">
                        <div className="flex flex-col items-center text-[#686A73]">
                            <span className="flex">
                                <Image src='/icons/bell.svg' alt='' width={24} height={24}/>
                            </span>
                            <span className="text-[10px] mt-[4px]">შეტყობინებები</span>
                        </div>
                    </a>
                </li>

                <li>
                    <button onClick={() => toggleBurger(!burger)}>
                        <div className="flex flex-col items-center text-[#686A73]">
                            <span className="w-[24px] h-[24px] relative flex items-center justify-center rounded-full overflow-hidden">
                                <Image src='/images/avatar.png' alt='' width={24} height={24} />
                            </span>
                            <span className="text-[10px] mt-[4px]">პროფილი</span>
                        </div>
                    </button>
                    <BurgerMenu user={user} open={burger} setOpen={() => toggleBurger(!burger)} />
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
