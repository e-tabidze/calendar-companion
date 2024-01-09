import React, { useState } from 'react'
import Typography from 'src/views/components/typography'
import Icon from 'src/views/app/Icon'
import { dashboardRoutes, profileRoutes } from 'src/utils/routes'
import Link from 'next/link'
import useProfile from 'src/hooks/useProfile'

const Navigation = () => {
  const [active, setActive] = useState(false)

  const handleSetActive = () => {
    setActive(!active)
  }
  const { activeCompany, isAuthenticated, handleLogin } = useProfile()

  return (
    <div className='py-4 lg:py-0 border-b-[1px] border-raisin-10 lg:border-0 lg:w-5/12'>
      <Typography
        type='h5'
        weight='medium'
        className='flex items-center justify-between font-medium text-md lg:text-3md text-raisin-100'
        onClick={handleSetActive}
      >
        ნავიგაცია
        <span className={`${active ? 'rotate-180' : ''} flex lg:hidden transition-all`}>
          <Icon svgPath='footer-arrow' width={24} height={24} />
        </span>
      </Typography>
      <ul className={`${active ? 'block' : 'hidden'} lg:block mt-4 lg:mt-6`}>
        {isAuthenticated ? (
          <>
            {activeCompany ? (
              <>
                {dashboardRoutes?.map(route => (
                  <li key={route.id} className='mb-2'>
                    {route.path && (
                      <Link
                        href={route.path}
                        className='font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm lg:text-2sm hover:underline'
                      >
                        {route.item}
                      </Link>
                    )}
                  </li>
                ))}
              </>
            ) : (
              <>
                {profileRoutes?.map(route => (
                  <li key={route.id} className='mb-2'>
                    {route.path && (
                      <Link
                        href={route.path}
                        className='font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm lg:text-2sm hover:underline'
                      >
                        {route.item}
                      </Link>
                    )}
                  </li>
                ))}
              </>
            )}
          </>
        ) : (
          <>
            <li className='mb-2'>
              <button
                className='font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm lg:text-2sm hover:underline'
                onClick={handleLogin}
              >
                შესვლა
              </button>
            </li>
            <li className='mb-2'>
              <button
                className='font-normal text-raisin-70 hover:text-raisin-100 transition-all text-sm lg:text-2sm hover:underline'
                onClick={handleLogin}
              >
                რეგისტრაცია
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default Navigation
