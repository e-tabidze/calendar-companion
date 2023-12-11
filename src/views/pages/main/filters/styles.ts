import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const FiltersContainer = tw.div<TailwindComponent>`relative w-full min-w-max flex flex-col md:flex-row items-center bg-white rounded-2xl mt-9 md:mt-12 lg:mt-10 xl:mt-16`
export const ExtraFiltersContainer = tw.div<TailwindComponent>`flex shrink-0 pr-4 w-full md:w-auto justify-between py-5 md:py-0`

export const Divider = tw.div`w-full h-px md:w-px md:h-8 bg-raisin-7`
