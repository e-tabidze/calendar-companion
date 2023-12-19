import PopoverDropdown from 'src/views/components/popoverDropdown'
import useFilters from 'src/hooks/useFilters'
import CheckboxField from 'src/views/components/checkboxField'
import {DefaultButton, IconTextButton} from 'src/views/components/button'
import { useWatch } from 'react-hook-form'
import { useState, useEffect } from 'react'

interface Props {
  control: any
  appendCategory: (data: any) => void
  handleSubmit: () => void
  reset: any
}

const CategoryPopover: React.FC<Props> = ({ control, appendCategory, handleSubmit, reset }) => {
  const { categoriesFilter } = useFilters()

  const formState = useWatch({ control })

  const [hasCategory, setHasCategory] = useState(false)

  useEffect(() => {
    setHasCategory(!!formState?.category?.length)
  }, [formState?.category?.length])

  return (
    <PopoverDropdown
      label='კატეგორია'
      maxWidth='max-w-md'
      className={`${hasCategory ? 'border border-raisin-100' : ''}`}
    >
      <CheckboxField
        options={categoriesFilter}
        name='category'
        control={control}
        append={appendCategory}
        width='50'
        height='45'
      />
      <div className='flex items-center justify-between'>
        <IconTextButton
          icon='rotate'
          label='გასუფთავება'
          className='fill-transparent'
          width={20}
          height={22}
          onClick={() => reset('category')}
        />
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
