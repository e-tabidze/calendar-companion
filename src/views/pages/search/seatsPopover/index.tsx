import { useForm } from 'react-hook-form'
import useFilters from 'src/hooks/useFilters'
import { IconButton } from 'src/views/components/button'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import Tag from 'src/views/components/tag'
import { TagsWrapper } from './styles'

interface Props {
  control: any
}

const SeatsPopover: React.FC<Props> = ({ control }) => {
  const { seatTypesFilter } = useFilters()

  console.log(seatTypesFilter, 'seatTypesFilter')

  return (
    <PopoverDropdown label='ადგილების რაოდენობა' maxWidth='max-w-xs'>
      <TagsWrapper>
        <Tag options={seatTypesFilter} name='seats`' control={control} height='h-10' />
      </TagsWrapper>
      <IconButton icon='/icons/rotate.svg' text='გასუფთავება' width={16} height={16} />
    </PopoverDropdown>
  )
}

export default SeatsPopover
