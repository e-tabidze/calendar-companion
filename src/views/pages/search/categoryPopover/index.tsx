import PopoverDropdown from 'src/views/components/popoverDropdown'
import useFilters from 'src/hooks/useFilters'
import CheckboxField from 'src/views/components/checkboxField'

interface Props {
  control: any
  appendCategory: any
}

const CategoryPopover: React.FC<Props> = ({ control, appendCategory }) => {
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
    </PopoverDropdown>
  )
}

export default CategoryPopover
