import { useWatch } from 'react-hook-form'
import useFilters from 'src/hooks/useFilters'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import Tag from 'src/views/components/tag'
import { TagsWrapper } from './styles'

interface Props {
  control: any
  appendSeatType: any
  handleSubmit: () => void
  setValue: any
}

const SeatsPopover: React.FC<Props> = ({ control, appendSeatType, handleSubmit, setValue }) => {
  const formState = useWatch({ control })

  const { seatTypesFilter } = useFilters()

  return (
    <PopoverDropdown
      label='ადგილების რაოდენობა'
      maxWidth='max-w-xs'
      className={`${
        formState?.seat_types?.length ? 'border border-raisin-100' : 'hover:border hover:border-raisin-30'
      }`}
    >
      <TagsWrapper>
        <Tag options={seatTypesFilter} name='seat_types' control={control} height='h-10' append={appendSeatType} />
      </TagsWrapper>
      <div className='flex items-center justify-between sticky bottom-0 bg-white p-5'>
        <IconTextButton
          icon='clearFilter'
          label='გასუფთავება'
          className='fill-transparent'
          width={24}
          height={24}
          onClick={() => setValue('seat_types', [])}
          disabled={!formState?.seat_types?.length}
          labelClassname={formState?.seat_types?.length ? 'text-sm text-red-100' : 'text-sm text-raisin-50'}
          iconFill={formState?.seat_types?.length ? '!fill-red-100' : '!fill-black'}
          type='button'
        />
        <DefaultButton
          text='შენახვა'
          bg='bg-orange-100 hover:bg-orange-110 transition-all'
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
