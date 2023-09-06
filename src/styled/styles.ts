import tw from 'tailwind-styled-components'
import { TailwindDiv } from 'src/interfaces/tailwind'

// headers
export const HeaderContainer = tw.div<TailwindDiv>`top-0 w-full z-40 bg-white m-auto max-w-maxWidth px-2 laptop:px-8`
export const NewListingHeaderContainer = tw.div`sticky top-0 w-full z-40 bg-white m-auto max-w-maxWidth h-20`

// content
export const FullContainer = tw.div<TailwindDiv>`w-full`
export const LargeContainer = tw.div<TailwindDiv>`w-full m-auto max-w-[1470px] px-2 laptop:px-8 2xl:px-0`
export const ContentContainer = tw.div<TailwindDiv>`w-full m-auto max-w-[1240px] px-4 laptop:px-8 2xl:px-0`
export const ResponsiveContainer = tw.div<TailwindDiv>`w-full max-w-maxWidth px-0 laptop:px-8 2xl:px-0`
export const MaxWidthContainer = tw.div<TailwindDiv>`w-full m-auto max-w-maxWidth`
export const ExtraSmallContainer = tw.div<TailwindDiv>`w-full max-w-[850px] m-auto px-4 laptop:w-10/12 laptop:px-0 2xl:px-0 w-full`
