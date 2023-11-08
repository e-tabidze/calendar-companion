import Typography from 'src/views/components/typography'
import Tag from 'src/views/components/tag'
import PopoverDropdown from 'src/views/components/popoverDropdown'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import { ActionsWrapper, TagsWrapper } from './styles'
import useFilters from 'src/hooks/useFilters'

interface Props {
  control: any
  appendFuelType: any
  fuelTypes: any
}

const FuelTypePopover: React.FC<Props> = ({ control, appendFuelType, fuelTypes }) => {
  const { fuelTypesFilter, isLoading } = useFilters()

  return (
    <PopoverDropdown label='საწვავის ტიპი' maxWidth='max-w-sm'>
      <Typography type='body' color='light'>
        შეგიძლიათ მონიშნოთ ერთი ან რამდენიმე
      </Typography>
      <TagsWrapper>
        {isLoading ? (
          <>Loading</>
        ) : (
          <Tag options={fuelTypesFilter} name='fuel_types' control={control} height='h-10' append={appendFuelType} />
        )}
      </TagsWrapper>
      <ActionsWrapper>
        <IconTextButton icon='/icons/rotate.svg' label='გასუფთავება' width={16} height={16} />
        <DefaultButton text='შენახვა' bg='bg-orange-100' textColor='text-white' />
      </ActionsWrapper>
    </PopoverDropdown>
  )
}

export default FuelTypePopover
