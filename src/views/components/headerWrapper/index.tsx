import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { HeaderContainer } from './styles'

interface Props {
  children?: any
  fullWidth?: boolean
  fixedHeader?: boolean
}

const HeaderWrapper = ({ fixedHeader, fullWidth, children }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const threshold = 10

      setIsScrolled(scrollTop > threshold)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <HeaderContainer
      className={`${fixedHeader ? 'sticky z-[111]' : 'sticky'} ${
        fullWidth ? 'px-5 md:px-10' : 'px-5 lg:px-8 2xl:px-0'
      } ${isScrolled && router.asPath === '/'  ? 'shadow-sm' : ''}`}
    >
      <div className={`${fullWidth ? 'w-full' : 'max-w-[1240px] 2xl:max-w-[1470px] mx-auto'}`}>{children}</div>
    </HeaderContainer>
  )
}

export default HeaderWrapper
