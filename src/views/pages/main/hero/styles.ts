import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const HeroContainer = tw.div<TailwindComponent>`relative overflow-hidden xl:h-[560px] rounded-2xl m-auto p-3 md:p-0 md:py-10 lg:py-10 xl:py-21 md:px-10 lg:px-10 xl:px-[112px]`
export const Copy = tw.div<TailwindComponent>`w-full lg:w-[800px] h-full flex flex-col justify-between`