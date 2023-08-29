import React from 'react'
import { HeaderContainer } from 'src/styled/styles'
import Header from 'src/views/components/header'

interface Props {
  children?: any,
  fullWidth?:boolean
}

const DefaultLayout = ({ children, fullWidth }: Props) => {
  return (
    <main>
      <HeaderContainer style={{position: 'sticky'}} className={`${fullWidth?'w-full px-10':'max-w-[1470px] px-2 laptop:px-8 2xl:px-0'}`}>
        <Header />
      </HeaderContainer>
      <div>{children}</div>
    </main>
  )
}

export default DefaultLayout
