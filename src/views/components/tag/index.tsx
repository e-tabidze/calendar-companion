import { Controller } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import Typography from '../typography'
import _ from 'lodash'

interface Option {
  id: string | number
  title: string | number
  icon?: string
}

interface Props {
  component?: any
  height: 'h-10' | 'h-12'
  className?: string
  name?: string
  control?: any
  options?: Option[]
  label?: string
  handleClick?: any 
  multiselect?: boolean
  append?: any
  outlined?: boolean
  errors?: any
}

const Tag: React.FC<Props> = ({
  component,
  height,
  className,
  name,
  control,
  options,
  label,
  handleClick,
  append,
  outlined,
  errors
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
              <div className='flex flex-col'>          
                <div className='flex flex-wrap items-center gap-4'> 
                {options?.map(option => (
                  <div
                    key={option.id}
                    className={`flex items-center w-max ${height} ${component ? 'gap-3' : ''} ${
                      component ? 'rounded-xl' : 'rounded-2xl'
                    } ${
                      selectedOptions.includes(option.id)
                        ? outlined
                          ? 'border border-raisin-90'
                          : 'border border-green-100 bg-green-100'
                        : 'border border-gray-90'
                    } px-4 cursor-pointer ${className}`}
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
                    {component}
                    {option.icon && <Icon svgPath={option.icon} width='32' height='32' />}
                    <Typography
                      type='body'
                      className={`w-max ${option.icon && 'ml-2'} ${
                        selectedOptions.includes(option.id) && (!!outlined ? '' : 'text-white')
                      }`}
                    >
                      {option.title}
                    </Typography>
                  </div>
                ))}
                </div>
                {errors && (
                  <div id={name} className='text-sm text-red-100 my-2 ml-2'>
                    {_.get(errors, name)?.message}
                  </div>
                )}
                </div>
                
              </>
            )
          }}
        />
      ) : (
        <div
          className={`flex items-center gap-3 w-max ${height} 
          } px-4 cursor-pointer rounded-xl border border-raisin-10 ${className}`}
          onClick={handleClick}
        >
          {component}
          <Typography type='body' className={`w-max `}>
            {label}
          </Typography>
        </div>
      )}
    </>
  )
}

export default Tag
