import React, { useState } from 'react'
import Typography from "src/views/components/typography";
import Icon from "src/views/app/Icon";


const Categories = () => {
    const [active, setActive] = useState(false)

    const handleSetActive = () => {
        setActive(!active)
    }

    return (
        <div className="py-4 lg:py-0 border-b-[1px] border-raisin-10 lg:border-0">
            <Typography type='h5' weight='medium' className="flex items-center justify-between font-medium text-md text-raisin-100" onClick={handleSetActive}>
                კატეგორიები
                <span className={`${active?'rotate-180':''} flex lg:hidden transition-all`}>
                    <Icon svgPath='footer-arrow' width={24} height={24}/>
               </span>
            </Typography>
            <div className={`${active?'block':'hidden'} lg:block`}>
                <div className="lg:flex lg:justify-between">
                    <ul className="mt-4 lg:mt-6  max-h-[344px] overflow-hidden">
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-sedani?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=1">
                            სედანი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-jipi?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=5">
                            ჯიპი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-kupe?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=4">
                            კუპე
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-hechbeqi?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=2">
                            ჰეტჩბექი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-universali?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=3">
                            უნივერსალი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-kabrioleti?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=6">
                            კაბრიოლეტი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-pikapi?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=29">
                            პიკაპი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-miniveni?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=30">
                            მინივენი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-mikroavtobusi?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=7">
                            მიკროავტობუსი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-furgoni?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=13">
                            ფურგონი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-limuzini?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=15">
                            ლიმუზინი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-Сrossover?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=66">
                            კროსოვერი
                        </a></li>
                    </ul>
                    <ul className="mt-4 lg:mt-6  max-h-[344px] overflow-hidden">
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-gamwevi?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=36">
                            გამწევი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-satvirto?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=16">
                            სატვირთო
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-tvitmcleli?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=38">
                            თვითმცლელი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-sasoplo-sameurneo?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=27">
                            სასოფლო-სამეურნეო
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-amwe?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=23">
                            ამწე
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-eqskavatori?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=25">
                            ექსკავატორი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-specteqnika?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=20">
                            სპეც. ტექნიკა
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-misabmeli?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=19">
                            მისაბმელი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-damtvirtveli?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=28">
                            დამტვირთველი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-betonsaqachi-tumbo?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=42">
                            ბეტონსაქაჩი ტუმბო
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-sagzao?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=37">
                            საგზაო
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-sasawyobe-damtvirtveli?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=44">
                            სასაწყობე დამტვირთველი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-kompaqturi-damtvirtveli?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=43">
                            კომპაქტური დამტვირთველი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-satkepni?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=40">
                            სატკეპნი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-avtobusi?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=14">
                            ავტობუსი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-greideri?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=39">
                            გრეიდერი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-macivari?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=45">
                            მაცივარი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-Evacuatori?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=50">
                            ევაკუატორი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-betonmzidi miqseri?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=53">
                            ბეტონმზიდი მიქსერი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-buldozeri?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=24">
                            ბულდოზერი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-samsheneblo?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=26">
                            სამშენებლო
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-furgoni?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=48">
                            ფურგონი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-msubuqi-komerciuli?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=35">
                            მსუბუქი კომერციული
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-generatori?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=41">
                            გენერატორი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-kemperi?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=57">
                            კემპერი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-sawvavmzidi?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=65">
                            საწვავმზიდი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-misabmeli kemperi?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=61">
                            მისაბმელი კემპერი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-Hidravlikuri chakuchi?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=49">
                            ჰიდრავლიკური ჩაქუჩი
                        </a></li>
                    </ul>
                    <ul className="mt-4 lg:mt-6  ">
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-motocikleti?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=17">
                            მოტოციკლეტი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-mopedi?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=31">
                            მოპედი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-kvadrocikli?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=33">
                            კვადროციკლი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-wylis-transporti?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=21">
                            წყლის ტრანსპორტი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-tricikli?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=47">
                            ტრიციკლი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-bagi?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=46">
                            ბაგი
                        </a></li>
                        <li className="mb-2"><a
                            className="font-normal text-[rgba(0,0,0,0.7)] text-sm hover:underline"
                            href="https://www.myauto.ge/ka/s/avtomobilebi-tovlmavali?keyword=&amp;stype=0&amp;currency_id=3&amp;det_search=0&amp;ord=7&amp;category_id=32">
                            თოვლმავალი
                        </a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Categories
