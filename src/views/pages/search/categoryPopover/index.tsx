import PopoverDropdown from 'src/views/components/popoverDropdown'
import Checkbox from 'src/views/components/checkboxField'
import useFilters from 'src/hooks/useFilters'
import { useWatch } from 'react-hook-form'
import CheckboxField from 'src/views/components/checkboxField'

interface Props {
  control: any
  appendCategory: any
  removeCategory: any
}

const CategoryPopover: React.FC<Props> = ({ control, appendCategory, removeCategory }) => {
  const { categoriesFilter } = useFilters()

  const formState = useWatch({ control })

  console.log(formState.category, 'formState')

  return (
    <PopoverDropdown label='კატეგორია' maxWidth='max-w-md'>
      {/* {categoriesFilter?.map((category: any, index: number) => (
        <div key={category.id} className='my-2'>
          <Checkbox
            title={category.title}
            iconPath={category.icon}
            name={`category.${index}`}
            control={control}
            append={() => appendCategory(category.id)}
            remove={() => removeCategory(index)}
            customValue={category.index}
          />
        </div>
      ))} */}

      {/* <Checkbox
            label={category.title}
            iconPath={category.icon}
            name={`category.${index}`}
            control={control}
            append={() => appendCategory(category.id)}
          /> */}
      <CheckboxField options={categoriesFilter} name='category' control={control} append={appendCategory} />
    </PopoverDropdown>
  )
}

export default CategoryPopover
