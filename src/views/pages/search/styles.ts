import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const FiltersWrapper = tw.div<TailwindComponent>`hidden fixed z-[11] w-full border-t-1 border-b-1 border-raisin-10 top-20 lg:flex justify-between items-center py-4 bg-white px-10`
export const MainFilters = tw.div<TailwindComponent>`flex gap-4 w-max`
export const ClearFiltersWrapper = tw.div<TailwindComponent>`flex items-center gap-4`
export const ResponsiveDivider = tw.div`hidden lg:block w-full h-px bg-raisin-10`
export const SearchContentsContainer = tw.div<TailwindComponent>`flex flex-col`
export const SearchResultsContainer = tw.div<TailwindComponent>`flex justify-between flex-col-reverse items-baseline md:flex-row md:items-center`
export const MapContainer = tw.div<TailwindComponent>`flex`
export const Wrapper = tw.div<TailwindComponent>``
