import React, {useState} from 'react'
import {useWatch} from 'react-hook-form'
import { FilterContainer, InnerFilterContainer } from './styles'
import dynamic from 'next/dynamic'
import LocationModal from "src/views/pages/main/filters/locationMob/locationModal";

const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
interface Props {
    control: any
    resetField: any
}

const LocationMob: React.FC<Props> = ({ control, resetField }) => {
    const [location, toggleLocation] = useState(false)
    const formState = useWatch({ control })

    return (
        <>
            <FilterContainer onClick={() => toggleLocation(!location)}>
                <InnerFilterContainer className='py-3 px-3 sm:px-4'>
                    <Typography type='subtitle' className='text-sm'>
                        {formState.location || 'მდებარეობა'}
                    </Typography>
                    {formState.location ? (
                        <Icon
                            svgPath='clear-xs'
                            width={7}
                            height={7}
                            color='raisin-10'
                            onClick={e => {
                                resetField(), e.stopPropagation()
                            }}
                            className="flex shrink-0 fill-transparent ml-2"
                        />
                    ) : (
                        <Icon svgPath='chevron' width={8} height={6} className="flex shrink-0 fill-white ml-2" />
                    )}
                </InnerFilterContainer>
            </FilterContainer>
            <LocationModal open={location} toggleModal={() => toggleLocation(!location)} control={control} />
        </>
    )
}

export default LocationMob
