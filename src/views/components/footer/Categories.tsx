import React, { useState } from 'react'
import Typography from "src/views/components/typography";
import Icon from "src/views/app/Icon";
import useFilters from "src/hooks/useFilters";
import CategoryLink from "src/views/components/footer/CategoryLink";


const Categories = () => {
    const [active, setActive] = useState(false)

    const handleSetActive = () => {
        setActive(!active)
    }
    const { categoriesFilter } = useFilters()

    return (
        <div className="py-4 lg:py-0 border-b-[1px] border-raisin-10 lg:border-0">
            <Typography type='h5' weight='medium' className="flex items-center justify-between font-medium text-md lg:text-3md text-raisin-100" onClick={handleSetActive}>
                კატეგორიები
                <span className={`${active?'rotate-180':''} flex lg:hidden transition-all`}>
                    <Icon svgPath='footer-arrow' width={24} height={24}/>
               </span>
            </Typography>
            <div className={`${active?'block':'hidden'} lg:block`}>
                <div className="lg:flex lg:justify-between">
                    <ul className="mt-4 lg:mt-6">
                          {categoriesFilter
                                ?.sort(
                                    (a: { count_products: number }, b: { count_products: number }) => b.count_products - a.count_products
                                )
                                ?.map((product: any) => (

                            <li className='mb-2' key={product?.id}>
                                <CategoryLink
                                    title={product?.title}
                                    id={product?.id}
                                />
                            </li>

                        ))}
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Categories
