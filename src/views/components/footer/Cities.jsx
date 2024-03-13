import React, { useState } from 'react'
import Typography from 'src/views/components/typography'
import Icon from 'src/views/app/Icon'
import useSearchLocations from 'src/views/components/defaultHeader/filters/locationDropdown/useSearchLocations'
import { useTranslation } from 'next-i18next'
import { dynamicTranslateCities } from 'src/utils/translationUtils'

const Cities = () => {
  const { cities } = useSearchLocations()
  const [active, setActive] = useState(false)

  const handleSetActive = () => {
    setActive(!active)
  }
  const { t } = useTranslation()

  // const dynamicTranslateCities = (word) => {
  //     switch (word){
  //         case 'თბილისი':
  //             return t('backend_cities.tbilisi');
  //         case 'ბათუმი':
  //             return t('backend_cities.batumi');
  //         case 'გორი':
  //             return t('backend_cities.gori');
  //         case 'ზუგდიდი':
  //             return t('backend_cities.zugdidi');
  //         case 'თელავი':
  //             return t('backend_cities.telavi');
  //         case 'ქუთაისი':
  //             return t('backend_cities.kutaisi');
  //         case 'რუსთავი':
  //             return t('backend_cities.rustavi');
  //         case 'კასპი':
  //             return t('backend_cities.kaspi');
  //         case 'ხაშური':
  //             return t('backend_cities.khashuri');
  //         case 'დედოფლისწყარო':
  //             return t('backend_cities.dedofliswyaro');
  //         case 'წალენჯიხა':
  //             return t('backend_cities.tsalenjikha');
  //         default:
  //             return word
  //     }
  // }

  return (
    <div className='py-4 lg:py-0 border-b-[1px] border-raisin-10 lg:border-0 lg:w-4/12'>
      <Typography
        type='h5'
        weight='medium'
        className='flex items-center justify-between font-medium text-md lg:text-3md text-raisin-100'
        onClick={handleSetActive}
      >
        {t('cities')}
        <span className={`${active ? 'rotate-180' : ''} flex lg:hidden transition-all`}>
          <Icon svgPath='footer-arrow' width={24} height={24} />
        </span>
      </Typography>
      <div className={`${active ? 'block' : 'hidden'} lg:block`}>
        <div className='lg:flex lg:justify-between'>
          <ul className='mt-4 lg:mt-6 lg:w-full lg:flex lg:flex-wrap lg:justify-between'>
            {cities?.map(city => (
              <li key={city?.city} className='lg:w-1/2 mb-2' value={city.city}>
                <Typography
                  className='font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm lg:text-2sm hover:underline'
                  type='subtitle'
                >
                  {/* {dynamicTranslateCities(city.city)} */}
                  {dynamicTranslateCities(city.city, t)}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Cities
