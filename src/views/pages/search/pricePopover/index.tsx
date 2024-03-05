import { DefaultInput } from 'src/views/components/input'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import { ActionsWrapper, Divider, TagsWrapper } from './styles'
import { useEffect, useState } from 'react'
import { useWatch } from 'react-hook-form'
import {useTranslation} from "next-i18next";

interface Props {
  control: any
  handleSubmit: () => void
  reset: any
}

const PricePopover: React.FC<Props> = ({ control, handleSubmit, reset }) => {
  const [hasPrice, setPrice] = useState(false)

  const formState = useWatch({ control })
  const {t} =useTranslation()

  useEffect(() => {
    setPrice(!!formState?.price_min?.length || !!formState?.price_max?.length)
  }, [formState?.price_min?.length, formState?.price_max?.length])

  return (
    <PopoverDropdown
      label={t('price')}
      maxWidth='max-w-[440px]'
      className={hasPrice ? 'border border-raisin-100' : 'hover:border hover:border-raisin-30'}
    >
      <TagsWrapper>
        <DefaultInput label={t('min_daily_price')} name='price_min' control={control} className='w-72' type='number' />
        <Divider />
        <DefaultInput label={t('max_daily_price')} name='price_max' control={control} className='w-72' type='number' />
      </TagsWrapper>
      <ActionsWrapper className='p-5'>
        <IconTextButton
          icon='clearFilter'
          label={t('clear')}
          className='fill-transparent'
          labelClassname={hasPrice ? 'text-sm text-red-100' : 'text-sm text-raisin-50'}
          iconFill={
            hasPrice ? '!fill-red-100' : '!fill-black'
          }
          disabled={!hasPrice}
          type='button'
          width={24}
          height={24}
          onClick={() => {
            reset('price_min')
            reset('price_max')
          }}
        />
        <DefaultButton
          text={t('save')}
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
