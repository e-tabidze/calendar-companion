import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const FiltersContainer = tw.div<TailwindComponent>`relative w-full md:w-max md:ml-0 xl:ml-20 flex flex-col md:flex-row items-center bg-white rounded-2xl mt-9 md:mt-16`
export const ExtraFiltersContainer = tw.div<TailwindComponent>`flex items-center justify-between w-full md:w-max mt-2 md:mt-0 py-3 md:py-0 lg:gap-6 lg:mx-4`

export const Divider = tw.div`w-full h-px md:w-px md:h-8 bg-raisin-7`
