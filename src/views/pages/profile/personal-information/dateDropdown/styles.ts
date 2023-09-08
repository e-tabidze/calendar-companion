import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const DateSelectContainer = tw.div<TailwindComponent>`flex items-center justify-between text-left relative h-14 px-3 py-2 w-full`
export const InnerDateSelectContainer = tw.div<TailwindComponent>`flex w-full items-center gap-3 relative`
