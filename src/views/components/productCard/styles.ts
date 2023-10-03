import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const ProductCardContainer = tw.div<TailwindComponent>`relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-3xl after:border after:border-transparent after:transition-all hover:after:border-raisin-100`
export const DetailsContainer = tw.div<TailwindComponent>`rounded-bl-3xl rounded-br-3xl border-l-1 border-r-1 border-b-1 border-gray-90 pt-6 pl-5 pb-5 pr-5`
export const InnerDetailsContainer = tw.div<TailwindComponent>`flex justify-between mt-6`
export const DetailsWrapper = tw.div<TailwindComponent>`flex flex-col sm:flex-row pl-5 sm:pl-0 border-l-1 border-raisin-10 sm:border-0 gap-5 items-center h-fit`
export const ReviewContainer = tw.div<TailwindComponent>`flex items-center gap-2`
export const Details = tw.div<TailwindComponent>`flex gap-3 items-center`
export const FavIconWrapper = tw.div<TailwindComponent>`absolute cursor-pointer z-20 top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-raisin-20`
export const PriceContainer = tw.div<TailwindComponent>`text-3md flex gap-2`
export const PreviousPrice = tw.span<TailwindComponent>`line-through text-raisin opacity-20 hidden xl:inline`

export const Divider = tw.div`w-full h-pxxl:w-pxxl:h-8 bg-gray-90 opacity-70`
