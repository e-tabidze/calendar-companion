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
            className={`${fixedHeader?'fixed z-[111]':'sticky'} ${fullWidth?'w-full px-5 md:px-10':'max-w-[1470px] px-5 lg:px-8 2xl:px-0'}`}>
            {children}
        </HeaderContainer>
    )
}

export default HeaderWrapper
