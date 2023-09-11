// ** Tailwind Styled
import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const UserContainer = tw.div<TailwindComponent>`flex items-center`
export const RentBtn = tw.button<TailwindComponent>`flex items-center gap-2 cursor-pointer text-sm w-fit rounded-3xl xl:border border-grey xl:py-3 xl:pl-3 xl:pr-2`

export const Divider = tw.div`h-[7px] w-px bg-neutral-400 mx-4 xl:mx-6`