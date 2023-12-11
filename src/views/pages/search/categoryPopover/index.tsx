import PopoverDropdown from 'src/views/components/popoverDropdown'
import useFilters from 'src/hooks/useFilters'
import CheckboxField from 'src/views/components/checkboxField'
import { DefaultButton, IconButton } from 'src/views/components/button'
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
      className={`${formState.category.length > 0 ? 'border border-raisin-100' : ''}`}
    >
      <CheckboxField
        options={categoriesFilter}
        name='category'
        control={control}
        append={appendCategory}
        width='50'
        height='45'
        classList='border-b-1 border-raisin-10 pb-3'
      />
      <div className='flex items-center justify-between'>
<<<<<<< HEAD
        <IconButton
          icon='/icons/rotate.svg'
          text='გასუფთავება'
          width={16}
          height={16}
          onClick={() => reset('category')}
        />
=======
        <IconButton icon='rotate' text='გასუფთავება' className='fill-transparent' hasBg={false} width={20} height={22} onClick={() => reset("category")} />
>>>>>>> 06b78d3795b9880a6c2d93643051bf093504bc77
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
