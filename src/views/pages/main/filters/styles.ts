import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const FiltersContainer = tw.div<TailwindComponent>`relative w-full min-w-max flex flex-col md:flex-row items-center bg-white rounded-2xl mt-9 md:mt-[48px] lg:mt-[40px] xl:mt-[64px]`
export const ExtraFiltersContainer = tw.div<TailwindComponent>`flex shrink-0 pr-[16px] w-full md:w-auto justify-between py-[20px] md:py-0`

export const Divider = tw.div`w-full h-px md:w-px md:h-8 bg-raisin-7`
