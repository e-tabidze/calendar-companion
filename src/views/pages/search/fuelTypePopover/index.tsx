import Typography from 'src/views/components/typography'
import Tag from 'src/views/components/tag'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import { ActionsWrapper, TagsWrapper } from './styles'
import { useForm } from 'react-hook-form'

const fuelType = [
  {
    id: 1,
    title: 'ელექტრო'
  },
  {
    id: 2,
    title: 'ჰიბრიდი'
  },
  {
    id: 3,
    title: 'დატენვადი ჰიბრიდი'
  },
  {
    id: 4,
    title: 'დიზელი'
  },
  {
    id: 5,
    title: 'გაზი'
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
        <IconTextButton icon='/icons/rotate.svg' label='გასუფთავება' width={16} height={16} />
        <DefaultButton text='შენახვა' bg='bg-orange-100' textColor='text-white' />
      </ActionsWrapper>
    </PopoverDropdown>
  )
}

export default FuelTypePopover
