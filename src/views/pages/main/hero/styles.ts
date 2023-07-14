import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const HeroContainer = tw.div<TailwindComponent>`bg-[url("/images/banner.png")] bg-no-repeat bg-center bg-cover rounded-2xl m-auto desktop:h-[560px] mobile:p-3`
export const Copy = tw.div<TailwindComponent>`w-full desktop:w-7/12 pt-28 tablet:ml-0 desktop:ml-20`
