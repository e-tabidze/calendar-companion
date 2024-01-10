import React, { useState } from 'react'
import Typography from 'src/views/components/typography'
import { FilterContainer, InnerFilterContainer } from './styles'
import { registerLocale } from 'react-datepicker';
import  ka  from 'date-fns/locale/ka';
import 'react-datepicker/dist/react-datepicker.css'
import { useWatch} from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import PeriodModal from "src/views/pages/main/filters/periodMob/periodModal";

interface Props {
    control: any
    resetField: any
}
registerLocale("ka", ka);

const PeriodMob: React.FC<Props> = ({ control, resetField }) => {
    const [calendar, toggleCalendar] = useState(false)
    const formState = useWatch({ control })

    return (
        <>
            <FilterContainer onClick={() => toggleCalendar(!calendar)}>
                <InnerFilterContainer className='py-3 px-3 sm:px-4'>
                    <Typography type='subtitle' className='text-sm'>
                        {formState?.booking?.book_from || formState?.booking?.book_to
                            ? `${formState?.booking?.book_from} - ${formState?.booking?.book_to}`
                            : 'თარიღი'}
                    </Typography>
                    {formState?.booking?.book_from || formState?.booking?.book_to ? (
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
                        <Icon svgPath='chevron' width={8} height={6} className="flex-shrink-0 fill-white ml-2" />
                    )}
                </InnerFilterContainer>
            </FilterContainer>
            <PeriodModal open={calendar} toggleModal={() => toggleCalendar(!calendar)} control={control} />
        </>

    )
}

export default PeriodMob
