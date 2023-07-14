import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const FiltersContainer = tw.div<TailwindComponent>`relative w-full large:w-max large:ml-0 desktop:ml-20 flex flex-col large:flex-row items-center bg-white rounded-2xl mt-9 large:mt-16`
export const ExtraFiltersContainer = tw.div<TailwindComponent>`flex items-center justify-between w-full large:w-max mt-2 large:mt-0 py-3 large:py-0 laptop:gap-6 laptop:mx-4`

export const Divider = tw.div`w-full h-px large:w-px large:h-8 bg-raisin-7`
