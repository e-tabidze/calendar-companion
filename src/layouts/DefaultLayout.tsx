import React from 'react'
import { HeaderContainer } from 'src/styled/styles'
import Header from 'src/views/components/header'

interface Props {
  children?: any
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <main>
      <HeaderContainer style={{position: 'sticky'}}>
        <Header />
      </HeaderContainer>
      <div>{children}</div>
    </main>
  )
}

export default DefaultLayout
