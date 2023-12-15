import React, { useState } from 'react'
import PeriodModal from "src/views/pages/main/filters/periodModal";
import {FilterContainer, InnerFilterContainer} from "src/views/pages/main/filters/periodDropdown/styles";
import Typography from "src/views/components/typography";
import {format} from "date-fns";
import {ka} from "date-fns/locale";
import Icon from "src/views/app/Icon";
import useSearch from "src/hooks/useSearch";


const PeriodMob = () => {
    const [calendar, toggleCalendar] = useState(false)
    const [dateRange] = useState<[Date, Date] | [null, null]>([null, null])
    const [startDate, endDate] = dateRange
    const {control} = useSearch()

    return (
        <div >
            <FilterContainer onClick={() => toggleCalendar(!calendar)}>
                <Typography type='body' color='dark'>
                    ქირაობის პერიოდი
                </Typography>
                <InnerFilterContainer>
                    <Typography type='subtitle' className='text-raisin-50'>
                        {startDate && endDate
                            ? `${format(startDate, 'd MMM yyyy', { locale: ka })} - ${format(endDate, 'd MMM yyyy', {
                                locale: ka
                            })}`
                            : 'აირჩიეთ თარიღი და დრო'}
                    </Typography>
                    <Icon svgPath='chevron' width={8} height={6} className='inline fill-white m-2' />
                </InnerFilterContainer>
            </FilterContainer>

            <PeriodModal
                open={calendar}
                toggleModal={() => toggleCalendar(!calendar)}
                control={control}
            />
        </div>
    )
}

export default PeriodMob
