import React from 'react'
import DefaultHeader from 'src/views/components/defaultHeader'
import HeaderWrapper from "src/views/components/headerWrapper";

interface Props {
  children?: any
}

const DefaultLayout = ({ children}: Props) => {
  return (
    <main className="pb-20 lg:pb-0">
        <HeaderWrapper>
            <DefaultHeader />
        </HeaderWrapper>
      <div>{children}</div>
    </main>
  )
}

export default DefaultLayout
