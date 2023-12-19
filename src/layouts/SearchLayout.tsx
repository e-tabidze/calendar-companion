import React from 'react'
import DefaultHeader from 'src/views/components/defaultHeader'
import HeaderWrapper from "src/views/components/headerWrapper";
import Footer from "src/views/components/footer";

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
            <Footer/>
        </main>
    )
}

export default SearchLayout
