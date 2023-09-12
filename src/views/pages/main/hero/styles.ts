import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const HeroContainer = tw.div<TailwindComponent>`bg-[url("/images/banner.png")] bg-no-repeat bg-center bg-cover rounded-2xl m-auto p-3 md:p-0 md:py-[40px] lg:py-[84px] md:px-[40px] lg:px-[80px] xl:px-[112px]`
export const Copy = tw.div<TailwindComponent>`w-full lg:w-9/12 xl:w-7/12 h-full flex flex-col justify-between`