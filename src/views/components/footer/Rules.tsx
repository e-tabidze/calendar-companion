import React from 'react'
import {useTranslation} from "next-i18next";


const Rules = () => {
    const {t} = useTranslation()

    return (

            <ul className="flex flex-col lg:flex-row">
                <li className="mr-6 xl:mr-8 mb-2"><a
                    className="font-normal text-sm lg:text-2sm text-raisin-70 hover:text-raisin-100 transition-all underline"
                    href="https://auth.tnet.ge/ka/rules" target="_blank" rel="noreferrer">{t('rules')}</a></li>
                <li className="mr-6 xl:mr-8 mb-2"><a
                    className="font-normal text-sm lg:text-2sm text-raisin-70 hover:text-raisin-100 transition-all underline"
                    href="https://auth.tnet.ge/ka/usageagreement" target="_blank" rel="noreferrer">{t('confidence_politics')}</a></li>
                <li className="mr-6 xl:mr-8 mb-2"><a
                    className="font-normal text-sm lg:text-2sm text-raisin-70 hover:text-raisin-100 transition-all underline"
                    href="https://auth.tnet.ge/ka/environmental" target="_blank" rel="noreferrer">{t('environmental_politics')}</a></li>
            </ul>
    )
}

export default Rules
