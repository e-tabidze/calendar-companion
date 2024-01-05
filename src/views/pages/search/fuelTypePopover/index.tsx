import Typography from 'src/views/components/typography'
import Tag from 'src/views/components/tag'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import { ActionsWrapper, TagsWrapper } from './styles'
import useFilters from 'src/hooks/useFilters'
import { useWatch } from 'react-hook-form'
import { useEffect, useState } from 'react'

interface Props {
  control: any
  appendFuelType: any
  reset: any
  handleSubmit: () => void
}

const FuelTypePopover: React.FC<Props> = ({ control, appendFuelType, reset, handleSubmit }) => {
  const { fuelTypesFilter, isLoading } = useFilters()

  const [hasFuelTypes, setFuelTypes] = useState(false)

  const formState = useWatch({ control })

  useEffect(() => {
    setFuelTypes(!!formState?.fuel_types?.length)
  }, [formState?.fuel_types?.length])

  return (
    <PopoverDropdown
      label='საწვავის ტიპი'
      maxWidth='max-w-sm'
      className={`${hasFuelTypes ? 'border border-raisin-100' : 'hover:border hover:border-raisin-30'}`}
    >
      <Typography type='body' color='light'>
        შეგიძლიათ მონიშნოთ ერთი ან რამდენიმე
      </Typography>
      <TagsWrapper>
        {isLoading ? (
          <>Loading</>
        ) : (
          <Tag
            options={fuelTypesFilter}
            name='fuel_types'
            control={control}
            height='h-10'
            append={appendFuelType}
            outlined
          />
        )}
      </TagsWrapper>
      <ActionsWrapper>
        <IconTextButton
          icon='rotate'
          label='გასუფთავება'
          className='fill-transparent'
          width={20}
          height={22}
          onClick={() => reset('fuel_types')}
          labelClassname="text-sm text-raisin-50 border-b"
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

export default FuelTypePopover
