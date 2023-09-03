import React from 'react'
import { HeaderContainer } from 'src/styled/styles'
import DefaultHeader from 'src/views/components/defaultHeader'

interface Props {
  children?: any
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <main>
      <HeaderContainer style={{ position: 'sticky' }}>
        <DefaultHeader />
      </HeaderContainer>
      <div>{children}</div>
    </main>
  )
}

export default DefaultLayout
