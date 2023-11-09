import PopoverDropdown from 'src/views/components/popoverDropdown'
import Checkbox from 'src/views/components/checkboxField'
import useFilters from 'src/hooks/useFilters'

interface Props {
  control: any
  appendCategory: any
  removeCategory: any
}

const CategoryPopover: React.FC<Props> = ({ control, appendCategory, removeCategory }) => {
  const { categoriesFilter } = useFilters()

  return (
    <PopoverDropdown label='კატეგორია' maxWidth='max-w-md'>
      {categoriesFilter?.map((category: any, index: number) => (
        <div key={category.id} className='my-2'>
          <Checkbox
            title={category.title}
            iconPath={category.icon}
            name={`category.${index}`}
            control={control}
            append={() => appendCategory(category.id)}
            customValue={category.id} 
            remove={() => removeCategory(index)}
          />
        </div>
      ))}
    </PopoverDropdown>
  )
}

export default CategoryPopover
