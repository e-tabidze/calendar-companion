import React from 'react'


const Rules = () => {

    return (

            <ul className="flex flex-col lg:flex-row">
                <li className="mr-6 xl:mr-8"><a
                    className="font-normal text-sm text-[#686A73] hover:text-[#272A37] transition-all underline"
                    href="https://auth.my.ge/ka/rules" target="_blank" rel="noreferrer">წესები და პირობები</a></li>
                <li className="mr-6 xl:mr-8"><a
                    className="font-normal text-sm text-[#686A73] hover:text-[#272A37] transition-all underline"
                    href="https://auth.my.ge/ka/usageagreement" target="_blank" rel="noreferrer">კონფიდენციალურობის
                    პოლიტიკა</a></li>
                <li className="mr-6 xl:mr-8"><a
                    className="font-normal text-sm text-[#686A73] hover:text-[#272A37] transition-all underline"
                    href="https://auth.my.ge/ka/environmental" target="_blank" rel="noreferrer">გარემოსდაცვითი
                    პოლიტიკა</a></li>
            </ul>
    )
}

export default Rules
