import { useState } from 'react'
import Image from "../../image";
import TnetMenu from "../tnetMenu";

const TnetBtn = () => {
    const [tnet, toggleTnet] = useState(false)

    return (
        <div className="flex md:hidden">
            <button onClick={() => toggleTnet(!tnet)}>
                <Image src='/icons/tnet/tnet.svg' alt='' />
            </button>
            <TnetMenu open={tnet} setOpen={() => toggleTnet(!tnet)} />
        </div>
    )
}

export default TnetBtn
