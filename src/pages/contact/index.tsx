import React from 'react'

// ** Interfaces
import { TailwindDiv, TailwindSpan } from 'src/interfaces/tailwind'


// ** Tailwind Styled
import tw from 'tailwind-styled-components'

// ** Styled Components
const ContactBox = tw.div<TailwindDiv>`flex w-full justify-center`
const Title = tw.span<TailwindSpan>`text-4xl`

import { DefaultButton } from 'src/views/components/button'
import DefaultLayout from 'src/layouts/DefaultLayout'
import { CarOutline } from 'src/@core/svg'

const Contact = () => {
    return (
        <DefaultLayout>
            <ContactBox>
                <Title>
                    <CarOutline />
                    <DefaultButton text={'Click Me'} />
                    Contact Page
                </Title>
            </ContactBox>
        </DefaultLayout>

    )
}

export default Contact