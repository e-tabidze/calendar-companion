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
  const { suitcases } = useFilters()

  const formState = useWatch({ control })

  return (
    <PopoverDropdown
      label='ჩემოდნების რაოდენობა'
      maxWidth='max-w-xs'
      className={`${
        formState?.luggage_numbers?.length ? 'border border-raisin-100' : 'hover:border hover:border-raisin-30'
      }`}
    >
      <div className='flex flex-wrap gap-4 my-6 px-5'>
        <Tag options={suitcases} height='h-10' name='luggage_numbers' control={control} append={appendLuggageNumber} />
      </div>
      <div className='flex items-center justify-between sticky bottom-0 bg-white p-5'>
        <IconTextButton
          icon='return'
          label='გასუფთავება'
          className='fill-transparent'
          width={24}
          height={24}
          onClick={() => reset('luggage_numbers')}
          labelClassname={
            formState?.luggage_numbers?.length ? 'text-sm text-red-100' : 'text-sm text-raisin-50'
          }
          disabled={!formState?.luggage_numbers?.length}
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

export default SuitcasesPopover
