import { Controller } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import Typography from '../typography'

interface Props {
  border?: boolean
  name: string
  control: any
  options: any[]
  append?: any
}

const CategoryCard: React.FC<Props> = ({ border, name, control, options, append }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const selectedOptions = Array.isArray(value) ? value : [value]

        return (
          <>
            {options?.map(option => (
              <div
                onClick={() => {
                  if (append) {
                    if (selectedOptions.includes(option.id)) {
                      onChange(selectedOptions.filter(val => val !== option.id))
                    } else {
                      onChange([...selectedOptions, option.id])
                    }
                  } else {
                    onChange(option.id)
                  }
                }}
                key={option.id}
                className={`flex flex-col items-center justify-center cursor-pointer w-28 h-28 sm:w-36 sm:h-36 ${
                  border && 'border border-gray-20 rounded-2xl'
                } ${selectedOptions.includes(option.id) ? 'border-2 border-green-100 bg-green-20' : ''} `}
              >
                <Icon
                  svgPath={option.icon}
                  width='48'
                  height='48'
                  color={selectedOptions.includes(option.id) ? '#549684' : '#000000'}
                  className='icon-class'
                />
                <Typography type='body' color='dark' className='mt-4'>
                  {}
                </Typography>
                <Typography type='body' color={value === option.id ? 'dark' : 'light'} className='text-md font-light'>
                  {option.title}
                </Typography>
              </div>
            ))}
          </>
        )
      }}
    />
  )
}

export default CategoryCard
