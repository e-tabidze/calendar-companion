import React from 'react'
import { generateTimeOptions } from 'src/utils/timeValues'
import SelectField from 'src/views/components/selectField'
import {useTranslation} from "next-i18next";

interface Props {
  control: any
  day?: string
  startTimeName: string
  endTimeName: string
  isDisabled?: boolean
}

const TimeRangeComponent: React.FC<Props> = ({ control, startTimeName, endTimeName, isDisabled }) => {
  const {t} = useTranslation()

    return (
    <div className='flex items-center gap-1'>
      <SelectField
        options={generateTimeOptions()}
        className='my-2 min-w-[136px] fill-transparent'
        icon
        placeholder={t('from')}
        name={startTimeName}
        control={control}
        valueKey='value'
        labelKey='label'
        disabled={isDisabled}
      />
      <div className='h-px w-[6px] bg-raisin-130' />
      <SelectField
        options={generateTimeOptions()}
        className='my-2 min-w-[136px] fill-transparent'
        icon
        placeholder={t('to')}
        control={control}
        name={endTimeName}
        valueKey='value'
        labelKey='label'
        disabled={isDisabled}
      />
    </div>
  )
}

export default TimeRangeComponent
