import { DefaultInput } from 'src/views/components/input'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import { DefaultButton, IconButton } from 'src/views/components/button'
import { ActionsWrapper, Divider, TagsWrapper } from './styles'
import { useRouter } from 'next/router'

interface Props {
  control: any
  handleSubmit: () => void
  reset: any
  searchValues: any
}

const PricePopover: React.FC<Props> = ({ control, handleSubmit, reset, searchValues }) => {
  const router = useRouter()

  const { price_min, price_max } = router.query

  return (
    <PopoverDropdown
      label='ფასი'
      maxWidth='max-w-md'
      className={price_min || price_max ? 'border border-raisin-100' : ''}
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
          icon='rotate'
          text='გასუფთავება'
          className='fill-transparent'
          width={20}
          height={22}
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
