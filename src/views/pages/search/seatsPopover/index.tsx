import { useEffect, useState } from 'react'
import { useWatch } from 'react-hook-form'
import useFilters from 'src/hooks/useFilters'
import {DefaultButton, IconTextButton} from 'src/views/components/button'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import Tag from 'src/views/components/tag'
import { TagsWrapper } from './styles'

interface Props {
  control: any
  appendSeatType: any
  handleSubmit: () => void
  reset: any
}

const SeatsPopover: React.FC<Props> = ({ control, appendSeatType, handleSubmit, reset }) => {
  const [hasSeatTypes, setHasFuelType] = useState(false)

  const formState = useWatch({ control })

  useEffect(() => {
    setHasFuelType(!!formState?.seat_types?.length)
  }, [formState?.seat_types?.length])

  const { seatTypesFilter } = useFilters()

  return (
    <PopoverDropdown
      label='ადგილების რაოდენობა'
      maxWidth='max-w-xs'
      className={`${hasSeatTypes ? 'border border-raisin-100' : ''}`}
    >
      <TagsWrapper>
        <Tag options={seatTypesFilter} name='seat_types' control={control} height='h-10' append={appendSeatType} />
      </TagsWrapper>
      <div className='flex items-center justify-between'>
        <IconTextButton
          icon='rotate'
          label='გასუფთავება'
          className='fill-transparent'
          width={20}
          height={22}
          onClick={() => reset('seat_types')}
        />
        <DefaultButton
          text='შენახვა'
          bg='bg-orange-100'
          textColor='text-white'
          type='button'
          onClick={() => {
            handleSubmit()
            close()
          }}
        />
      </div>
    </PopoverDropdown>
  )
}

export default SeatsPopover
