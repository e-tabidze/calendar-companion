import useFilters from 'src/hooks/useFilters'
import { DefaultButton, IconButton } from 'src/views/components/button'
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
  const { seatTypesFilter } = useFilters()

  return (
    <PopoverDropdown label='ადგილების რაოდენობა' maxWidth='max-w-xs'>
      <TagsWrapper>
        <Tag options={seatTypesFilter} name='seat_types' control={control} height='h-10' append={appendSeatType} />
      </TagsWrapper>
      <div className='flex items-center justify-between'>
        <IconButton
          icon='rotate'
          text='გასუფთავება'
          hasBg={false}
          className='fill-transparent'
          width={20}
          height={22}
          onClick={() => reset('seat_types')}
        />
        <DefaultButton
          text='შენახვა'
          bg='bg-orange-100'
          textColor='text-white'
          type='submit'
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
