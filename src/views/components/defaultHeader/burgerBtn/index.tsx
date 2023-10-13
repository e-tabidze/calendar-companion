import { useState } from 'react'
import BurgerMenu from "../burgerMenu";
import Image from "../../image";

const BurgerBtn = () => {
    const [burger, toggleBurger] = useState(false)

    return (
        <div className="flex md:hidden mr-[16px]">
            <button onClick={() => toggleBurger(!burger)}>
                <Image src='/icons/burger.svg' alt='' />
            </button>
            <BurgerMenu open={burger} setOpen={() => toggleBurger(!burger)} />
        </div>
    )
}

export default BurgerBtn
