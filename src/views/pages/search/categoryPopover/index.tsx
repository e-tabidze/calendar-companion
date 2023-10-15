import PopoverDropdown from 'src/views/components/popoverDropdown'
import Checkbox from 'src/views/components/checkboxField'

const CategoryPopover = () => {
  return (
    <PopoverDropdown label='კატეგორია' maxWidth='max-w-md'>
      <Checkbox label='ეკონომიური' iconPath='/icons/vehicleCategory.svg' value='' />
    </PopoverDropdown>
  )
}

export default CategoryPopover
