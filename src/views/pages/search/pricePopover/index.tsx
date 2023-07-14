import { DefaultInput } from 'src/views/components/input'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import { DefaultButton, IconButton } from 'src/views/components/button'
import { ActionsWrapper, Divider, TagsWrapper } from './styles'

const PricePopover = () => {
  return (
    <PopoverDropdown label='ფასი' maxWidth='max-w-md'>
      <TagsWrapper>
        <DefaultInput label={'მინიმუმ ფასი დღიურად'} value='14$' onChange={(e: any) => console.log(e.target.value)} />
        <Divider />
        <DefaultInput label={'მინიმუმ ფასი დღიურად'} value='14$' onChange={(e: any) => console.log(e)} />
      </TagsWrapper>

      <ActionsWrapper>
        <IconButton icon='/icons/rotate.svg' text='გასუფთავება' hasBg={false} width={16} height={16} />
        <DefaultButton text='შენახვა' bg='bg-orange-100' textColor="text-white" />
      </ActionsWrapper>
    </PopoverDropdown>
  )
}

export default PricePopover
