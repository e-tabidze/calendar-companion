// ** Tailwind Styled
import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const AvatarContainer = tw.div<TailwindComponent>`border-[#E9EAEB] hover:bg-[#F2F3F6] hover:border-[#BEBFC3] flex h-10 rounded-xl items-center py-2 pl-3 pr-4 border md:ml-3 cursor-pointer transition-all`
export const AvatarInnerContainer = tw.div<TailwindComponent>`w-6 h-6 relative flex items-center justify-center rounded-full overflow-hidden mr-2`
export const AvatarResponsiveContainer = tw.div<TailwindComponent>`flex items-center`
