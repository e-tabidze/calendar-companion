import React, { useState } from 'react'
import Typography from 'src/views/components/typography'
import Icon from 'src/views/app/Icon'
import { useTranslation } from 'next-i18next'
import { dynamicTranslateCities } from 'src/utils/translationUtils'
import useFilters from 'src/hooks/useFilters'

const Cities = () => {
  const { cities } = useFilters()
  const [active, setActive] = useState(false)

  const handleSetActive = () => {
    setActive(!active)
  }
  const { t } = useTranslation()

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
