// ** Tailwind Styled
import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const UserContainer = tw.div<TailwindComponent>`flex items-center`
export const RentBtn = tw.button<TailwindComponent>`flex h-[40px] bg-[#FFECE6] hover:bg-[#FFD9CC] rounded-[12px] items-center px-[16px] xl:px-[24px] font-medium text-[#FD4100] text-[12px] mr-[16px] transition-all`
export const FavoriteBtn = tw.button<TailwindComponent>`cursor-pointer flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#F2F3F6] transition-all mr-[4px]`

export const Divider = tw.div`h-[7px] w-px bg-neutral-400 mx-4 xl:mx-6`