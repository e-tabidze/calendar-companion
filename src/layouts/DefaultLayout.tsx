import React from 'react'
import { HeaderContainer } from 'src/styled/styles'
import DefaultHeader from 'src/views/components/defaultHeader'

interface Props {
  children?: any,
  fullWidth?:boolean,
  fixedHeader?:boolean
}

const DefaultLayout = ({ children, fullWidth, fixedHeader }: Props) => {
  return (
    <main>
      <HeaderContainer className={`${fixedHeader?'fixed z-[111]':'sticky'} ${fullWidth?'w-full px-10':'max-w-[1470px] px-2 lg:px-8 2xl:px-0'}`}>
        <DefaultHeader />
      </HeaderContainer>
      <div>{children}</div>
    </main>
  )
}

export default DefaultLayout
