import PopoverDropdown from 'src/views/components/popoverDropdown'
import Checkbox from 'src/views/components/checkboxField'
import useFilters from 'src/hooks/useFilters'

interface Props {
  control: any
}

const CategoryPopover: React.FC<Props> = ({ control }) => {
  const { categoriesFilter, isLoading } = useFilters()

  console.log(categoriesFilter)
  return (
    <PopoverDropdown label='კატეგორია' maxWidth='max-w-md'>
      {categoriesFilter?.map((category: any) => (
        <div key={category.id} className="my-2">
          <Checkbox title={category.title} iconPath={category.icon} name='name' control={control} />
        </div>
      ))}
    </PopoverDropdown>
  )
}

export default CategoryPopover
