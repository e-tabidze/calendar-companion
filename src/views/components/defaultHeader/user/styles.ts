// ** Tailwind Styled
import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const UserContainer = tw.div<TailwindComponent>`flex items-center`
export const RentBtn = tw.button<TailwindComponent>`flex h-[40px] bg-[#FFECE6] hover:bg-[#FFD9CC] rounded-[12px] items-center px-[16px] xl:px-[24px] font-medium text-[#FD4100] text-[12px] ml-[16px] transition-all`

export const Divider = tw.div`h-[7px] w-px bg-neutral-400 mx-4 xl:mx-6`