import useFilters from 'src/hooks/useFilters'
import { IconButton } from 'src/views/components/button'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import Tag from 'src/views/components/tag'

interface Props {
  control: any
  appendLuggageNumber: any
}

const SuitcasesPopover: React.FC<Props> = ({ control, appendLuggageNumber }) => {
  const { luggageNumbers } = useFilters()
  return (
    <PopoverDropdown label='ჩემოდნების რაოდენობა' maxWidth='max-w-xs'>
      <div className='flex flex-wrap gap-4 my-6'>
        <Tag
          options={luggageNumbers}
          height='h-10'
          name='luggage_numbers'
          control={control}
          append={appendLuggageNumber}
        />
      </div>
      <IconButton icon='/icons/rotate.svg' text='გასუფთავება' width={16} height={16} />
    </PopoverDropdown>
  )
}

export default SuitcasesPopover
