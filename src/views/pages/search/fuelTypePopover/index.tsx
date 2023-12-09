import Typography from 'src/views/components/typography'
import Tag from 'src/views/components/tag'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import { ActionsWrapper, TagsWrapper } from './styles'
import useFilters from 'src/hooks/useFilters'
import { useWatch } from 'react-hook-form'

interface Props {
  control: any
  appendFuelType: any
  reset: any
}

const FuelTypePopover: React.FC<Props> = ({ control, appendFuelType, reset }) => {
  const { fuelTypesFilter, isLoading } = useFilters()

  const formState = useWatch({ control })

  return (
    <PopoverDropdown
      label='საწვავის ტიპი'
      maxWidth='max-w-sm'
      className={`${formState?.fuel_types.length > 0 ? 'border border-raisin-100' : ''}`}
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
          icon='/icons/rotate.svg'
          label='გასუფთავება'
          width={16}
          height={16}
          onClick={() => reset('fuel_types')}
        />
        <DefaultButton text='შენახვა' bg='bg-orange-100' textColor='text-white' />
      </ActionsWrapper>
    </PopoverDropdown>
  )
}

export default FuelTypePopover
