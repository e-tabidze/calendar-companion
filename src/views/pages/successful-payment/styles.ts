import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const OrderDetailsContainer = tw.div<TailwindComponent>`border border-raisin-10 rounded-3xl`
export const RentalDetailsContainer = tw.div<TailwindComponent>`bg-green-100 w-full flex flex-col md:flex-row justify-between px-4 md:px-10 py-8`
export const RentalDetailsWrapper = tw.div<TailwindComponent>`flex items-center md:items-start gap-2 md:flex-col md:gap-0`
export const PriceDetailsContainer = tw.div<TailwindComponent>`w-full flex flex-col md:flex-row items-center md:items-start`
export const PriceDetailsWrapper = tw.div<TailwindComponent>`flex justify-between items-center my-5`
export const TakeAwayInfoContsiner = tw.div<TailwindComponent>`flex flex-col lg:flex-row my-6`
export const TakeAwayWrapper = tw.div<TailwindComponent>`lg:w-3/12 lg:flex lg:items-center`
export const TakeAway = tw.div<TailwindComponent>`flex items-center gap-3 mb-2 lg:m-0`
