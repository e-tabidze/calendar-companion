import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const InsuranceList = tw.ul<TailwindComponent>`mt-2`
export const InsuranceListItem = tw.li<TailwindComponent>`flex items-center gap-4 mt-4`

export const DetailsContainer = tw.div<TailwindComponent>`rounded-bl-3xl rounded-br-3xl border-l-1 border-r-1 border-b-1 border-gray-90 pt-6 pl-5 pb-5 pr-5`
export const InnerDetailsContainer = tw.div<TailwindComponent>`flex justify-between mt-6`
export const DetailsWrapper = tw.div<TailwindComponent>`flex gap-5 items-center h-fit`
export const ReviewContainer = tw.div<TailwindComponent>`flex items-center gap-2`
export const Details = tw.div<TailwindComponent>`flex gap-3 items-center`
export const FavIconWrapper = tw.div<TailwindComponent>`absolute cursor-pointer z-20 top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-raisin-20`
export const PriceContainer = tw.div<TailwindComponent>`text-3md flex gap-2`
export const PreviousPrice = tw.span<TailwindComponent>`line-through text-raisin opacity-20 hidden xl:inline`

export const Divider = tw.div`w-full h-pxxl:w-pxxl:h-8 bg-gray-90 opacity-70`
