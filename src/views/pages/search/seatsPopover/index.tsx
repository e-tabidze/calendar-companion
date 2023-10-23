import { useForm } from 'react-hook-form'
import { IconButton } from 'src/views/components/button'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import Tag from 'src/views/components/tag'
import { TagsWrapper } from './styles'

const seats = [
  {
    id: 1,
    title: 'ნებისმიერი'
  },
  {
    id: 2,
    title: '1'
  },
  {
    id: 3,
    title: '2'
  },
  {
    id: 4,
    title: '3'
  },
  {
    id: 5,
    title: '4'
  },
  {
    id: 6,
    title: '5'
  },
  {
    id: 7,
    title: '6'
  },
  {
    id: 8,
    title: '7'
  },
  {
    id: 9,
    title: '8+'
  }
]

const SeatsPopover = () => {
  const control = useForm()

  return (
    <PopoverDropdown label='ადგილების რაოდენობა' maxWidth='max-w-xs'>
      <TagsWrapper>
        <Tag options={seats} name='' control={control} height='h-10' />
      </TagsWrapper>
      <IconButton icon='/icons/rotate.svg' text='გასუფთავება' width={16} height={16} />
    </PopoverDropdown>
  )
}

export default SeatsPopover
