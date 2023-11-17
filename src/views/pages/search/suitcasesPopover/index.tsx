import useFilters from 'src/hooks/useFilters'
import { DefaultButton, IconButton } from 'src/views/components/button'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import Tag from 'src/views/components/tag'

interface Props {
  control: any
  appendLuggageNumber: (data: any) => void
  handleSubmit: () => void
}

const SuitcasesPopover: React.FC<Props> = ({ control, appendLuggageNumber, handleSubmit }) => {
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
      <div className='flex items-center justify-between'>
        <IconButton icon='/icons/rotate.svg' text='გასუფთავება' hasBg={false} width={16} height={16} />
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

export default SuitcasesPopover
