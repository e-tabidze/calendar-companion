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
  }, [formState?.price_min?.length, formState?.price_max?.length])

  return (
    <PopoverDropdown
      label='ფასი'
      maxWidth='max-w-[500px]'
      className={hasPrice ? 'border border-raisin-100' : 'hover:border hover:border-raisin-30'}
    >
      <TagsWrapper>
        <DefaultInput label='მინიმუმ ფასი დღიურად' name='price_min' control={control} className='w-72' type='number' />
        <Divider />
        <DefaultInput label='მაქსიმუმ ფასი დღიურად' name='price_max' control={control} className='w-72' type='number' />
      </TagsWrapper>
      <ActionsWrapper className='p-5 shadow-buttonContainer'>
        <IconTextButton
          icon='rotate'
          label='გასუფთავება'
          className='fill-transparent'
          labelClassname={hasPrice ? 'text-sm text-red-100 border-b' : 'text-sm text-raisin-50 border-b'}
          disabled={!hasPrice}
          type='button'
          width={20}
          height={22}
          onClick={() => {
            reset('price_min')
            reset('price_max')
          }}
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
      </ActionsWrapper>
    </PopoverDropdown>
  )
}

export default PricePopover
