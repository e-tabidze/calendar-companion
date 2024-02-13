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
  handleSubmit: () => void
  setValue: any
}

const FuelTypePopover: React.FC<Props> = ({ control, appendFuelType, handleSubmit, setValue }) => {
  const { fuelTypesFilter, isLoading } = useFilters()

  const formState = useWatch({ control })

  return (
    <PopoverDropdown
      label='საწვავის ტიპი'
      maxWidth='max-w-sm'
      className={` ${
        formState?.fuel_types?.length ? 'border border-raisin-100' : 'hover:border hover:border-raisin-30'
      }`}
    >
      <Typography type='body' color='light' className='px-5 pt-5'>
        შეგიძლიათ მონიშნოთ ერთი ან რამდენიმე
      </Typography>
      <TagsWrapper className=''>
        {isLoading ? (
          <>Loading</>
        ) : (
          <Tag
            options={fuelTypesFilter}
            name='fuel_types'
            control={control}
            height='h-12'
            append={appendFuelType}
            outlined
          />
        )}
      </TagsWrapper>
      <ActionsWrapper className='sticky bottom-0 bg-white p-5'>
        <IconTextButton
          icon='clearFilter'
          label='გასუფთავება'
          className='fill-transparent'
          width={24}
          height={24}
          onClick={() => setValue('fuel_types', [])}
          disabled={!formState?.fuel_types?.length}
          labelClassname={formState?.fuel_types?.length ? 'text-sm text-red-100' : 'text-sm text-raisin-50'}
          iconFill={formState?.fuel_types?.length ? '!fill-red-100' : '!fill-black'}
          type='button'
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

export default FuelTypePopover
