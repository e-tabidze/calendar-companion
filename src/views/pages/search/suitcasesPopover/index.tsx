import { useWatch } from 'react-hook-form'
import useFilters from 'src/hooks/useFilters'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import Tag from 'src/views/components/tag'

interface Props {
  control: any
  appendLuggageNumber: (data: any) => void
  handleSubmit: () => void
  reset: any
}

const SuitcasesPopover: React.FC<Props> = ({ control, appendLuggageNumber, handleSubmit, reset }) => {
  const { luggageNumbers } = useFilters()

  const formState = useWatch({ control })

  return (
    <PopoverDropdown
      label='ჩემოდნების რაოდენობა'
      maxWidth='max-w-xs'
      className={`${formState?.luggage_numbers?.length > 0 ? 'border border-raisin-100' : ''}`}
    >
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
        <IconTextButton
          icon='rotate'
          label='გასუფთავება'
          className='fill-transparent'
          width={20}
          height={22}
          onClick={() => reset('luggage_numbers')}
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

export default SuitcasesPopover
