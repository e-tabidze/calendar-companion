import { useForm } from 'react-hook-form'
import { IconButton } from 'src/views/components/button'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import Tag from 'src/views/components/tag'

const suitcases = [
  {
    id: 1,
    label: 'ნებისმიერი'
  },
  {
    id: 2,
    label: '1'
  },
  {
    id: 3,
    label: '2'
  },
  {
    id: 4,
    label: '3'
  },
  {
    id: 5,
    label: '4'
  },
  {
    id: 6,
    label: '5'
  },
  {
    id: 7,
    label: '6'
  },
  {
    id: 8,
    label: '7'
  },
  {
    id: 9,
    label: '8+'
  }
]
const SuitcasesPopover = () => {
  const control = useForm()

  return (
    <PopoverDropdown label='ჩემოდნების რაოდენობა' maxWidth='max-w-xs'>
      <div className='flex flex-wrap gap-4 my-6'>
        <Tag options={suitcases} height='h-10' name='' control={control} />
      </div>
      <IconButton icon='/icons/rotate.svg' text='გასუფთავება' width={16} height={16} />
    </PopoverDropdown>
  )
}

export default SuitcasesPopover
