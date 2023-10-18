import React from 'react'
import DefaultHeader from 'src/views/components/defaultHeader'
import HeaderWrapper from "src/views/components/headerWrapper";

interface Props {
    children?: any
}

const SearchLayout = ({ children}: Props) => {
    return (
        <main>
            <HeaderWrapper fixedHeader fullWidth>
                <DefaultHeader />
            </HeaderWrapper>
            <div>{children}</div>
        </main>
    )
}

export default SearchLayout
