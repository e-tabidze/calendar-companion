import PopoverDropdown from 'src/views/components/popoverDropdown'
import useFilters from 'src/hooks/useFilters'
import CheckboxField from 'src/views/components/checkboxField'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import { useWatch } from 'react-hook-form'

interface Props {
  control: any
  appendCategory: (data: any) => void
  handleSubmit: () => void
  setValue: any
}

const CategoryPopover: React.FC<Props> = ({ control, appendCategory, handleSubmit, setValue }) => {
  const { categoriesFilter } = useFilters()

  const formState = useWatch({ control })

  return (
    <PopoverDropdown
      label='კატეგორია'
      maxWidth='max-w-md'
      className={`${formState?.category?.length ? 'border border-raisin-100' : 'hover:border hover:border-raisin-30'}`}
    >
      <div className=''>
        <CheckboxField
          options={categoriesFilter}
          name='category'
          control={control}
          append={appendCategory}
          width='48'
          height='40'
          className='py-4 p-5'
          categoryCheckbox
          divider
        />
      </div>

      <div className='flex items-center justify-between sticky bottom-0 bg-white p-5 shadow-buttonContainer'>
        <IconTextButton
          icon='clearFilter'
          label='გასუფთავება'
          className='fill-transparent'
          width={24}
          height={24}
          onClick={() => setValue('category', [])}
          disabled={!formState?.category?.length}
          labelClassname={formState?.category?.length ? 'text-sm text-red-100' : 'text-sm text-raisin-50'}
          iconFill={formState?.category?.length ? '!fill-red-100' : '!fill-black'}
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
      </div>
    </PopoverDropdown>
  )
}

export default CategoryPopover
