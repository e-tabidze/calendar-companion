import { DefaultInput } from 'src/views/components/input'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import { DefaultButton, IconButton } from 'src/views/components/button'
import { ActionsWrapper, Divider, TagsWrapper } from './styles'

interface Props {
  control: any
  handleSubmit: () => void
}

const PricePopover: React.FC<Props> = ({ control, handleSubmit }) => {
  return (
    <PopoverDropdown label='ფასი' maxWidth='max-w-md'>
      <TagsWrapper>
        <DefaultInput label={'მინიმუმ ფასი დღიურად'} name='price_min' control={control} />
        <Divider />
        <DefaultInput label={'მაქსიმუმ ფასი დღიურად'} name='price_max' control={control} />
      </TagsWrapper>
      <ActionsWrapper>
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
      </ActionsWrapper>
    </PopoverDropdown>
  )
}

export default PricePopover
