// ** Tailwind Styled
import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const AvatarContainer = tw.div<TailwindComponent>`border-[#E9EAEB] hover:bg-[#F2F3F6] hover:border-[#BEBFC3] flex h-[40px] rounded-[12px] items-center py-[8px] pl-[12px] pr-[16px] border ml-[16px] cursor-pointer transition-all`
export const AvatarInnerContainer = tw.div<TailwindComponent>`w-[24px] h-[24px] relative flex items-center justify-center rounded-full overflow-hidden mr-[8px]`
export const AvatarResponsiveContainer = tw.div<TailwindComponent>`flex items-center`
