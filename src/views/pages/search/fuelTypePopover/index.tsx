import Typography from 'src/views/components/typography'
import Tag from 'src/views/components/tag'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import { DefaultButton, IconButton } from 'src/views/components/button'
import { ActionsWrapper, TagsWrapper } from './styles'
import { useForm } from 'react-hook-form'

const fuelType = [
  {
    id: 1,
    label: 'ელექტრო'
  },
  {
    id: 2,
    label: 'ჰიბრიდი'
  },
  {
    id: 3,
    label: 'დატენვადი ჰიბრიდი'
  },
  {
    id: 4,
    label: 'დიზელი'
  },
  {
    id: 5,
    label: 'გაზი'
  }
]

const FuelTypePopover = () => {
  const control = useForm()

  return (
    <PopoverDropdown label='საწვავის ტიპი' maxWidth='max-w-sm'>
      <Typography type='body' color='light'>
        შეგიძლიათ მონიშნოთ ერთი ან რამდენიმე
      </Typography>
      <TagsWrapper>
        <Tag options={fuelType} name='' control={control} height='h-10' />
      </TagsWrapper>
      <ActionsWrapper>
        <IconButton icon='/icons/rotate.svg' text='გასუფთავება' width={16} height={16} />
        <DefaultButton text='შენახვა' bg='bg-orange-100' textColor='text-white' />
      </ActionsWrapper>
    </PopoverDropdown>
  )
}

export default FuelTypePopover
