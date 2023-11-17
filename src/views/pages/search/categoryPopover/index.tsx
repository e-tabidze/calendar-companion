import PopoverDropdown from 'src/views/components/popoverDropdown'
import useFilters from 'src/hooks/useFilters'
import CheckboxField from 'src/views/components/checkboxField'
import { DefaultButton, IconButton } from 'src/views/components/button'

interface Props {
  control: any
  appendCategory: (data: any) => void
  handleSubmit: () => void
}

const CategoryPopover: React.FC<Props> = ({ control, appendCategory, handleSubmit }) => {
  const { categoriesFilter } = useFilters()

  return (
    <PopoverDropdown label='კატეგორია' maxWidth='max-w-md'>
      <CheckboxField
        options={categoriesFilter}
        name='category'
        control={control}
        append={appendCategory}
        width='50'
        height='45'
      />
      <div className='flex items-center justify-between'>
        <IconButton icon='/icons/rotate.svg' text='გასუფთავება' hasBg={false} width={16} height={16} />
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
      </div>
    </PopoverDropdown>
  )
}

export default CategoryPopover
