import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const FilterContainer = tw.div<TailwindComponent>`text-left relative w-full md:w-72`
export const InnerFilterContainer = tw.div<TailwindComponent>`w-full flex justify-between`
