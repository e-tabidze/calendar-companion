// ** Tailwind Styled
import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const AvatarContainer = tw.div<TailwindComponent>`flex items-center gap-3`
export const AvatarInnerContainer = tw.div<TailwindComponent>`w-10 h-10 object-fill flex items-center`
export const AvatarResponsiveContainer = tw.div<TailwindComponent>`hidden md:flex items-center gap-2`
