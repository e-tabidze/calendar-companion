import PopoverDropdown from 'src/views/components/popoverDropdown'
import Checkbox from 'src/views/components/checkboxField'
import { useForm } from 'react-hook-form'

const CategoryPopover = () => {
  const control = useForm()
  
  return (
    <PopoverDropdown label='კატეგორია' maxWidth='max-w-md'>
      <Checkbox title='ეკონომიური' iconPath='/icons/vehicleCategory.svg' name="" control={control} />
    </PopoverDropdown>
  )
}

export default CategoryPopover
