import React from 'react'


const Rules = () => {

    return (

            <ul className="flex flex-col lg:flex-row">
                <li className="mr-6 xl:mr-8 mb-2"><a
                    className="font-normal text-sm lg:text-2sm text-raisin-70 hover:text-raisin-100 transition-all underline"
                    href="https://auth.tnet.ge/ka/rules" target="_blank" rel="noreferrer">წესები და პირობები</a></li>
                <li className="mr-6 xl:mr-8 mb-2"><a
                    className="font-normal text-sm lg:text-2sm text-raisin-70 hover:text-raisin-100 transition-all underline"
                    href="https://auth.tnet.ge/ka/usageagreement" target="_blank" rel="noreferrer">კონფიდენციალურობის
                    პოლიტიკა</a></li>
                <li className="mr-6 xl:mr-8 mb-2"><a
                    className="font-normal text-sm lg:text-2sm text-raisin-70 hover:text-raisin-100 transition-all underline"
                    href="https://auth.tnet.ge/ka/environmental" target="_blank" rel="noreferrer">გარემოსდაცვითი
                    პოლიტიკა</a></li>
            </ul>
    )
}

export default Rules
