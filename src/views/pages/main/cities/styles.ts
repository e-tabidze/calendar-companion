// ** Tailwind Styled
import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const CitiesContainer = tw.div<TailwindComponent>`mt-20 bg-[#d7cab833] flex m-auto relative rounded-[36px] my-5 m-auto p-5`
export const CitiesInnerContainer = tw.div<TailwindComponent>`max-w-[1240px] m-auto pt-28 pb-32`
export const CitiesListContainer = tw.div<TailwindComponent>`flex items-center desktop:justify-between flex-col  desktop:flex-row`
export const ViewAllCitiesContainer = tw.div<TailwindComponent>`max-w-xs flex items-start gap-2`
export const BenefitsContainer = tw.div<TailwindComponent>`flex gap-20 flex-col desktop:flex-row`
export const CitiesWrapper = tw.div<TailwindComponent>`flex flex-wrap gap-3 justify-center desktop:justify-betwen`
export const Container = tw.div<TailwindComponent>``

export const Divider = tw.div`h-px w-full bg-raisin-7 my-20`
