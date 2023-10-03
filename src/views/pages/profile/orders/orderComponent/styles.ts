import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const RentalDetailsContainer = tw.div<TailwindComponent>`bg-raisin-5 flex flex-col md:flex-row justify-between px-10 py-7`
export const RentalDetailsWrapper = tw.div<TailwindComponent>`flex items-center gap-2 md:flex-col md:gap-0`
export const PriceDetailsContainer = tw.div<TailwindComponent>`flex flex-col-reverse md:flex-row items-center justify-between p-4 md:p-8`
export const PriceDetailsWrapper = tw.div<TailwindComponent>`flex justify-between items-center my-5`
export const TakeAwayInfoContsiner = tw.div<TailwindComponent>`flex my-6`
export const TakeAwayWrapper = tw.div<TailwindComponent>`w-4/12 md:w-5/12`
export const TakeAway = tw.div<TailwindComponent>`flex items-center gap-3`
