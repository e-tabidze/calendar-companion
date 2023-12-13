import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const FiltersContainer = tw.div<TailwindComponent>`relative flex flex-row items-center bg-white rounded-2xl`
export const ExtraFiltersContainer = tw.div<TailwindComponent>`flex shrink-0 px-2 w-full md:w-auto justify-between py-5 md:py-0`

export const Divider = tw.div`w-full h-px md:w-px md:h-8 bg-raisin-7`
