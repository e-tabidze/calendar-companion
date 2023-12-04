import { Controller } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import Typography from '../typography'

interface Option {
  id: string | number
  title: string | number
  icon?: string
}

interface Props {
  className?: string
  name?: string
  control?: any
  options?: Option[]
  label?: string
  handleClick?: any
  multiselect?: boolean
  append?: any
  width?: string
  height?: string
}

const CheckboxField: React.FC<Props> = ({
  className,
  name,
  control,
  options,
  label,
  handleClick,
  append,
  width,
  height
}) => {
  return (
    <>
      {control && name ? (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => {
            const selectedOptions = Array.isArray(value) ? value : [value]

            return (
              <>
                {options?.map(option => (
                  <div
                    className='flex items-center gap-4 cursor-pointer'
                    key={option.id}
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
                  >
                    <input
                      type='checkbox'
                      value={value}
                      checked={selectedOptions.includes(option.id)}
                      className={`${
                        selectedOptions.includes(option.id) ? 'bg-raisin-80' : ''
                      } flex items-center w-5 h-5 border border-raisin-110 cursor-pointer ${className} text-green-100 checked:bg-green-100`}
                      onChange={() => {
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
                    />
                    {option.icon && <Icon svgPath={option.icon} width={width || 18} height={height || '18'} />}
                    <Typography type='body' className='w-max'>
                      {option.title}
                    </Typography>
                  </div>
                ))}
              </>
            )
          }}
        />
      ) : (
        <div
          className={`flex items-center gap-3 w-max
          px-4 cursor-pointer rounded-xl border border-raisin-10 ${className}`}
          onClick={handleClick}
        >
          <Typography type='body' className={`w-max `}>
            {label}
          </Typography>
        </div>
      )}
    </>
  )
}

export default CheckboxField
