import PopoverDropdown from 'src/views/components/popoverDropdown'
import useFilters from 'src/hooks/useFilters'
import CheckboxField from 'src/views/components/checkboxField'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import { useWatch } from 'react-hook-form'

interface Props {
  control: any
  appendCategory: (data: any) => void
  handleSubmit: () => void
  reset: any
}

const CategoryPopover: React.FC<Props> = ({ control, appendCategory, handleSubmit, reset }) => {
  const { categoriesFilter } = useFilters()

  const formState = useWatch({ control })

  return (
    <PopoverDropdown
      label='კატეგორია'
      maxWidth='max-w-md'
      className={`${formState?.category?.length ? 'border border-raisin-100' : 'hover:border hover:border-raisin-30'}`}
    >
      <CheckboxField
        options={categoriesFilter}
        name='category'
        control={control}
        append={appendCategory}
        width='50'
        height='45'
        className='py-4'
        divider
      />

      <div className='flex items-center justify-between sticky bottom-0 bg-white py-5 mt-4'>
        <IconTextButton
          icon='rotate'
          label='გასუფთავება'
          className='fill-transparent'
          width={20}
          height={22}
          onClick={() => reset('category')}
          disabled={!formState?.category?.length}
          labelClassname={
            formState?.category?.length ? 'text-sm text-red-100 border-b' : 'text-sm text-raisin-50 border-b'
          }
          type='button'
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
      </div>
    </PopoverDropdown>
  )
}

export default CategoryPopover
