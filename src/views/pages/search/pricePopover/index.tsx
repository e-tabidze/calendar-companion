import { DefaultInput } from 'src/views/components/input'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import { ActionsWrapper, Divider, TagsWrapper } from './styles'
import { useEffect, useState } from 'react'
import { useWatch } from 'react-hook-form'

interface Props {
  control: any
  handleSubmit: () => void
  reset: any
}

const PricePopover: React.FC<Props> = ({ control, handleSubmit, reset }) => {
  const [hasPrice, setPrice] = useState(false)

  const formState = useWatch({ control })

  useEffect(() => {
    setPrice(!!formState?.price_min?.length || !!formState?.price_max?.length)
  }, [formState?.fuel_types?.length])

  return (
    <PopoverDropdown label='ფასი' maxWidth='max-w-md' className={hasPrice ? 'border border-raisin-100' : 'hover:border hover:border-raisin-30'}>
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
        <IconTextButton
          icon='rotate'
          label='გასუფთავება'
          className='fill-transparent'
          labelClassname="text-sm text-raisin-50 border-b"
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
          type='button'
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
