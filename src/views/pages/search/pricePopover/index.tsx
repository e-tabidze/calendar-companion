import { DefaultInput } from 'src/views/components/input'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import { DefaultButton, IconButton } from 'src/views/components/button'
import { ActionsWrapper, Divider, TagsWrapper } from './styles'
import { useWatch } from 'react-hook-form'

interface Props {
  control: any
  handleSubmit: () => void
  reset: any
}

const PricePopover: React.FC<Props> = ({ control, handleSubmit, reset }) => {
  const formState = useWatch({ control })

  return (
    <PopoverDropdown
      label='ფასი'
      maxWidth='max-w-md'
      className={formState.price_min.length > 0 || formState?.price_max.length > 0 ? 'border border-raisin-100' : ''}
    >
      <TagsWrapper>
        <DefaultInput
          label={'მინიმუმ ფასი დღიურად'}
          name='price_min'
          control={control}
          className='w-52'
          type='number'
        />
        <Divider />
        <DefaultInput
          label={'მაქსიმუმ ფასი დღიურად'}
          name='price_max'
          control={control}
          className='w-52'
          type='number'
        />
      </TagsWrapper>
      <ActionsWrapper>
        <IconButton
          icon='/icons/rotate.svg'
          text='გასუფთავება'
          width={16}
          height={16}
          onClick={() => {
            reset('price_min')
            reset('price_max')
          }}
        />
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
