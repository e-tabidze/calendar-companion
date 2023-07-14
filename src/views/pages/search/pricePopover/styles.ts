import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const TagsWrapper = tw.div<TailwindComponent>`flex items-center gap-1 my-6`
export const ActionsWrapper = tw.div<TailwindComponent>`flex items-center justify-between`

export const Divider = tw.div`w-3 h-px bg-base-100 mx-2`