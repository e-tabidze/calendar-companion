// ** Tailwind Styled
import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const CitiesContainer = tw.div<TailwindComponent>`mt-20 bg-[#D7CAB8]/20 flex m-auto relative rounded-[36px] my-5 m-auto p-5`
export const CitiesInnerContainer = tw.div<TailwindComponent>`max-w-[1248px] m-auto pt-10 lg:pt-28 pb-20 md:pb-32`
export const CitiesListContainer = tw.div<TailwindComponent>`flex items-center lg:justify-between flex-col lg:flex-row`
export const ViewAllCitiesContainer = tw.div<TailwindComponent>`max-w-xs flex items-start gap-3`
export const BenefitsContainer = tw.div<TailwindComponent>`flex gap-8 xl:gap-20 flex-col lg:flex-row`
export const CitiesWrapper = tw.div<TailwindComponent>`grid gap-x-5 xl:gap-x-6 grid-cols-2 sm:grid-cols-4`
export const Container = tw.div<TailwindComponent>``

export const Divider = tw.div`h-px w-full bg-raisin-7 my-8 xl:my-20`
