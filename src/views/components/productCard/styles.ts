import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const ProductCardContainer = tw.div<TailwindComponent>`relative cursor-pointer after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-3xl after:border after:border-transparent after:transition-all hover:after:border-raisin-100`
export const DetailsContainer = tw.div<TailwindComponent>`rounded-bl-3xl rounded-br-3xl border-l-1 border-r-1 border-b-1 border-gray-90 pt-6 pl-5 pb-5 pr-5`
export const InnerDetailsContainer = tw.div<TailwindComponent>`flex justify-between mt-6 flex-wrap`
export const DetailsWrapper = tw.div<TailwindComponent>`flex sm:pl-0 gap-5 items-center h-fit`
export const ReviewContainer = tw.div<TailwindComponent>`flex items-center gap-2`
export const Details = tw.div<TailwindComponent>`flex gap-2 items-center`
export const PriceContainer = tw.div<TailwindComponent>`font-medium text-3md flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mr-5`
export const PreviousPrice = tw.span<TailwindComponent>`line-through text-raisin opacity-20`

export const Divider = tw.div`w-full h-pxxl:w-pxxl:h-8 bg-gray-90 opacity-70`
