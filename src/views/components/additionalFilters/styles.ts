import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const SectionWrapper = tw.div<TailwindComponent>`flex flex-col md:flex-row md:items-center justify-between my-4 md:my-8`
export const ListWrapper = tw.div<TailwindComponent>`flex w-max gap-2`
