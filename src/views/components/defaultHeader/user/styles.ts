// ** Tailwind Styled
import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const UserContainer = tw.div<TailwindComponent>`flex items-center`
export const RentBtn = tw.button<TailwindComponent>`flex h-10 bg-orange-10 hover:bg-orange-20 rounded-xl items-center px-3 lg:px-4 xl:px-6 font-medium text-sm mx-2 lg:mr-4 transition-all`
export const FavoriteBtn = tw.button<TailwindComponent>`cursor-pointer flex items-center justify-center w-10 h-10 rounded-full hover:bg-grey-100 transition-all mr-1`

export const Divider = tw.div`h-[7px] w-px bg-neutral-400 mx-4 xl:mx-6`