import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const SelectTimeContainer = tw.div<TailwindComponent>`relative md:border md:border-raisin-10 rounded-xl flex flex-col md:flex-row md:w-full md:w-fit md:px-4 md:justify-between md:items-center`
export const SelectTimeText = tw.div<TailwindComponent>`flex flex-col justify-center md:pr-4`
