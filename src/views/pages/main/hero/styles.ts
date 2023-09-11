import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const HeroContainer = tw.div<TailwindComponent>`bg-[url("/images/banner.png")] bg-no-repeat bg-center bg-cover rounded-2xl m-auto xl:h-[560px] sm:p-3`
export const Copy = tw.div<TailwindComponent>`w-full xl:w-7/12 pt-28 sm:ml-0 xl:ml-20`
