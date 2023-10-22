import React from 'react'
import {
    HeaderContainer
} from './styles'

interface Props {
    children?: any,
    fullWidth?:boolean,
    fixedHeader?:boolean
}

const HeaderWrapper = ({fixedHeader, fullWidth, children}: Props) => {
    return (
        <HeaderContainer
            className={`${fixedHeader?'fixed z-[111]':'sticky'} ${fullWidth?'px-5 md:px-10':'px-5 lg:px-8 2xl:px-0'}`}>

            <div className={`${fullWidth?'w-full':'max-w-[1470px] mx-auto'}`}>{children}</div>
        </HeaderContainer>
    )
}

export default HeaderWrapper
