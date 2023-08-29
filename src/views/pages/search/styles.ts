import tw from 'tailwind-styled-components'
import { TailwindComponent } from 'src/interfaces/tailwind'

export const FiltersWrapper = tw.div<TailwindComponent>`hidden laptop:flex justify-between items-center mt-8`
export const MainFilters = tw.div<TailwindComponent>`flex gap-4 w-max`
export const ClearFiltersWrapper = tw.div<TailwindComponent>`flex items-center gap-4`
export const ResponsiveDivider = tw.div`hidden large:block w-full mt-8 h-px bg-raisin-10`
export const SearchContentsContainer = tw.div<TailwindComponent>`flex flex-col`
export const SearchResultsContainer = tw.div<TailwindComponent>`flex justify-between flex-col-reverse items-baseline large:flex-row large:items-center`
export const MapContainer = tw.div<TailwindComponent>`flex`
export const Wrapper = tw.div<TailwindComponent>``
